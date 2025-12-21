import { FormDataType } from "@/components/ui/FormInput/types";
import { create } from "zustand";
import { FormStore } from "./types";

export const useFormStore = create<FormStore>((set) => ({
  formData: {},
  errors: {},

  setFormData: (action: Partial<FormDataType>) =>
    set((state) => ({
      formData: { ...state.formData, ...action }
    })),

  setFormErrors: (action: Partial<FormDataType>) =>
    set((state) => ({
      errors: { ...state.errors, ...action }
    })),

  setFormDataErrors: (action: Partial<FormDataType>) =>
  set((state) => ({
    formData: { ...state.formData, ...action },
    errors: { ...state.errors, ...action } // only if you really want same keys
  })),


  // ⭐ Generic reset for any fields
  resetFormData: (fields: Partial<FormDataType>) =>
    set((state) => ({
      formData: { 
        ...state.formData,
        ...fields  // overwrite only the fields you specify
      }
  })),

  resetForm: () =>
    set(() => ({
      formData: {},
      errors: {}
    })),
}));
