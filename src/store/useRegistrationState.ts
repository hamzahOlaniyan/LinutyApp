// stores/useRegistrationStore.ts
import { create } from "zustand";

export type RegistrationState = {
   step: number;
   form: 
   {
      firstName: string;
      lastName: string;
      email: string;
      dob: string;
      password: string;
      username: string;
      fullLineageName: string;
      gender: "male" | "female" | "other" | "";
      location: string;
      ethnicity: string;
      lineage_ids: string[];
      lineage_names: string[];
      profession: string;
      app_interest: string[];
      interests: string[];
      avatarUrl: string;
      isFather: "Yes" | "No" | null;
   };
   errors: Partial<Record<keyof RegistrationState["form"], string>>;
   nextStep: () => void;
   prevStep: () => void;
   updateField: (field: keyof RegistrationState["form"], value: string) => void;
   setError: (field: keyof RegistrationState["form"], message: string) => void;
   clearError: (field: keyof RegistrationState["form"]) => void;
   resetErrors: () => void;
   reset: () => void;
};

export const useRegistrationStore = create<RegistrationState>((set) => ({
   step: 0,
   form: {
      firstName: "",
      lastName: "",
      dob: "",
      email: "",
      password: "",
      username: "",
      fullLineageName: "",
      gender: "" as "" | "male" | "female" | "other",
      location: "",
      ethnicity: "",
      lineage_ids: [],
      lineage_names: [],
      profession: "",
      app_interest: [],
      interests: [],
      avatarUrl: "",
      isFather: null,
   },
   errors: {},
   nextStep: () => set((s) => ({ step: s.step + 1 })),
   prevStep: () => set((s) => ({ step: s.step - 1 })),
   updateField: (field, value) =>
      set((s) => ({
         form: { ...s.form, [field]: value },
         errors: { ...s.errors, [field]: "" }, // clear error when typing
      })),
   setError: (field, message) => set((s) => ({ errors: { ...s.errors, [field]: message } })),
   clearError: (field) => set((s) => ({ errors: { ...s.errors, [field]: "" } })),
   resetErrors: () => set({ errors: {} }),
   reset: () =>
      set({
         step: 0,
         form: {
            firstName: "",
            lastName: "",
            username: "",
            email: "",
            password: "",
            fullLineageName: "",
            gender: "",
            dob: "",
            location: "",
            ethnicity: "",
            lineage_ids: [],
            lineage_names: [],
            profession: "",
            app_interest: [],
            interests: [],
            avatarUrl: "",
            isFather: null,
         },
         errors: {},
      }),
}));
