"use client";

import { useState, useEffect } from "react";
import {
  SCHOOL_INFO,
  MAJORS_DATA,
  SERVICES_DATA,
  POSTS_DATA,
  TEACHERS_DATA,
  JOBS_DATA,
  VIDEOS_DATA,
  INITIAL_TIMELINE,
  INITIAL_ARCHIVE_PHOTOS,
  INITIAL_FACILITIES,
  INITIAL_PROFILE,
  INITIAL_SOCIAL_LINKS,
  MajorData,
  PostData,
  ServiceData,
  TeacherStaffData,
  JobData,
  VideoData,
  TimelineItem,
  ArchivePhoto,
  FacilityItem,
  SchoolProfile,
  SocialLinks,
  PortalItem,
  INITIAL_PORTAL_ITEMS,
  TokohQuoteItem,
  INITIAL_TOKOH_QUOTES,
  ChatbotSettings,
  INITIAL_CHATBOT_SETTINGS,
  QuizQuestion,
  INITIAL_QUIZ_QUESTIONS,
} from "./data-initial";

export interface AnnouncementBanner {
  enabled: boolean;
  badge: string;
  text: string;
  linkText: string;
  linkUrl: string;
  theme: "emerald" | "amber" | "indigo";
}

export interface CMSState {
  schoolInfo: typeof SCHOOL_INFO;
  majors: MajorData[];
  services: ServiceData[];
  posts: PostData[];
  teachers: TeacherStaffData[];
  jobs: JobData[];
  videos: VideoData[];
  timeline: TimelineItem[];
  archivePhotos: ArchivePhoto[];
  facilities: FacilityItem[];
  profile: SchoolProfile;
  socialLinks: SocialLinks;
  activeVideoId: string;
  announcement: AnnouncementBanner;
  portalItems: PortalItem[];
  tokohQuotes: TokohQuoteItem[];
  chatbotSettings: ChatbotSettings;
  quizQuestions: QuizQuestion[];
}

const STORAGE_KEY = "skagata_cms_v2";

const DEFAULT_ANNOUNCEMENT: AnnouncementBanner = {
  enabled: true,
  badge: "INFO RESMI SPMB 2026",
  text: "Penerimaan Peserta Didik Baru (SPMB) SMK Negeri 3 Yogyakarta Tahun Ajaran 2026/2027 telah dibuka secara resmi.",
  linkText: "Pelajari Panduan & Alur Pendaftaran",
  linkUrl: "/kabar?category=SPMB",
  theme: "emerald",
};

