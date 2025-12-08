import { FormDataType } from "@/components/ui/FormInput/types";
import { create } from "zustand";
import { FormStore } from "./types";

export const useFormStore = create<FormStore>((set) => ({
  formData: {},
  errors: {},
  setFormData: (action: Partial<FormDataType>) =>
    set((state) => ({ formData: { ...state.formData, ...action } })),
  setFormErrors: (action: Partial<FormDataType>) =>
    set((state) => ({ errors: { ...state.errors, ...action } })),
}));
