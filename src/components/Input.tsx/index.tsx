import { appColors } from "@/constant/colors";
import Icon from "@/icons";
import { cva } from "class-variance-authority";
import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "../ui/AppText";
import InputModal from "./InputModal";
import { suffixOptions } from "./suffixOptions";
import { AppInputProps, CountryItem, MetricItem, SelectOption } from "./types";

/**
 * Wrapper styles for the input container.
 *
 * Uses class-variance-authority (CVA) to apply conditional styles
 * based on `hasError` and `disabled` variants.
 */
export const inputWrapper = cva(
   "w-full flex-row items-center rounded-sm bg-neutral border border-border h-[48px] px-3 font-Regular",
   {
      variants: {
         hasError: {
            true: "border border-red-500",
            false: "",
         },
         disabled: {
            true: "opacity-50",
            false: "",
         },
      },
      defaultVariants: {
         hasError: false,
         disabled: false,
      },
   }
);

/**
 * Builds the options list for the `InputModal` component.
 *
 * - If `customOptions` is provided, it is returned as-is (e.g. custom select lists).
 * - If `phoneNumber` is true, transforms `suffixOptions.Countries` into `SelectOption[]`.
 * - If `suffix` is provided, transforms metric suffix items into `SelectOption[]`.
 *
 * @param {boolean} phoneNumber
 * Whether the input is in phone-number mode (uses country list).
 *
 * @param {MetricItem[] | undefined} suffix
 * Optional metric suffix list used when `phoneNumber` is false.
 *
 * @param {SelectOption[] | undefined} [customOptions]
 * Optional custom options to override the default transformation logic.
 *
 * @returns {SelectOption[]} The list of options to display in the modal.
 */

// 1. Strictly Typed Helper Function
const getModalOptions = (
   phoneNumber: boolean,
   suffix: MetricItem[] | undefined,
   customOptions?: SelectOption[]
): SelectOption[] => {
   // A. Return custom options if passed (e.g. Health list)
   if (customOptions) return customOptions;

   // B. Transform Countries (Hardcoded or imported data)
   if (phoneNumber) {
      return suffixOptions.Countries.map((c: CountryItem) => ({
         label: c.name,
         value: c.code,
         icon: c.flag,
         subLabel: c.dialCode,
         originalData: c,
      }));
   }

   // C. Transform Suffixes (Metrics)
   if (suffix) {
      return suffix.map((s: MetricItem) => ({
         label: s.name,
         value: s.name,
         subLabel: s.symbol,
         originalData: s,
      }));
   }

   return [];
};

/**
 * `AppInput` is a flexible input component that supports:
 *
 * - Standard text input
 * - Email input (with `email` flag -> email keyboard)
 * - Phone input with country selector and dial code prefixing (`phoneNumber`)
 * - Metric suffix selector (e.g. kg, cm)
 * - Password toggling (show/hide)
 * - Generic select mode using `InputModal`
 *
 * It handles:
 * - Prefixing phone numbers with the selected country's dial code
 * - Showing only the "raw" number (without dial code) inside the text box
 * - Updating selected metric suffix or select option via a modal
 *
 * @component
 *
 * @param {AppInputProps} props
 * The props controlling input behaviour and visual variants.
 *
 * @returns {JSX.Element} The rendered input component.
 */
