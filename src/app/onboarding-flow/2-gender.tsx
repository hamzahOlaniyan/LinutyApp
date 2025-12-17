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

  // console.log(JSON.stringify(formData, null, 2));

  const DateOfBirth: OnboardingField[] = [
    {
      name: "gender",
      placeholder: "Gender at birth",
      required: true,
      mode: "select",
      selectOptions: [
        { label: "male", value: "male" },
        { label: "female", value: "female" }
      ]
    }
  ];

  const handleNext = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    if (values) {
      router.push("/onboarding-flow/3-country");
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
        heading="What's your gender?"
        paragraph="Tell us your gender to help personalize your experience on Linuty. This information can make your profile more complete and help others connect with you in a way that feels authentic."
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
