import { AuthResponse } from "@supabase/supabase-js";
import { useApiMutation } from "./useApi";



export const AuthApi = {
  checkEmail() {
    return useApiMutation<{ message: string }, { email: string }>(
      "post",
      "/auth/check-email"
    );
  },

  verifyOtp() {
    return useApiMutation<{ message: string }, { email: string; otp: string }>(
      "post",
      "/auth/verify-otp"
    );
  },

  checkUsername(){ 
    return useApiMutation<{ message: string },{username:string}>(
      "post",
      "/auth/check-username"
    );
  },

  register(){ 
    return useApiMutation<AuthResponse>(
      "post",
      "/auth/register"
    );
  }

} as const;


