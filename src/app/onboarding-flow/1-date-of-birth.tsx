import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { useOnbardingFlowForm } from "@/store/useOnbardingFlowForm";
import {
  DateTimePickerAndroid,
  DateTimePickerEvent
} from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

export default function DateOfBirth() {
  const { form, errors, updateField, setError, nextStep } =
    useOnbardingFlowForm();

  const [date, setDate] = useState<string>(
    new Date().toISOString().split("T")[0]
  );
  const [age, setAge] = useState(0);

  const router = useRouter();

  const onChange = (event: DateTimePickerEvent, selectedDate?: Date) => {
    if (selectedDate) {
      const formattedDate = selectedDate.toISOString().split("T")[0];
      const age = moment().diff(moment(formattedDate, "YYYY-MM-DD"), "years");
      setAge(age);
      updateField("dateOfBirth", formattedDate);
      setDate(formattedDate);
    }
  };

  const showDatepicker = () => {
    showMode("date");
  };

  const showMode = (currentMode: "date" | "time") => {
    DateTimePickerAndroid.open({
      value: new Date(date),
      onChange,
      mode: currentMode,
      is24Hour: true
    });
  };

  const handleNext = async () => {
    let valid = true;

    if (!form.dateOfBirth) {
      setError("dateOfBirth", "Date of birth is required!");
      valid = false;
      return;
    }
    if (age < 18) {
      setError("dateOfBirth", "You must be at least 18 years old.");
      return;
    }
    if (valid) {
      nextStep();
      router.push("/onboarding-flow/2-gender");
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: wp(4),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <StepContainer
        heading="What's is your date of birth?"
        paragraph="Choose your date of birth. You can always make this private later."
      >
        <View
          style={{
            height: hp(7),
            borderWidth: 0.9,
            marginBottom: 3,
            borderColor: appColors.inputInactive,
            borderRadius: 15
          }}
          className={`w-full flex-row items-center justify-between px-4 `}
        >
          <AppText>{moment(date).format("D MMMM YYYY")}</AppText>
          <Pressable
            onPress={showDatepicker}
            className="absolute h-full w-full opacity-0"
          >
            <AppText>Show date picker!</AppText>
          </Pressable>
          <AppText>{`(${moment().diff(moment(date, "YYYY-MM-DD"), "years")} years old)`}</AppText>
        </View>
        {errors.dateOfBirth && (
          <AppText color={appColors.error}>{errors.dateOfBirth}</AppText>
        )}

        <View className="my-6 gap-2">
          <GradientButton onPress={handleNext} text="Next" size="lg" />
        </View>
      </StepContainer>
    </View>
  );
}
