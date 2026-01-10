import FormInput from "@/components/ui/FormInput";
import ScreenView from "@/components/ui/Layout/ScreenView";
import {
  Notice,
  noticeBuilder,
  NoticeState
} from "@/components/ui/Notice/Index";
import StepContainer from "@/components/ui/StepContainer";
import { AuthApi } from "@/hooks/useAuthApi";
import { queryClient } from "@/lib/queryClient";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useEffect, useState } from "react";
import { View } from "react-native";
import { SignInField } from "../sign-in";

export default async function OTP() {
  const { formData } = useFormStore();
  const [notice, setNotice] = useState<NoticeState | null>(null);
  const [email, setEmail] = useState<string>("");

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const saved = await SecureStore.getItemAsync("pending_email");
      if (saved) setEmail(saved);
    })();
  }, []);

  // console.log("email otp", email);

  const verifyOtp = AuthApi.verifyOtp();

  // console.log({ email });

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
    const otp = formData?.otp ?? "";

    try {
      await verifyOtp.mutateAsync(
        { email, otp },
        {
          onSuccess: async () => {
            queryClient.invalidateQueries({ queryKey: ["me"] });
            queryClient.invalidateQueries({ queryKey: ["profile"] });
            await SecureStore.deleteItemAsync("pending_email");

            console.log("email verified ✅");
            router.replace("/onboarding-flow");
          },
          onError: error => {
            console.log("opt failed ❌", error.response?.data);
            const msg =
              (error?.response?.data as { message?: string })?.message ??
              "OTP failed";
            setNotice(noticeBuilder.error(msg));
          }
        }
      );
    } catch (error) {
      console.log("otp failed ❌", error);
    }
  };

  return (
    <ScreenView>
      <StepContainer
        heading="Enter the 6 digit confirmation code"
        paragraph={`We have sent a verification code to your email address ${formData?.email}. To confirm enter the 6-digit code.`}
      >
        <View className="my-6 justify-center gap-4">
          <FormInput
            fields={LoginForm}
            onSubmit={() => handleOTP()}
            submitBtnLabel="Continue"
            loading={verifyOtp.isLoading}
          />
          <View className="mt-4">{notice && <Notice notice={notice} />}</View>
        </View>
      </StepContainer>
    </ScreenView>
  );
}
