import { FormDataType } from "@/components/ui/FormInput/types";
import { Profile } from "@/lib/supabase/supabaseTypes";
import type { Session, User } from "@supabase/supabase-js";

export type OnbaordingStatusType = "onboarding" | "dashboard";

export type SessionResponse = {
  session: Session | null;
};

export type UserData = {
  success: boolean;
  message: string;
  data: User;
};

export type FormType = {
  formData: { [key: string]: string };
  errors: { [key: string]: string } | undefined;
};

export type AuthStore = {
  initialized: boolean;
  hasCompletedOnboarding: boolean;
  hasCompletedRegistration: boolean;

  user: User | null; // from supabase-js
  session: Session | null; // 👈 not string[]
  me: Profile | null;      

  //Actions
  setUser: (user: User | null) => void;
  setSession: () => Promise<void>; // 👈 it’s async
  setMe: (me: Profile | null) => void;
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
