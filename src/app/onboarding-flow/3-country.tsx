import FormInput from "@/components/ui/FormInput";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { COUNTRIES } from "@/data/ProfileData";
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

  // console.log(JSON.stringify(formData, null, 2));

  const countries = COUNTRIES.map(c => c).flatMap(i => [
    { label: i, value: i }
  ]);

  const DateOfBirth: OnboardingField[] = [
    {
      name: "country",
      placeholder: "Country",
      required: true,
      mode: "select",
      selectOptions: countries
    }
  ];

  const handleNext = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    if (values) {
      router.push("/onboarding-flow/4-ethnicity");
    }
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(4),
        backgroundColor: appColors.white,
        flex: 1
      }}
    >
      <StepContainer
        heading="Background Information"
        paragraph="Share your nationality and country of birth to help us build meaningful connections through lineage and community."
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
