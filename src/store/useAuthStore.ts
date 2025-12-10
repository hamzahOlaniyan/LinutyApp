import { api } from "@/lib/api";
import { queryClient } from '@/lib/queryClient';
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getItem, removeItem, setItem } from "./secureStore";
import { AuthStore, LoginResponse, SessionResponse } from "./types";

export const useAuthStore = create<AuthStore>()(
  persist(
    (set) => ({
      initialized: false,
      hasCompletedOnboarding: false,
      user: null,
      me: null,
      session: null,
      accessToken: null,
      refreshToken: null,

      // -------------------------------
      // LOGIN
      // -------------------------------
      setAuthFromLogin: ({ user, accessToken, refreshToken }: LoginResponse) =>
        set({
          user,
          accessToken,
          refreshToken,
          session: null,
          me: null                      // will load via /profile/me
        }),

      // -------------------------------
      // RESTORE SESSION ON APP LOAD
      // -------------------------------
      setSession: async () => {
        try {
          const res = await api.get<SessionResponse>("auth/session");

          // NOT logged in
          if (!res.data) {
            set({
              user: null,
              accessToken: null,
              refreshToken: null,
              session: null,
              me: null
            });
            return;
          }

          // Logged in → set tokens + user
          const session = res.data;
            set((state: AuthStore) => ({
            ...state,
            user: session.user ?? null,
            accessToken: session.accessToken ?? null,
            refreshToken: session.refreshToken ?? null,
            session: {
              access_token: session.accessToken ?? null,
              refresh_token: session.refreshToken ?? null,
              expires_in: session.expires_in ?? null,
              token_type: session.token_type ?? null,
              user: session.user 
            }
            }));

          // Now fetch profile/me

          const profileRes = await api.get("/profile/me");

          // console.log("➡️ PROFILE RESPONSE RAW:", JSON.stringify(profileRes.data, null, 2));

          const profile = profileRes.data?.data ?? profileRes.data ?? null;

          // console.log("➡️ PROFILE PARSED:", profile);

          set({ me: profile });
          // console.log("➡️ PROFILE STORED IN STATE");

        } catch (err) {
          console.log("Session restore failed:", err);

          set({
            user: null,
            accessToken: null,
            refreshToken: null,
            session: null,
            me: null
          });
        }
      },

      // -------------------------------
      // PROFILE
      // -------------------------------
      setMe: (me) => set({ me }),

      // -------------------------------
      // LOGOUT
      // -------------------------------
      signOut: async () => {
        try {
          await api.post("/auth/logout");
        } catch {
          console.log('log out failed');
          
        }

        set({
          user: null,
          accessToken: null,
          refreshToken: null,
          session: null,
          me: null
        });

        queryClient.clear();
      },

      completeOnboarding: () => set({ hasCompletedOnboarding: true }),
      resetOnboarding: () => set({ hasCompletedOnboarding: false })
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => ({
        getItem,
        setItem,
        removeItem
      })),

      // ⭐ Persist user + tokens + me
      partialize: (state) => ({
        user: state.user,
        accessToken: state.accessToken,
        refreshToken: state.refreshToken,
        me: state.me,
        hasCompletedOnboarding: state.hasCompletedOnboarding
      }),

      onRehydrateStorage: () => (state) => {
        if (state) state.initialized = true;
      }
    }
  )
);


// export const useAuthStore = create<AuthStore>()(
//   persist(
//     (set) => ({
//       initialized: false,
//       hasCompletedOnboarding: false,
//       user: null,
//       me:null,
//       session: null,
//       accessToken: null,
//       refreshToken: null,


//       setAuthFromLogin: ({ user, accessToken, refreshToken }) =>
//         set((state) => {
//           console.log("🔥 setAuthFromLogin called with:", {
//             user,
//             accessToken,
//             refreshToken
//           });

//           return {
//             ...state,
//             user,
//             accessToken,
//             refreshToken,
//             me: null,        // profile will be fetched by /profile/me
//             session: null    // you don't really need this if you're using tokens
//           };
//         }),

          
//       setSession: async () => {
//         try {
//           const res = await api.get<LoginResponse>("auth/session");

//           set({
//             session: null, // or remove from store
//             user: res.data.user ?? null,
//             accessToken: res.data.accessToken ?? null,
//             refreshToken: res.data.refreshToken ?? null,
//           });
//         } catch (err) {
//           console.log("failed to get session", err);
//         }
//       },

      
//       setMe: (me) => set({ me }),
      
//       setUser: async (user) => set({ user }),

//       signOut: async () => {
//         await api.post("/auth/logout");

//         set({
//           user: null,
//           accessToken: null,
//           refreshToken: null,
//           me: null,
//           session:null
//         });

//         queryClient.clear();
//       },

//       completeOnboarding: () => {
//         set((state) => ({ ...state, hasCompletedOnboarding: true }));
//       },
//       resetOnboarding: () => {
//         set((state) => ({ ...state, hasCompletedOnboarding: false }));
//       },
//     }),
//     {
//       name: "auth-store",
//       storage: createJSONStorage(() => ({
//         getItem,
//         setItem,
//         removeItem,
//       })),
//       partialize: (state) => ({
//         user: state.user,
//         hasCompletedOnboarding: state.hasCompletedOnboarding,
//       }),
//       onRehydrateStorage: () => (state, error) => {
//         if (error) {
//           console.log("rehydration error", error);
//           return;
//         }
//         if (state) {
//           state.initialized = true;
//         }
//       },
//     },
//   ),
// );


