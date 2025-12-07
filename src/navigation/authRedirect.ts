// export interface UserProfile {
//   isComplete: boolean;
//   [key: string]: string;
// }

// export function getRedirectPath(profile: UserProfile | null): string {
//   if (profile && !profile.isComplete) {
//     return "/auth/new-user/PartTwo/step-4.0";
//   }
//   return "/(app)/(tabs)";
// }

// import { router } from "expo-router";
// import { useAuthStore } from "../store/auth.store";

// export function handleAuthRedirect() {
//   const { session, onboardingComplete, emailVerified, profileComplete } =
//     useAuthStore.getState();

//   if (!session) return router.replace("/login");
//   if (!emailVerified) return router.replace("/verify-email");
//   if (!onboardingComplete) return router.replace("/onboarding");
//   if (!profileComplete) return router.replace("/complete-profile");

//   router.replace("/(tabs)/home");
// }
