import { FormDataType } from "@/components/ui/FormInput/types";
import { Profile } from "@/lib/supabase/supabaseTypes";
import type { User } from "@supabase/supabase-js";


export type Session = {
  user: User;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  token_type: string;
};

export type SessionResponse = {
  session: Session | null;
  user:User,
  accessToken: string;
  refreshToken: string;
  expires_in:number
  token_type: string

};

export type UserData = {
  success: boolean;
  message: string;
  data: User;
};

export type fillter = {
  user: User;
  access_token: string;
  refresh_token: string;

};



export type FormType = {
  formData: { [key: string]: string };
  errors: { [key: string]: string } | undefined;
};

export type AuthPayload  =  {
  session: Session | null;
  user: User | null;
  me?: Profile | null;            
};

export type LoginResponse = {
  user: User,
  accessToken: string;
  refreshToken: string;
};

export type AuthStore = {
  initialized: boolean;
  user: User | null;
  me: Profile | null;
  session: Session | null;
  accessToken: string | null;
  refreshToken: string | null;
  hasCompletedOnboarding: boolean;

  setAuthFromLogin: (payload: LoginResponse) => void;
  setSession: () => Promise<void>;
  setMe: (me: Profile | null) => void;
  // setUser: (user: User | null) => void;
  signOut: () => Promise<void>;
  completeOnboarding: () => void;
  resetOnboarding: () => void;

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
