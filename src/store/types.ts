import { FormDataType } from "@/components/ui/FormInput/types";
import type { Session } from "@supabase/supabase-js";
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

// export type UserData = {
//   success: boolean;
//   message: string;
//   data: User;
// };

// export type fillter = {
//   user: User;
//   access_token: string;
//   refresh_token: string;

// };

// export type FormType = {
//   formData: { [key: string]: string };
//   errors: { [key: string]: string } | undefined;
// };

// export type AuthPayload  =  {
//   session: Session | null;
//   user: User | null;
//   me?: Profile | null;            
// };

export type AuthStore = {
  initialized: boolean;
  me: Profile | null;
  hasCompletedOnboarding: boolean;
  session:Session|null

  //Actions
  init: () => Promise<void>;
  setSession:(session:Session|null)=>void;
  setMe: (me: Profile | null) => void;
  setInitialized: (initialized: boolean) => void; // ✅ add
  signOut: () => Promise<void>;
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


