jest.mock("../../lib/supabase", () => ({
   supabase: {
      auth: {
         signInWithPassword: jest.fn(),
         signOut: jest.fn(),
         getSession: jest.fn(),
      },
   },
}));

jest.mock("@react-native-async-storage/async-storage", () =>
   require("@react-native-async-storage/async-storage/jest/async-storage-mock")
);

jest.mock("expo-router", () => ({
   useRouter: () => ({
      push: jest.fn(),
      replace: jest.fn(),
   }),
}));

jest.mock("../../store/authStore", () => ({
   useAuthStore: {
      getState: jest.fn(),
   },
}));

import { useAuthStore } from "@/store/authStore";
import { SupabaseClient } from "@supabase/supabase-js";
import { LogOutFlow, signInFlow, SignInResult } from "../../Services/authService";

const mockSupabase = {
   auth: {
      signInWithPassword: jest.fn(),
   },
} as unknown as SupabaseClient;

const setSession = jest.fn();
const fetchProfile = jest.fn();

describe("signInFlow", () => {
   beforeEach(() => {
      jest.clearAllMocks();
   });

   test("returns MISSING_FIELDS when email or password is empty", async () => {
      const res: SignInResult = await signInFlow({
         email: "",
         password: "",
         setSession,
         fetchProfile,
         supabase: mockSupabase,
      });
      expect(res).toEqual({ error: "MISSING_FIELDS" });
   });

   test("calls supabase.auth.signInWithPassword with correct params", async () => {
      (mockSupabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
         data: { session: null, user: null },
         error: null,
      });

      await signInFlow({
         email: "test@mail.com",
         password: "123456",
         setSession,
         fetchProfile,
         supabase: mockSupabase,
      });

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
         email: "test@mail.com",
         password: "123456",
      });
   });

   test("sets session and fetches profile on successful login", async () => {
      (mockSupabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
         data: { session: { access_token: "abc" }, user: { id: "user123" } },
         error: null,
      });

      const res: SignInResult = await signInFlow({
         email: "test@mail.com",
         password: "123456",
         setSession,
         fetchProfile,
         supabase: mockSupabase,
      });

      expect(mockSupabase.auth.signInWithPassword).toHaveBeenCalledWith({
         email: "test@mail.com",
         password: "123456",
      });

      expect(setSession).toHaveBeenCalledWith({ access_token: "abc" });
      expect(fetchProfile).toHaveBeenCalledWith("user123");
      expect(res).toEqual({ profile: true, userId: "user123" });
   });

   test("returns error when supabase returns an error", async () => {
      (mockSupabase.auth.signInWithPassword as jest.Mock).mockResolvedValue({
         data: null,
         error: { message: "Invalid credentials" },
      });

      const res = await signInFlow({
         email: "a@b.com",
         password: "1",
         setSession,
         fetchProfile,
         supabase: mockSupabase,
      });

      expect(res).toEqual({ error: "Invalid credentials" });
   });

   test("returns UNKNOWN_ERROR on exception", async () => {
      (mockSupabase.auth.signInWithPassword as jest.Mock).mockRejectedValue(new Error("Boom"));

      const res = await signInFlow({
         email: "a@b.com",
         password: "1",
         setSession,
         fetchProfile,
         supabase: mockSupabase,
      });

      expect(res).toEqual({ error: "Boom" });
   });
});

describe("LogOutFlow", () => {
   test("logs out user and resets session", async () => {
      const signOutMock = jest.fn();
      const resetSessionMock = jest.fn();

      (useAuthStore.getState as jest.Mock).mockReturnValue({
         signOut: signOutMock,
         resetSession: resetSessionMock,
      });

      await LogOutFlow();

      expect(signOutMock).toHaveBeenCalled();
      expect(resetSessionMock).toHaveBeenCalled();
   });
});
