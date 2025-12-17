import FormInput from "@/components/ui/FormInput";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { ETHNICITIES } from "@/data/ProfileData";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInValues } from "../auth/sign-in";
import { OnboardingField } from "./1-date-of-birth";

export default function DateOfBirth() {
  const router = useRouter();
  const { formData } = useFormStore();

  const countries = ETHNICITIES.map(c => c).flatMap(i => [
    { label: i, value: i }
  ]);

  const DateOfBirth: OnboardingField[] = [
    {
      name: "ethnicity",
      placeholder: "Your ethnicity",
      required: true,
      mode: "select",
      selectOptions: countries
    }
  ];

  const handleNext = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    if (values) {
      router.push("/onboarding-flow/5-profession");
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(3),
        backgroundColor: appColors.white,
        flex: 1
      }}
    >
      <StepContainer
        heading="What is your lineage"
        paragraph="Share your nationality and country of birth to help."
      >
        <View className="my-6 justify-center gap-4">
          <FormInput
            fields={DateOfBirth}
            onSubmit={() => handleNext()}
            submitBtnLabel="Continue"
          />
        </View>
      </StepContainer>
    </SafeAreaView>
  );
}
