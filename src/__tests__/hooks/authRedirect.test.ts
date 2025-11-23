import { getRedirectPath } from "../../navigation/authRedirect";

describe("getRedirectPath", () => {
   test("redirects to onboarding when profile incomplete", () => {
      expect(getRedirectPath({ isComplete: false })).toBe("/auth/new-user/PartTwo/step-4.0");
   });

   test("redirects to /tabs when profile is complete", () => {
      expect(getRedirectPath({ isComplete: true })).toBe("/(app)/(tabs)");
   });

   test("redirects to /tabs when profile is null", () => {
      expect(getRedirectPath(null)).toBe("/(app)/(tabs)");
   });
});
