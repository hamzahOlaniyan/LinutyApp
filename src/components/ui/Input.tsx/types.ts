import { VariantProps } from "class-variance-authority";
import { TextInputProps } from "react-native";
import { inputWrapper } from ".";

export type CountryItem = {
  code: string;
  name: string;
  dialCode: string;
  flag: string;
};

export type MetricItem = {
  name: string;
  symbol: string;
  decimals?: number;
};

export type OriginalData = CountryItem | MetricItem | Record<string, string>;

export type SelectOption = {
  label: string;
  value: string;
  icon?: string;
  subLabel?: string;
  originalData?: OriginalData;
};

export type SuffixOption = {
  name: string;
  symbol?: string;
  code?: string;
  value?: string;
  dialCode?: string;
  flag?: string;
};

export type InputMode =
  | "text"
  | "email"
  | "phone"
  | "select"
  | "date"
  | "metric"
  | "password";

export type InputFieldTypes = {
  label?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  suffix?: MetricItem[];
  disabled?: boolean;
  caption?: string;
  placeholder?: string;
  selectOptionsTitle?: string;
  selectOptions?: SelectOption[];
  multiline?: boolean;
  minHeight?: number;
  onSuffixChange?: (suffix: MetricItem) => void;
  suffixFieldName?: string;
  mode?: InputMode;
};

export type AppInputProps = InputFieldTypes &
  TextInputProps &
  VariantProps<typeof inputWrapper> & {
    errorMessage?: string;
    value: string;
    onChangeText: (text: string, name: string) => void;

    // Generic Data Source (e.g. for Health, Pain)
    selectOptions?: SelectOption[];
    onSelect?: (item: SelectOption) => void;
  };

export type ModalProps = {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  title?: string;
  options: SelectOption[];
  onSelect: (item: SelectOption) => void;
};