export function getInitialCMSState(): CMSState {
  if (typeof window === "undefined") {
    return {
      schoolInfo: SCHOOL_INFO,
      majors: MAJORS_DATA,
      services: SERVICES_DATA,
      posts: POSTS_DATA,
      teachers: TEACHERS_DATA,
      jobs: JOBS_DATA,
      videos: VIDEOS_DATA,
      timeline: INITIAL_TIMELINE,
      archivePhotos: INITIAL_ARCHIVE_PHOTOS,
      facilities: INITIAL_FACILITIES,
      profile: INITIAL_PROFILE,
      socialLinks: INITIAL_SOCIAL_LINKS,
      activeVideoId: "tJhzVg7Nq4g",
      announcement: DEFAULT_ANNOUNCEMENT,
      portalItems: INITIAL_PORTAL_ITEMS,
      tokohQuotes: INITIAL_TOKOH_QUOTES,
      chatbotSettings: INITIAL_CHATBOT_SETTINGS,
      quizQuestions: INITIAL_QUIZ_QUESTIONS,
    };
  }

  try {
    const cached = localStorage.getItem(STORAGE_KEY);
    if (cached) {
      const parsed = JSON.parse(cached);
      return {
        schoolInfo: parsed.schoolInfo || SCHOOL_INFO,
        majors: parsed.majors || MAJORS_DATA,
        services: parsed.services || SERVICES_DATA,
        posts: parsed.posts || POSTS_DATA,
        teachers: parsed.teachers || TEACHERS_DATA,
        jobs: parsed.jobs || JOBS_DATA,
        videos: parsed.videos || VIDEOS_DATA,
        timeline: parsed.timeline || INITIAL_TIMELINE,
        archivePhotos: parsed.archivePhotos || INITIAL_ARCHIVE_PHOTOS,
        facilities: parsed.facilities || INITIAL_FACILITIES,
        profile: {
          ...INITIAL_PROFILE,
          ...(parsed.profile || {}),
          identity: {
            ...INITIAL_PROFILE.identity,
            ...((parsed.profile && parsed.profile.identity) || {}),
          },
          historyHero: {
            ...INITIAL_PROFILE.historyHero,
            ...((parsed.profile && parsed.profile.historyHero) || {}),
          },
        },
        socialLinks: parsed.socialLinks || INITIAL_SOCIAL_LINKS,
        activeVideoId: parsed.activeVideoId || "tJhzVg7Nq4g",
        announcement: parsed.announcement || DEFAULT_ANNOUNCEMENT,
        portalItems: parsed.portalItems || INITIAL_PORTAL_ITEMS,
        tokohQuotes: parsed.tokohQuotes || INITIAL_TOKOH_QUOTES,
        chatbotSettings: {
          ...INITIAL_CHATBOT_SETTINGS,
          ...(parsed.chatbotSettings || {}),
        },
        quizQuestions: parsed.quizQuestions || INITIAL_QUIZ_QUESTIONS,
      };
    }
  } catch (e) {
    console.error("Failed to load CMS from localStorage", e);
  }

  return {
    schoolInfo: SCHOOL_INFO,
    majors: MAJORS_DATA,
    services: SERVICES_DATA,
    posts: POSTS_DATA,
    teachers: TEACHERS_DATA,
    jobs: JOBS_DATA,
    videos: VIDEOS_DATA,
    timeline: INITIAL_TIMELINE,
    archivePhotos: INITIAL_ARCHIVE_PHOTOS,
    facilities: INITIAL_FACILITIES,
    profile: INITIAL_PROFILE,
    socialLinks: INITIAL_SOCIAL_LINKS,
    activeVideoId: "tJhzVg7Nq4g",
    announcement: DEFAULT_ANNOUNCEMENT,
    portalItems: INITIAL_PORTAL_ITEMS,
    tokohQuotes: INITIAL_TOKOH_QUOTES,
    chatbotSettings: INITIAL_CHATBOT_SETTINGS,
    quizQuestions: INITIAL_QUIZ_QUESTIONS,
  };
}

export function saveCMSState(state: CMSState) {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
      window.dispatchEvent(new Event("skagata_cms_updated"));
    } catch (e) {
      console.error("Failed to save CMS to localStorage", e);
    }

    // Persist to Server Database (Prisma SQLite / Production DB)
    fetch("/api/cms", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ data: state }),
    }).catch((err) => {
      console.warn("Failed to sync CMS state to server database:", err);
    });
  }
}

