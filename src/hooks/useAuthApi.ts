import { AuthResponse } from "@supabase/supabase-js";
import { useApiMutation } from "./useApi";



export const AuthApi = {
  async checkEmail() {
    return useApiMutation<{ message: string }, { email: string }>(
      "post",
      "/auth/check-email"
    );
  },

  async verifyOtp() {
    return useApiMutation<{ message: string }, { email: string; otp: string }>(
      "post",
      "/auth/verify-otp"
    );
  },

  async checkUsername(){ 
    return useApiMutation<{ message: string },{username:string}>(
      "post",
      "/auth/check-username"
    );
  },

  async register(){ 
    return useApiMutation<AuthResponse>(
      "post",
      "/auth/register"
    );
  }

} as const;


