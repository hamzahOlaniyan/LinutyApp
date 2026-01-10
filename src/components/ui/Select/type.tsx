export type SelectButtonProps = {
  options: string[];
  onSelect: (value: string) => void;
  placeholder: string;
  modalTitle?: string;
  label?: string;
  snapPoints?: string[];
  snap?: number | null;
  error?: boolean;
  errorMessage?: string;
  searchable?: boolean;
  selectedValue?: string;
};
