import FormInput from "@/components/ui/FormInput";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
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

  console.log(JSON.stringify(formData, null, 2));

  const DateOfBirth: OnboardingField[] = [
    {
      name: "dateOfBirth",
      placeholder: "Date of birth",
      required: true,
      mode: "date"
    }
  ];

  const handleNext = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    if (values) {
      router.push("/onboarding-flow/6-interests");
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
        heading="What's is your date of birth?"
        paragraph="Choose your date of birth. You can always make this private later."
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
