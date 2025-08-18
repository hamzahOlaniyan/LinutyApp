// stores/useRegistrationStore.ts
import { create } from "zustand";

export type RegistrationState = {
   step: number;
   form: {
      firstName: string;
      surname: string;
      email: string;
      password: string;
      username: string;
      gender: "male" | "female" | "other" | "";
      nationality: string;
      cob: string;
      ethnicity: string;
      lineage_ids: string[];
      lineage_names: string[];
      profilePic: string;
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
      surname: "",
      email: "",
      password: "",
      username: "",
      gender: "",
      nationality: "",
      cob: "",
      ethnicity: "",
      lineage_ids: [],
      lineage_names: [],
      profilePic: "",
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
            surname: "",
            username: "",
            email: "",
            password: "",
            gender: "",
            nationality: "",
            cob: "",
            ethnicity: "",
            lineage_ids: [],
            lineage_names: [],
            profilePic: "",
         },
         errors: {},
      }),
}));
