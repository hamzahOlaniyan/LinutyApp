import FormInput from "@/components/ui/FormInput";
import ScreenView from "@/components/ui/Layout/ScreenView";
// import Notice from "@/components/ui/Notice/Index";
import {
  Notice,
  noticeBuilder,
  NoticeState
} from "@/components/ui/Notice/Index";
import StepContainer from "@/components/ui/StepContainer";
import { useApiMutation } from "@/hooks/useApi";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import React, { useState } from "react";
import { View } from "react-native";
import { SignInField, SignInValues } from "../sign-in";

export default function Email() {
  const { formData } = useFormStore();

  const router = useRouter();

  const [notice, setNotice] = useState<NoticeState | null>(null);

  const { mutate, isLoading } = useApiMutation<{ message: string }>(
    "post",
    "/auth/check-email"
  );

  const LoginForm: SignInField[] = [
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      mode: "email",
      required: true
    }
  ];

  const handleNext = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    const { email } = values;

    mutate(
      { email },
      {
        onSuccess: async () => {
          await SecureStore.setItemAsync("pending_email", email ?? "");
          router.push("/auth/create-account/2.name");
        },
        onError: err => {
          const msg =
            (err?.response?.data as { message?: string })?.message ?? "Error";
          setNotice(noticeBuilder.warning(msg));
        }
      }
    );
  };

  return (
    <ScreenView>
      <StepContainer
        heading="What's your email address?"
        paragraph="Enter a valid email address to continue. We’ll use this email to verify your identity and send important
               updates about your Linuty account."
        footer
      >
        <FormInput
          fields={LoginForm}
          onSubmit={handleNext}
          loading={isLoading}
          submitBtnLabel="Continue"
        />
        <View className="mt-4">{notice && <Notice notice={notice} />}</View>
      </StepContainer>
    </ScreenView>
  );
}
