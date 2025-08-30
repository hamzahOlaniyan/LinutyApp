export const validatePassword = (password: string) => {
   const hasLowercase = /[a-z]/.test(password);
   const hasUppercase = /[A-Z]/.test(password);
   const hasNumber = /[0-9]/.test(password);

   if (!hasLowercase) {
      return "Password must include at least one lowercase letter.";
   }
   if (!hasUppercase) {
      return "Password must include at least one uppercase letter.";
   }
   if (!hasNumber) {
      return "Password must include at least one number.";
   }

   return null; // ✅ valid password
};
