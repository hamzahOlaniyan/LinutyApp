import React from "react";
import { InputFieldTypes } from "../Input.tsx/types";

export type FieldType = "text" | "email" | "phone" | "number";

export type Field = InputFieldTypes & {
  name: string;
  required?: boolean;
  type?: FieldType;
};

export type FormDataType = { [key: string]: string | undefined };

export type InputFieldProps = {
  fields: Field[];
  submitBtnLabel?: React.ReactNode;
  onSubmit?: () => void;
  loading?: boolean;
  footerContent?: React.ReactNode;
  customButton?:React.ReactNode;
  onChangeAnyField?:()=>void
};
