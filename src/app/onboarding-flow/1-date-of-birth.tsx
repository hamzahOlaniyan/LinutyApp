import FormInput from "@/components/ui/FormInput";
import { Field } from "@/components/ui/FormInput/types";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type OnboardingFlowValues = {
  dateOfBirth: string;
  gender: string;
  country: string;
  ethnicity: string;
  lineage: string[];
  profession: string;
  inerests: string[];
};

export type OnboardingField = Omit<Field, "name"> & {
  name: keyof OnboardingFlowValues;
};

export default function DateOfBirth() {
  const router = useRouter();
  // const { formData } = useFormStore();

  // console.log(JSON.stringify(formData, null, 2));

  const DateOfBirth: OnboardingField[] = [
    {
      name: "dateOfBirth",
      placeholder: "Date of birth",
      required: true,
      mode: "date"
    }
  ];

  const handleNext = async () => {
    // const values = formData as unknown as Partial<SignInValues>;
    // console.log({ values });

    // if (values) {
    // }
    router.push("/onboarding-flow/2-gender");
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
            onSubmit={handleNext}
            submitBtnLabel="Continue"
          />
        </View>
      </StepContainer>
    </SafeAreaView>
  );
}
