import { create } from "zustand";

export type ProductFormState = {
   form: {
      name: string;
      price: number;
      category: string;
      condition: string;
      availability: string;
      description: string;
      image: any;
   };
   errors: Partial<Record<keyof ProductFormState["form"], string>>;
   updateField: (field: keyof ProductFormState["form"], value: string | number | []) => void;
   setError: (field: keyof ProductFormState["form"], message: string) => void;
   clearError: (field: keyof ProductFormState["form"]) => void;
   resetErrors: () => void;
   resetForm: () => void;
};

export const useProductFormState = create<ProductFormState>((set) => ({
   form: {
      name: "",
      price: 0,
      category: "",
      condition: "",
      availability: "",
      description: "",
      image: [],
   },
   errors: {},
   updateField: (field, value) =>
      set((state) => ({
         form: { ...state.form, [field]: value } as ProductFormState["form"],
         errors: { ...state.errors, [field]: "" },
      })),
   setError: (field, message) => set((state) => ({ errors: { ...state.errors, [field]: message } })),
   clearError: (field) =>
      set((state) => {
         const newErrors = { ...state.errors };
         delete (newErrors as Partial<Record<string, string>>)[field];
         return { errors: newErrors };
      }),
   resetErrors: () => set(() => ({ errors: {} })),
   resetForm: () =>
      set(() => ({
         form: {
            name: "",
            price: 0,
            category: "",
            condition: "",
            availability: "",
            description: "",
            image: [],
         },
         errors: {},
      })),
}));
