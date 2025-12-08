import FormInput from "@/components/ui/FormInput";
import { Field } from "@/components/ui/FormInput/types";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type OnboardingFlowValues = {
  dateOfBirth: string;
};

export type OnboardingField = Omit<Field, "name"> & {
  name: keyof OnboardingFlowValues;
};

export default function DateOfBirth() {
  // const router = useRouter();

  const DateOfBirth: OnboardingField[] = [
    {
      name: "dateOfBirth",
      placeholder: "6 digit code",
      type: "text",
      mode: "date",
      required: true
    }
  ];

  // const handleOTP = async () => {
  //   router.replace("/onboarding-flow");
  // };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(4),
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
            // onSubmit={() => handleOTP()}
            submitBtnLabel="Continue"
          />
          {/* {canResend ? (
                  <Button text="Resend OTP" onPress={resendOtp} />
               ) : (
                  <AppText align="center"> Resend OTP in: {timer} sec</AppText>
               )} */}
        </View>
      </StepContainer>
    </SafeAreaView>
  );
}
