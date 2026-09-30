import { prisma } from "@/lib/prisma";

export interface LogAuditParams {
  actor: string;
  action: "LOGIN" | "LOGOUT" | "CREATE" | "UPDATE" | "DELETE" | "SETTINGS_CHANGE" | "CLEAR_LOGS" | "MEDIA_UPLOAD" | "MEDIA_DELETE";
  entity: "POST" | "MAJOR" | "TEACHER" | "ORG_NODE" | "MEDIA" | "SETTINGS" | "SYSTEM" | "AUTH" | "CAREER" | "SERVICE";
  entityId?: string;
  details?: string;
  ip?: string;
}

export async function logAuditAction(params: LogAuditParams) {
  try {
    return await prisma.auditLog.create({
      data: {
        actor: params.actor || "System",
        action: params.action,
        entity: params.entity,
        entityId: params.entityId || null,
        details: params.details || null,
        ip: params.ip || null,
      },
    });
  } catch (err) {
    console.warn("Failed to write audit log:", err);
    return null;
  }
}

export async function getAuditLogs(options?: {
  limit?: number;
  offset?: number;
  action?: string;
  entity?: string;
}) {
  const limit = options?.limit || 50;
  const offset = options?.offset || 0;

  const where: any = {};
  if (options?.action && options.action !== "ALL") {
    where.action = options.action;
  }
  if (options?.entity && options.entity !== "ALL") {
    where.entity = options.entity;
  }

  const [logs, total] = await Promise.all([
    prisma.auditLog.findMany({
      where,
      orderBy: { createdAt: "desc" },
      take: limit,
      skip: offset,
    }),
    prisma.auditLog.count({ where }),
  ]);

  return { logs, total, limit, offset };
}

export async function clearAllAuditLogs(actorEmail: string, ip?: string) {
  // Log the clearing event before deleting
  await prisma.auditLog.deleteMany({});
  await prisma.auditLog.create({
    data: {
      actor: actorEmail,
      action: "CLEAR_LOGS",
      entity: "SYSTEM",
      details: "Seluruh riwayat log audit sistem telah dibersihkan oleh Administrator.",
      ip: ip || null,
    },
  });
  return { success: true };
}
