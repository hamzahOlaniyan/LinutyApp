import { CompleteRegistrationInput } from "@/store/types";
import { AuthResponse } from "@supabase/supabase-js";
import { Profile } from "../../types/supabaseTypes";
import { ApiResponse } from "./type";
import { useApiMutation } from "./useApi";



export class AuthApi  {

   static signup(){ 
    return useApiMutation<AuthResponse>(
      "post",
      "/auth/signup"
    );
  }
  static checkEmail() {
    return useApiMutation<{ message: string }, { email: string }>(
      "post",
      "/auth/check-email"
    );
  }
  static verifyEmailOtp() {
    return useApiMutation<ApiResponse, { email: string; code: string, purpose:string }>(
      "post",
      "/auth/otp/verify"
    );
  }

   static sendEmailOtp() {
    return useApiMutation<ApiResponse, { email: string; purpose: string }>(
      "post",
      "/auth/otp/send"
    );
  }
  
  static checkUsername(){ 
    return useApiMutation<{ message: string },{username:string}>(
      "post",
      "/auth/check-username"
    );
  }
 
  static useResetPassword(){
     return useApiMutation<{status:string, message:string},{ email: string }>('post', '/auth/reset-password')
  }

  static useCompleteRegistration = () =>
        useApiMutation<Profile, CompleteRegistrationInput>(
          "patch",
          `/auth/me/complete`
        );
  
} 


