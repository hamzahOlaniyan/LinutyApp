import { FormDataType } from "@/components/ui/FormInput/types";
import type { Session, User } from "@supabase/supabase-js";
import { Profile } from "../../types/supabaseTypes";

// export type SessionDTO = {
//   user: User;
//   accessToken: string;
//   refreshToken: string | null;
// };

// export type LoginResponse = SessionDTO;

// export type SessionResponse = {
//   session: SessionDTO | null;
// };


// export type Session = {
//   user: User;
//   access_token: string;
//   refresh_token: string;
//   expires_in: number;
//   token_type: string;
// };

// export type SessionResponse = {
//   session: Session | null;
//   user:User,
//   accessToken: string;
//   refreshToken: string;
//   expires_in:number
//   token_type: string

// };

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
  me: Profile | null;
  hasCompletedOnboarding: boolean;
  session:LoginResponse|null

  //Actions
  init: () => Promise<void>;
  setSession:(session:LoginResponse|null)=>void;
  setMe: (me: Profile | null) => void;
  signOut: () => Promise<void>;
  completeOnboarding: () => void;
  resetOnboarding: () => void;
  // initialized: boolean;
  // user: User | null;
  // me: Profile | null;
  // session: Session | null;
  // accessToken: string | null;
  // refreshToken: string | null;
  // hasCompletedOnboarding: boolean;

  // setAuthFromLogin: (payload: LoginResponse) => void;
  // setSession: () => Promise<void>;
  // setMe: (me: Profile | null) => void;
  // // init: () => Promise<void>;

  // // setUser: (user: User | null) => void;
  // signOut: () => Promise<void>;
  // completeOnboarding: () => void;
  // resetOnboarding: () => void;

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