export const AppInput: React.FC<AppInputProps> = ({
   label,
   leftIcon,
   rightIcon,
   suffix,
   selectOptions,
   onSelect,
   hasError,
   disabled = false,
   errorMessage,
   phoneNumber = false,
   email = false,
   isPassword,
   isSelect,
   value = "",
   placeholder,
   selectOptionsTitle,
   caption,
   onChangeText,
}) => {
   const [showPassword, setShowPassword] = useState(false);
   const [country, setCountry] = useState(suffixOptions.Countries[0]);
   const [selectedSuffix, setSelectedSuffix] = useState<MetricItem | undefined>(suffix?.[0]);
   const [visible, setVisible] = useState(false);

   const modalData = getModalOptions(!!phoneNumber, suffix, selectOptions);

   // 1. HELPER: Get the "Raw" number (without country code) for display
   // If the value is "+23480...", we only want to show "80..." in the box
   const getRawNumber = (fullValue: string, code: string) => {
      if (!fullValue) return "";
      if (fullValue.startsWith(code)) {
         return fullValue.replace(code, "");
      }
      return fullValue;
   };

   const handleModalSelect = (item: SelectOption) => {
      if (phoneNumber) {
         const countryData = item.originalData as CountryItem;
         if (countryData) {
            setCountry(countryData);

            // When country changes, update the formData with NEW code + OLD number
            if (onChangeText) {
               const currentRawNumber = getRawNumber(value, country.dialCode);
               onChangeText(`${countryData.dialCode}${currentRawNumber}`);
            }
         }
      } else if (suffix) {
         const metricData = item.originalData as MetricItem;
         if (metricData) setSelectedSuffix(metricData);
      } else if (onSelect) {
         onSelect(item);
      }

      if (isSelect && onChangeText) {
         onChangeText(item.value);
      }
   };

   return (
      <View className="w-full gap-2">
         {label && <AppText className="font-Semibold text-lg capitalize text-black">{label}</AppText>}
         {caption && <AppText className="text-md font-sans capitalize">{caption}</AppText>}
         <View className={inputWrapper({ hasError, disabled })}>
            {leftIcon && <View className="mr-3">{leftIcon}</View>}

            {phoneNumber && (
               <View>
                  <TouchableOpacity
                     onPress={() => setVisible(true)}
                     className="mr-2 flex-row items-center gap-1 border-r border-border pr-1"
                  >
                     <Text className="mr-1 text-base">{country.flag}</Text>
                     <AppText className="text-neutral-700 text-md mr-1">({country.dialCode})</AppText>
                     <View className="relative top-1">
                        <Icon name="filter" />
                     </View>
                  </TouchableOpacity>
               </View>
            )}

            <TextInput
               className="text-md flex-1 font-sans text-black"
               placeholder={placeholder}
               placeholderTextColor={appColors.text}
               secureTextEntry={!!isPassword && !showPassword}
               autoCapitalize="none"
               editable={!disabled}
               readOnly={isSelect}
               value={phoneNumber ? getRawNumber(value, country.dialCode) : value}
               onChangeText={(text) => {
                  if (onChangeText) {
                     if (phoneNumber) {
                        onChangeText(`${country.dialCode}${text}`);
                     } else {
                        onChangeText(text);
                     }
                  }
               }}
               keyboardType={email ? "email-address" : phoneNumber ? "phone-pad" : "default"}
            />

            {isPassword && (
               <TouchableOpacity onPress={() => setShowPassword(!showPassword)} className="p-4">
                  {showPassword ? <Icon name="filter" /> : <Icon name="filter" />}
               </TouchableOpacity>
            )}

            {rightIcon && <View className="ml-2">{rightIcon}</View>}

            {suffix && selectedSuffix && (
               <View>
                  <TouchableOpacity onPress={() => setVisible(true)} className="flex-row items-center gap-2">
                     <AppText className="text-neutral-700 text-md">{selectedSuffix?.symbol}</AppText>
                     <View className="relative top-1">
                        <Icon name="filter" />
                     </View>
                  </TouchableOpacity>
               </View>
            )}
            {isSelect && (
               <TouchableOpacity
                  onPress={() => setVisible(true)}
                  className="absolute left-0 right-0 top-0 h-full items-end justify-center"
               >
                  <View className="relative top-1">
                     <Icon name="filter" />
                  </View>
               </TouchableOpacity>
            )}
            <InputModal
               visible={visible}
               setVisible={setVisible}
               title={phoneNumber ? "Select Country" : selectOptionsTitle || label || "Select"}
               options={modalData}
               onSelect={handleModalSelect}
            />
         </View>

         {errorMessage ? <Text className="mt-1 text-xs text-red-500">{errorMessage}</Text> : null}
      </View>
   );
};
