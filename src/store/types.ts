import { FormDataType } from "@/components/FormInput/types";

export type OnbaordingStatusType = "onboarding" | "dashboard";

export type UserData = {
  success: boolean;
  message: string;
  data: User;
};

export type User = {
  email: string;
  emailVerifiedAt: string | null;
  fname: string;
  lname: string;
  id: string;
  instagramUrl?: string;
  onboarding: OnbaordingStatusType;
  photo: string;
  privilege?: string;
  role: string;
  totalMealPlans?: number;
  totalPrograms?: number;
  verifiedAt: string | null;
  website?: string;
  youtubeUrl?: string;
};

export type FormType = {
  formData: { [key: string]: string };
  errors: { [key: string]: string } | undefined;
};

export type AuthStore = {
  initialized: boolean;
  user: User | null;
  hasCompletedOnboarding: boolean;
  hasCompletedRegistration: boolean;

  //Actions
  init: () => Promise<void>;
  setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  setOnboardingStatus: () => void;
};

export type FormStore = {
  formData: FormDataType;
  errors: FormDataType;
  setFormData: (action: Partial<FormDataType>) => void;
  setFormErrors: (action: Partial<FormDataType>) => void;
  resetFormData: () => void;
};

export type Workouts = {
  id: string;
  name: string;
  difficulty: string;
  description: string;
  trainer: {
    id: string;
    fname: string;
    lname: string;
  }[];
  trainee: {
    id: string;
    fname: string;
    lname: string;
  }[];
};

export type WorkoutsApiResponse = {
  success: boolean;
  message: string;
  data: {
    docs: Workouts[];
    totalDocs: number;
    currentPage: number;
    previousPage: number | null;
    totalPages: number;
    nextPage: number | null;
  };
};
