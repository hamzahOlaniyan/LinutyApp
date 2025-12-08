import FormInput from "@/components/ui/FormInput";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInField } from "../sign-in";

export default function OTP() {
  const { formData } = useFormStore();

  const router = useRouter();

  const LoginForm: SignInField[] = [
    {
      name: "otp",
      placeholder: "6 digit code",
      type: "text",
      mode: "text",
      required: true
    }
  ];

  const handleOTP = async () => {
    router.replace("/onboarding-flow");
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
        heading="Enter the 6 digit confirmation code"
        paragraph={`We have sent a verification code to your email address ${formData.email}. To confirm enter the 6-digit code.`}
      >
        <View className="my-6 justify-center gap-4">
          <FormInput
            fields={LoginForm}
            onSubmit={() => handleOTP()}
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
