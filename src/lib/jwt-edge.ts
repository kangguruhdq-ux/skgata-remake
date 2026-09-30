const SECRET_KEY = process.env.ADMIN_JWT_SECRET || process.env.AUTH_SECRET || "skagata-secure-secret-key-stm2jetis-2026";

export interface SessionPayload {
  id: string;
  name: string;
  email: string;
  role: string;
  iat: number;
  exp: number;
}

function stringToUint8(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function base64UrlEncode(data: Uint8Array): string {
  let str = "";
  for (let i = 0; i < data.length; i++) {
    str += String.fromCharCode(data[i]);
  }
  return btoa(str).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function base64UrlDecode(str: string): Uint8Array {
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  while (str.length % 4) {
    str += "=";
  }
  const binary = atob(str);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i);
  }
  return bytes;
}

async function getHmacKey(): Promise<CryptoKey> {
  const keyData = stringToUint8(SECRET_KEY);
  return await crypto.subtle.importKey(
    "raw",
    keyData as any,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign", "verify"]
  );
}

export async function signTokenEdge(payload: Omit<SessionPayload, "iat" | "exp">, expiresInSeconds = 7 * 24 * 3600): Promise<string> {
  const iat = Math.floor(Date.now() / 1000);
  const exp = iat + expiresInSeconds;
  const fullPayload: SessionPayload = { ...payload, iat, exp };

  const header = { alg: "HS256", typ: "JWT" };
  const encodedHeader = base64UrlEncode(stringToUint8(JSON.stringify(header)));
  const encodedPayload = base64UrlEncode(stringToUint8(JSON.stringify(fullPayload)));
  const dataToSign = `${encodedHeader}.${encodedPayload}`;

  const key = await getHmacKey();
  const signatureBuffer = await crypto.subtle.sign("HMAC", key, stringToUint8(dataToSign) as any);
  const encodedSignature = base64UrlEncode(new Uint8Array(signatureBuffer));

  return `${dataToSign}.${encodedSignature}`;
}

export async function verifyTokenEdge(token: string): Promise<SessionPayload | null> {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;

    const [encodedHeader, encodedPayload, encodedSignature] = parts;
    const dataToSign = `${encodedHeader}.${encodedPayload}`;

    const key = await getHmacKey();
    const signature = base64UrlDecode(encodedSignature);

    const isValid = await crypto.subtle.verify("HMAC", key, signature as any, stringToUint8(dataToSign) as any);
    if (!isValid) return null;

    const payloadJson = new TextDecoder().decode(base64UrlDecode(encodedPayload));
    const payload: SessionPayload = JSON.parse(payloadJson);

    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      return null;
    }

    return payload;
  } catch {
    return null;
  }
}
