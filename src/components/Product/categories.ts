import { COUNTRIES } from "@/data/ProfileData";
import { ProductAvailabilty, ProductCondition } from "../../../types/supabaseTypes";
import { SelectOption } from "../ui/Input.tsx/types";


type ConditionsTypes = {
  label: ProductCondition;
  value: ProductCondition;
};

type Availability = {
  label: ProductAvailabilty;
  value: ProductAvailabilty;
};

export const productCondition: ConditionsTypes[] = [
  { label: "NEW", value: "NEW" },
  { label: "USED_LIKE_NEW", value: "USED_LIKE_NEW" },
  { label: "USED_GOOD", value: "USED_GOOD" },
  { label: "USED_FAIR", value: "USED_FAIR" }
];

export const productAvailabilty: Availability[] = [
  { label: "IMMEDIATLY", value: "IMMEDIATLY" },
  { label: "IN_A_WEEK", value: "IN_A_WEEK" },
  { label: "IN_A_MONTH", value: "IN_A_MONTH" },
  { label: "OTHER", value: "OTHER" }
];

export const productCategory: SelectOption[] = [
  { label: "electrionic", value: "electrionic" },
  { label: "furniture", value: "furniture" },
  { label: "vehicle", value: "vehicle" },
  { label: "other", value: "other" }
];

export const available = [
  { label: "immediatly", value: "immediatly" },
  { label: "in a week", value: "in a week" },
  { label: "in a month", value: "in a month" },
  { label: "other", value: "other" }
];

 export const countries = COUNTRIES.map(c => c).flatMap(i => [
    { label: i, value: i }
  ]);