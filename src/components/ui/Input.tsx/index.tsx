import { Font } from "@/assets/fonts/FontFamily";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import Icon from "@/icons";
import { formatLabel } from "@/lib/utils";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import { cva } from "class-variance-authority";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, TextInput, TouchableOpacity, View } from "react-native";
import AppText from "../AppText";
import InputModal from "./InputModal";
import { suffixOptions } from "./suffixOptions";
import {
  AppInputProps,
  CountryItem,
  InputMode,
  MetricItem,
  SelectOption
} from "./types";

const formatNumberForDecimals = (raw: string, decimals: number): string => {
  const num = Number(raw);
  if (Number.isNaN(num)) return raw;

  const formatter = new Intl.NumberFormat("en-GB", {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: false // so you get "104.30" not "104.30" with commas etc
  });

  return formatter.format(num);
};

/**
 * Wrapper styles for the input container.
 *
 * Uses class-variance-authority (CVA) to apply conditional styles
 * based on `hasError` and `disabled` variants.
 */
export const inputWrapper = cva(
  "w-full flex-row items-center rounded-sm bg-neutral overflow-hidden px-4",
  {
    variants: {
      hasError: {
        true: "",
        false: ""
      },
      disabled: {
        true: "opacity-50",
        false: ""
      },
      multiline: {
        true: "items-start py-2",
        false: "items-center h-[48px]"
      }
    },
    defaultVariants: {
      hasError: false,
      disabled: false,
      multiline: false
    }
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
  phoneMode: boolean,
  suffix: MetricItem[] | undefined,
  customOptions?: SelectOption[]
): SelectOption[] => {
  // A. Return custom options if passed (e.g. Health list)
  if (customOptions) return customOptions;

  // B. Transform Countries (Hardcoded or imported data)
  if (phoneMode) {
    return suffixOptions.Countries.map((c: CountryItem) => ({
      label: c.name,
      value: c.code,
      icon: c.flag,
      subLabel: c.dialCode,
      originalData: c
    }));
  }

  // C. Transform Suffixes (Metrics)
  if (suffix) {
    return suffix.map((s: MetricItem) => ({
      label: s.name,
      value: s.name,
      subLabel: s.symbol,
      originalData: s
    }));
  }

  return [];
};

/**
 * `AppInput` is a flexible input component driven by a `mode` prop.
 *
 * Supported modes (via `mode: InputMode`):
 *
 * - `"text"`      – default text input
 * - `"email"`     – text input with email keyboard + email icon
 * - `"phone"`     – phone input with country selector and dial code prefix
 * - `"password"`  – text input with eye/eye_slash toggle and secureTextEntry
 * - `"select"`    – read-only text field with overlay + modal to pick an option
 * - `"date"`      – pressable row that opens the native date picker
 * - `"metric"`    – numeric input with a selectable metric suffix (e.g. kg, cm)
 *
 * Common behaviour:
 * - Uses `value` as a controlled input.
 * - Calls `onChangeText` with the updated value:
 *   - In `"phone"` mode, it always includes the selected `dialCode` (e.g. "+2348012…").
 *   - In `"metric"` mode, it filters input to digits + at most one decimal point.
 * - When a metric suffix is changed, it invokes `onSuffixChange` with the selected `MetricItem`.
 * - When used as a generic select, it calls `onSelect` with the chosen `SelectOption`
 *   and also calls `onChangeText` with `option.value`.
 *
 * Visual / layout props:
 * - `label`, `caption`    – optional label text and helper text above the field.
 * - `leftIcon`, `rightIcon` – optional custom icons rendered on either side.
 * - `hasError`, `errorMessage` – drives error border state and error text below.
 * - `multiline`, `minHeight` – enables multi-line layout with dynamic height.
 * - `disabled`            – makes the TextInput non-editable and dims the wrapper.
 *
 * @component
 *
 * @param {AppInputProps} props
 * @returns {JSX.Element} The rendered input component.
 */
export const AppInput: React.FC<AppInputProps> = ({
  label,
  // leftIcon,
  // rightIcon,
  suffix,
  selectOptions,
  onSelect,
  hasError,
  disabled = false,
  errorMessage,
  value = "",
  placeholder,
  selectOptionsTitle,
  caption,
  onChangeText,
  multiline,
  minHeight = 80,
  onSuffixChange,
  mode
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [country, setCountry] = useState(suffixOptions.Countries[0]);
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuffix, setSelectedSuffix] = useState<MetricItem | undefined>(
    suffix?.[0]
  );
  const [visible, setVisible] = useState(false);
  const [inputHeight, setInputHeight] = useState(minHeight);

  const [date, setDate] = useState<string | null>(null);

  const [age, setAge] = useState(0);

  const inputMode: InputMode = mode ?? "text";

  const isPhone = inputMode === "phone";
  const isSelectMode = inputMode === "select";
  const isDateMode = inputMode === "date";
  const isMetric = inputMode === "metric";
  const isEmailMode = inputMode === "email";
  const isPasswordMode = inputMode === "password";

  const shouldRenderInput = !isDateMode;

  const modalData = getModalOptions(isPhone, suffix, selectOptions);

  // 1. HELPER: Get the "Raw" number (without country code) for display
  // If the value is "+23480...", we only want to show "80..." in the box
  const getRawNumber = (fullValue: string, code: string) => {
    if (!fullValue) return "";
    if (fullValue.startsWith(code)) {
      return fullValue.replace(code, "");
    }
    return fullValue;
  };

  const getDisplayValue = () => {
    if (isPhone) {
      return getRawNumber(value, country.dialCode);
    }

    if (isSelectMode) {
      return "";
    }

    return value;
  };

  const handleModalSelect = (item: SelectOption) => {
    if (isPhone) {
      const countryData = item.originalData as CountryItem;
      if (countryData) {
        setCountry(countryData);

        const currentRawNumber = getRawNumber(value, country.dialCode);
        onChangeText(`${countryData.dialCode}${currentRawNumber}`);
      }
    } else if (suffix) {
      const metricData = item.originalData as MetricItem;
      if (metricData) {
        setSelectedSuffix(metricData);
        onSuffixChange?.(metricData);
      }
    } else if (onSelect) {
      onSelect(item);
    }

    if (isSelectMode) {
      onChangeText(item.value);
    }
  };

  // const showLeftIcon = isPasswordMode || isEmailMode || leftIcon;

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode: "date" | undefined) => {
    DateTimePickerAndroid.open({
      value: date ? new Date(date) : new Date(), // fallback to today
      onChange,
      mode: currentMode,
      is24Hour: true
    });
  };

  const onChange = (_: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const age = moment().diff(moment(formattedDate, "YYYY-MM-DD"), "years");
      onChangeText(selectedDate.toISOString());
      setAge(age);
      setDate(formattedDate);
    }
  };

  return (
    <View>
      {label && (
        <AppText className="font-Semibold text-lg capitalize text-black">
          {label}
        </AppText>
      )}
      {caption && <AppText className="text-md font-sans">{caption}</AppText>}

      <View
        style={{
          height: hp(7),
          borderWidth: 0.9,
          marginBottom: 3,
          borderColor: isFocused
            ? appColors.inputActive
            : hasError
              ? appColors.error
              : appColors.inputInactive,
          borderRadius: 15
        }}
        className={inputWrapper({ hasError, disabled, multiline })}
      >
        {/* {showLeftIcon && (
          <View className="mr-3">
            <Icon
              name={
                isPasswordMode
                  ? "password"
                  : isEmailMode
                    ? "email"
                    : (leftIcon as string)
              }
            />
          </View>
        )} */}

        {/* {isPhone && (
          <View>
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="border-border mr-2 flex-row items-center gap-1 border-r pr-1"
            >
              <Text className="mr-1 text-base">{country.flag}</Text>
              <AppText className="text-md mr-1 text-neutral-700">
                ({country.dialCode})
              </AppText>
              <View className="relative top-1">
                <Icon name="arrow_down" />
              </View>
            </TouchableOpacity>
          </View>
        )} */}

        {isDateMode && (
          <View className="w-full flex-1 flex-row items-center justify-between">
            <Pressable
              onPress={showDatepicker}
              className="absolute h-full w-full flex-1 flex-row items-center justify-between"
            >
              <AppText className="text-md flex-1 font-sans text-black">
                {date ? moment(date).format("D MMMM YYYY") : placeholder}
              </AppText>
              {date && <AppText>{`(${age} years old)`}</AppText>}
            </Pressable>
          </View>
        )}

        {shouldRenderInput && (
          <TextInput
            testID="app-input-text"
            style={[
              { fontSize: hp(1.9), fontFamily: Font.Medium },
              multiline ? { minHeight: inputHeight } : undefined
            ]}
            className="m-0  h-full flex-1 p-0"
            placeholder={isSelectMode || isDateMode ? "" : placeholder}
            placeholderTextColor={appColors.placeholder}
            secureTextEntry={isPasswordMode && !showPassword}
            autoCapitalize="none"
            editable={!disabled}
            selectionColor={appColors.primary}
            selectionHandleColor={appColors.primary}
            readOnly={isSelectMode || isDateMode}
            value={getDisplayValue()}
            onFocus={() => setIsFocused(true)}
            onChangeText={rawText => {
              let text = rawText;

              if (isMetric && suffix && selectedSuffix) {
                text = text.replace(/[^0-9.]/g, "");
                const parts = text.split(".");
                if (parts.length > 2) {
                  text = parts[0] + "." + parts.slice(1).join("");
                }
              }

              if (isPhone) {
                onChangeText(`${country.dialCode}${text}`);
              } else {
                onChangeText(text);
              }
            }}
            onBlur={() => {
              if (!isMetric || !suffix || !selectedSuffix) return;

              const decimalsAllowed = selectedSuffix.decimals ?? 0;
              const current = getDisplayValue();
              if (!current) return;

              const formatted = formatNumberForDecimals(
                current,
                decimalsAllowed
              );

              if (isPhone) {
                onChangeText(`${country.dialCode}${formatted}`);
              } else {
                onChangeText(formatted);
              }
            }}
            keyboardType={
              isEmailMode
                ? "email-address"
                : isPhone
                  ? "phone-pad"
                  : isMetric
                    ? "decimal-pad"
                    : "default"
            }
            multiline={multiline}
            textAlignVertical={multiline ? "top" : "center"}
            onContentSizeChange={event => {
              if (!multiline) return;
              const newHeight = event.nativeEvent.contentSize.height;
              setInputHeight(Math.max(minHeight, newHeight));
            }}
          />
        )}

        {isPasswordMode && (
          <TouchableOpacity
            onPress={() => setShowPassword(!showPassword)}
            className="h-full items-center justify-center pl-4"
          >
            {showPassword ? (
              <Icon name="visibility" size={24} color={appColors.icon} />
            ) : (
              <Icon name="visibility_off" size={24} color={appColors.icon} />
            )}
          </TouchableOpacity>
        )}

        {/* {rightIcon && (
          <View className="ml-2">
            <Icon name={rightIcon as string} />
          </View>
        )} */}

        {isMetric && suffix && selectedSuffix && (
          <View className="absolute right-0 h-full justify-center">
            <TouchableOpacity
              onPress={() => setVisible(true)}
              className="flex-row items-center gap-2"
            >
              <AppText className="text-md text-neutral-700">
                {selectedSuffix.symbol}
              </AppText>
              <View className="relative top-1">
                {/* <Icon name="arrow_down" /> */}
              </View>
            </TouchableOpacity>
          </View>
        )}

        {isSelectMode && (
          <TouchableOpacity
            onPress={() => setVisible(true)}
            className="absolute left-0 right-0 top-0 h-full flex-row items-center justify-between pl-10"
          >
            <AppText>{formatLabel(value) || placeholder}</AppText>

            <View className="relative top-1">
              {/* <Icon name="arrow_down" /> */}
            </View>
          </TouchableOpacity>
        )}

        <InputModal
          visible={visible}
          setVisible={setVisible}
          title={
            isPhone ? "Select Country" : selectOptionsTitle || label || "Select"
          }
          options={modalData}
          onSelect={handleModalSelect}
        />
      </View>

      {errorMessage ? (
        <AppText variant="small" color={appColors.error}>
          {errorMessage}
        </AppText>
      ) : null}
    </View>
  );
};
