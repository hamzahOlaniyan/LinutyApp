// stores/useRegistrationStore.ts
import { create } from "zustand";

type RegistrationState = {
   step: number;
   form: {
      firstName: string;
      surname: string;
      email: string;
      password: string;
      username: string;
      age: string;
      address: string;
   };
   errors: Partial<Record<keyof RegistrationState["form"], string>>;
   nextStep: () => void;
   prevStep: () => void;
   updateField: (field: keyof RegistrationState["form"], value: string) => void;
   setError: (field: keyof RegistrationState["form"], message: string) => void;
   clearError: (field: keyof RegistrationState["form"]) => void;
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
      age: "",
      address: "",
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
   reset: () =>
      set({
         step: 0,
         form: { firstName: "", surname: "", username: "", email: "", password: "", age: "", address: "" },
         errors: {},
      }),
}));
