import { emailRegex, formatLabel } from "@/lib/utils";
import { useFormStore } from "@/store/useFormStore";
import React from "react";
import { View } from "react-native";
import { AppInput } from "../Input.tsx";
import Button from "../ui/Button";
import { InputFieldProps } from "./types";

/**
 * A reusable form component that renders a list of configurable input fields
 * and performs basic client-side validation before submitting.
 *
 * - Reads values and errors from the global `useFormStore` so multiple screens
 *   can share the same form state.
 * - Validates:
 *   - Required fields
 *   - Email format (when `field.email` is true)
 *   - Phone number length between 7 and 10 characters (when `field.phoneNumber` is true)
 *
 * When all fields are valid it calls the optional `onSubmit` callback.
 *
 * @component
 *
 * @param {InputFieldProps} props
 * @param {Array<InputField>} props.fields
 * A list of field configurations that control how each `AppInput` is rendered.
 *
 * @param {string} [props.submitBtnLabel="Continue"]
 * Optional label for the submit button.
 *
 * @param {() => void} [props.onSubmit]
 * Optional callback invoked after successful validation.
 *
 * @param {boolean} [props.loading]
 * Optional loading state passed to the submit button.
 *
 * @returns {JSX.Element} The rendered form component.
 */

export default function FormInput({ fields, submitBtnLabel = "Continue", onSubmit, loading }: InputFieldProps) {
   const { setFormData, setFormErrors, errors, formData } = useFormStore();

   const handleSubmit = () => {
      const newErrors: Record<string, string> = {};
      let isValid = true;

      fields.forEach((field) => {
         const fieldName = field.name;
         const required = field.required;
         const value = formData[fieldName];
         const isEmail = field.type === "email";
         const isPhone = field.type === "phone";

         if (required && !value) {
            newErrors[fieldName] = `${formatLabel(fieldName)} is required`;
            isValid = false;
         }

         if (value && isEmail && !emailRegex.test(value)) {
            newErrors[fieldName] = "Please enter a valid email";
            isValid = false;
         }
         if (value && isPhone && (value.length < 7 || value?.length > 10)) {
            newErrors[fieldName] = "Please enter a valid phone number";
            isValid = false;
         }
      });
      setFormErrors(newErrors);

      if (isValid) {
         if (onSubmit) onSubmit();
      }
   };

   return (
      <View className="">
         {fields.map((field) => {
            const {
               label,
               leftIcon,
               rightIcon,
               disabled,
               suffix,
               isPassword,
               isSelect,
               placeholder,
               caption,
               selectOptions,
               selectOptionsTitle,
            } = field;

            return (
               <View className="mb-4" key={field.name}>
                  <AppInput
                     hasError={Boolean(errors?.[field.name])}
                     label={label}
                     leftIcon={leftIcon}
                     rightIcon={rightIcon}
                     disabled={disabled}
                     errorMessage={errors[field.name]}
                     phoneNumber={field.type === "phone"}
                     isPassword={isPassword}
                     isSelect={isSelect}
                     selectOptions={selectOptions}
                     suffix={suffix}
                     value={formData[field.name] || ""}
                     onChangeText={(text: any) => {
                        setFormData({ [field.name]: text });

                        if (errors[field.name]) {
                           setFormErrors({ [field.name]: undefined });
                        }
                     }}
                     placeholder={placeholder}
                     caption={caption}
                     email={field.type === "email"}
                     selectOptionsTitle={selectOptionsTitle}
                  />
               </View>
            );
         })}
         <Button text="" onPress={handleSubmit} />
      </View>
   );
}
