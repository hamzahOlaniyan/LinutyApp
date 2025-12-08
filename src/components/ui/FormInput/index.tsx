import { emailRegex, formatLabel } from "@/lib/utils";
import { useFormStore } from "@/store/useFormStore";
import React from "react";
import { View } from "react-native";
import GradientButton from "../GradientButton";
import { AppInput } from "../Input.tsx";
import { FieldType, InputFieldProps } from "./types";

/**
 * A reusable form component that renders a list of configurable input fields
 * and performs basic client-side validation before submitting.
 *
 * - Reads values and errors from the global `useFormStore` so multiple screens
 *   can share the same form state.
 *
 * - Each field combines:
 *   - `mode` (UI behaviour, e.g. `"text" | "email" | "phone" | "password" | "select" | "date" | "metric"`)
 *   - `type` (semantic/validation behaviour, e.g. `"text" | "email" | "phone" | "number"`)
 *
 * - Validation rules:
 *   - Required fields:
 *     - If `field.required` is true and `value` is empty:
 *       - `mode === "select"` → `"Please select an option"`
 *       - `mode === "date"`   → `"Please select a date"`
 *       - otherwise           → `"<Pretty Field Name> is required"`
 *         (using `formatLabel(field.name)`)
 *   - Email format:
 *     - If `field.type === "email"`, validates with `emailRegex`
 *   - Phone number length:
 *     - If `field.type === "phone"`, value length must be between 9 and 14 characters
 *
 * When all fields are valid it calls the optional `onSubmit` callback.
 *
 * @component
 *
 * @param {InputFieldProps} props
 * @param {Array<Field>} props.fields
 *   A list of field configurations that control how each `AppInput` is rendered and validated.
 *
 * @param {string} [props.submitBtnLabel="Continue"]
 *   Optional label for the submit button.
 *
 * @param {() => void} [props.onSubmit]
 *   Optional callback invoked after successful validation.
 *
 * @param {boolean} [props.loading]
 *   Optional loading state passed to the submit button.
 *
 * @param {React.ReactNode} [props.footerContent]
 *   Optional content rendered below the fields and above the submit button.
 *
 * @returns {JSX.Element} The rendered form component.
 */

export default function FormInput({
  fields,
  submitBtnLabel = "Continue",
  onSubmit,
  loading
}: InputFieldProps) {
  const { setFormData, setFormErrors, errors, formData } = useFormStore();

  const handleSubmit = () => {
    const newErrors: Record<string, string> = {};
    let isValid = true;

    fields.forEach(field => {
      const fieldName = field.name;
      const required = field.required;
      const value = formData[fieldName];

      const semanticType: FieldType = field.type ?? "text";

      const isEmail = semanticType === "email";
      const isPhone = semanticType === "phone";
      const isSelectMode = field.mode === "select";
      const isDateMode = field.mode === "date";

      // Required validation
      if (required && !value) {
        if (isSelectMode) {
          newErrors[fieldName] = "Please select an option";
        } else if (isDateMode) {
          newErrors[fieldName] = "Please select a date";
        } else {
          newErrors[fieldName] = `${formatLabel(fieldName)} is required`;
        }
        isValid = false;
      }

      // Email format
      if (value && isEmail && !emailRegex.test(value)) {
        newErrors[fieldName] = "Please enter a valid email";
        isValid = false;
      }

      // Phone length (you can adjust limits if needed)
      if (value && isPhone && (value.length < 9 || value.length > 14)) {
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
      {fields.map(field => {
        const {
          name,
          label,
          leftIcon,
          rightIcon,
          disabled,
          suffix,
          mode,
          placeholder,
          caption,
          selectOptions,
          selectOptionsTitle,
          multiline,
          minHeight,
          suffixFieldName
        } = field;

        return (
          <View className="mb-4" key={field.name}>
            <AppInput
              mode={mode}
              hasError={Boolean(errors?.[name])}
              label={label}
              leftIcon={leftIcon}
              rightIcon={rightIcon}
              disabled={disabled}
              errorMessage={errors[name]}
              selectOptions={selectOptions}
              suffix={suffix}
              value={formData[name] || ""}
              onChangeText={text => {
                setFormData({ [name]: text });

                if (errors[name]) {
                  setFormErrors({ [name]: undefined });
                }
              }}
              placeholder={placeholder}
              caption={caption}
              selectOptionsTitle={selectOptionsTitle}
              multiline={multiline}
              minHeight={minHeight}
              onSuffixChange={metric => {
                if (!suffixFieldName) return;
                setFormData({
                  [suffixFieldName]: metric.symbol
                });
              }}
            />
          </View>
        );
      })}
      <GradientButton
        text={submitBtnLabel}
        onPress={handleSubmit}
        isLoading={loading}
      />
    </View>
  );
}
