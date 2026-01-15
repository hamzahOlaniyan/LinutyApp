import { create } from "zustand";

export type OnboardingFlowState = {
   step: number;
   form: 
   {
      dateOfBirth: string;
      gender: "male" | "female" | "other" | "";
      country: string;
      ethnicity: string;
      clan:string[];
      rootClan:string;
      lineage:string;
      profession: string;
      appInterests: string[];
      interests: string[];
      avatarUrl: string;
      isFather: "Yes" | "No" | null;
   };
   errors: Partial<Record<keyof OnboardingFlowState["form"], string>>;
   nextStep: () => void;
   prevStep: () => void;
   updateField: (field: keyof OnboardingFlowState["form"], value: string | string[]) => void;
   setError: (field: keyof OnboardingFlowState["form"], message: string) => void;
   clearError: (field: keyof OnboardingFlowState["form"]) => void;
   resetErrors: () => void;
   reset: () => void;
};

export const useOnbardingFlowForm = create<OnboardingFlowState>((set) => ({
   step: 0,
   form: {
      dateOfBirth: "",
      gender: "",
      country: "",
      ethnicity: "",
      clan: [],
      rootClan:"",
      lineage:"",
      avatarUrl: "",
      profession: "",
      appInterests: [],
      interests: [],
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
            dateOfBirth: "",
            gender: "",
            country: "",
            ethnicity: "",
            clan: [],
            rootClan:"",
            lineage:"",
            profession: "",
            appInterests: [],
            interests: [],
            avatarUrl: "",
            isFather: null,
         },
         errors: {},
      }),
}));