export function useCMS() {
  const [state, setState] = useState<CMSState>(getInitialCMSState);

  useEffect(() => {
    // 1. Instantly load local cache
    setState(getInitialCMSState());

    // 2. Fetch latest server database state in background to ensure zero data loss on refresh/deploy
    fetch("/api/cms")
      .then((res) => res.json())
      .then((resData) => {
        if (resData.status === "success" && resData.data) {
          const serverState: CMSState = {
            ...getInitialCMSState(),
            ...resData.data,
            profile: {
              ...INITIAL_PROFILE,
              ...(resData.data.profile || {}),
              identity: {
                ...INITIAL_PROFILE.identity,
                ...((resData.data.profile && resData.data.profile.identity) || {}),
              },
              historyHero: {
                ...INITIAL_PROFILE.historyHero,
                ...((resData.data.profile && resData.data.profile.historyHero) || {}),
              },
            },
            chatbotSettings: {
              ...INITIAL_CHATBOT_SETTINGS,
              ...(resData.data.chatbotSettings || {}),
            },
          };

          setState(serverState);
          try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(serverState));
          } catch (e) {
            // ignore quota error
          }
        }
      })
      .catch((err) => {
        console.warn("Server CMS sync skipped, using local cache:", err);
      });

    const handleUpdate = () => {
      setState(getInitialCMSState());
    };
    window.addEventListener("skagata_cms_updated", handleUpdate);
    return () => window.removeEventListener("skagata_cms_updated", handleUpdate);
  }, []);

  const updatePosts = (newPosts: PostData[]) => {
    const next = { ...state, posts: newPosts };
    setState(next);
    saveCMSState(next);
  };

  const updateMajors = (newMajors: MajorData[]) => {
    const next = { ...state, majors: newMajors };
    setState(next);
    saveCMSState(next);
  };

  const updateTeachers = (newTeachers: TeacherStaffData[]) => {
    const next = { ...state, teachers: newTeachers };
    setState(next);
    saveCMSState(next);
  };

  const updateJobs = (newJobs: JobData[]) => {
    const next = { ...state, jobs: newJobs };
    setState(next);
    saveCMSState(next);
  };

  const updateServices = (newServices: ServiceData[]) => {
    const next = { ...state, services: newServices };
    setState(next);
    saveCMSState(next);
  };

  const updateTimeline = (newTimeline: TimelineItem[]) => {
    const next = { ...state, timeline: newTimeline };
    setState(next);
    saveCMSState(next);
  };

  const updateArchivePhotos = (newPhotos: ArchivePhoto[]) => {
    const next = { ...state, archivePhotos: newPhotos };
    setState(next);
    saveCMSState(next);
  };

  const updateFacilities = (newFacilities: FacilityItem[]) => {
    const next = { ...state, facilities: newFacilities };
    setState(next);
    saveCMSState(next);
  };

  const updateProfile = (newProfile: Partial<SchoolProfile>) => {
    const next = { ...state, profile: { ...state.profile, ...newProfile } };
    setState(next);
    saveCMSState(next);
  };

  const updateSocialLinks = (newLinks: Partial<SocialLinks>) => {
    const next = { ...state, socialLinks: { ...state.socialLinks, ...newLinks } };
    setState(next);
    saveCMSState(next);
  };

  const updateSchoolInfo = (newInfo: Partial<typeof SCHOOL_INFO>) => {
    const next = { ...state, schoolInfo: { ...state.schoolInfo, ...newInfo } };
    setState(next);
    saveCMSState(next);
  };

  const setActiveVideoId = (videoId: string) => {
    const next = { ...state, activeVideoId: videoId };
    setState(next);
    saveCMSState(next);
  };

  const updateAnnouncement = (newAnnouncement: AnnouncementBanner) => {
    const next = { ...state, announcement: newAnnouncement };
    setState(next);
    saveCMSState(next);
  };

  const updatePortalItems = (newItems: PortalItem[]) => {
    const next = { ...state, portalItems: newItems };
    setState(next);
    saveCMSState(next);
  };

  const updateTokohQuotes = (newQuotes: TokohQuoteItem[]) => {
    const next = { ...state, tokohQuotes: newQuotes };
    setState(next);
    saveCMSState(next);
  };

  const updateChatbotSettings = (newSettings: Partial<ChatbotSettings>) => {
    const next = {
      ...state,
      chatbotSettings: { ...state.chatbotSettings, ...newSettings },
    };
    setState(next);
    saveCMSState(next);
  };

  const updateQuizQuestions = (newQuestions: QuizQuestion[]) => {
    const next = { ...state, quizQuestions: newQuestions };
    setState(next);
    saveCMSState(next);
  };

  const resetToDefaults = () => {
    const next: CMSState = {
      schoolInfo: SCHOOL_INFO,
      majors: MAJORS_DATA,
      services: SERVICES_DATA,
      posts: POSTS_DATA,
      teachers: TEACHERS_DATA,
      jobs: JOBS_DATA,
      videos: VIDEOS_DATA,
      timeline: INITIAL_TIMELINE,
      archivePhotos: INITIAL_ARCHIVE_PHOTOS,
      facilities: INITIAL_FACILITIES,
      profile: INITIAL_PROFILE,
      socialLinks: INITIAL_SOCIAL_LINKS,
      activeVideoId: "tJhzVg7Nq4g",
      announcement: DEFAULT_ANNOUNCEMENT,
      portalItems: INITIAL_PORTAL_ITEMS,
      tokohQuotes: INITIAL_TOKOH_QUOTES,
      chatbotSettings: INITIAL_CHATBOT_SETTINGS,
      quizQuestions: INITIAL_QUIZ_QUESTIONS,
    };
    setState(next);
    saveCMSState(next);
  };

  return {
    ...state,
    updatePosts,
    updateMajors,
    updateTeachers,
    updateJobs,
    updateServices,
    updateTimeline,
    updateArchivePhotos,
    updateFacilities,
    updateProfile,
    updateSocialLinks,
    updateSchoolInfo,
    updateAnnouncement,
    updatePortalItems,
    updateTokohQuotes,
    updateChatbotSettings,
    updateQuizQuestions,
    setActiveVideoId,
    resetToDefaults,
  };
}
