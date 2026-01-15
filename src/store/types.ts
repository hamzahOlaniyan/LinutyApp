import { FormDataType } from "@/components/ui/FormInput/types";
import type { Session } from "@supabase/supabase-js";
import { Profile } from "../../types/supabaseTypes";

export type AuthStore = {
  initialized: boolean;
  me: Profile | null;
  hasCompletedAppStart: boolean;
  session:Session|null
  signingOut: boolean;

  init: () => Promise<void>;
  setSession:(session:Session|null)=>void;
  setMe: (me: Profile | null) => void;
  setInitialized: (initialized: boolean) => void; 
  signOut: () => Promise<void>;
  setHascompleteAppStart: (value: boolean) => void;
  completeAppStart:()=>void;
};

export type FormStore = {
  formData: FormDataType;
  errors: FormDataType;
  setFormData: (action: Partial<FormDataType>) => void;
  setFormErrors: (action: Partial<FormDataType>) => void;
  setFormDataErrors:(action:Partial<FormDataType> )=>void
  resetFormData: (fields: Partial<FormDataType>) => void;
  resetForm: () => void;
};


export type CompleteRegistrationInput = {
  dateOfBirth: string;
  gender: "male" | "female" | "other" | "";
  country: string;
  ethnicity: string;
  clan: string[];
  rootClan: string;
  lineage: string;
  profession: string;
  appInterests: string[];
  interests: string[];
  avatarUrl: string;
  interest?: string[];
  isProfileComplete?: boolean;
};