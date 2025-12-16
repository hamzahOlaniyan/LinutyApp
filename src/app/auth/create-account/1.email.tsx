import { LoginParams } from "@/components/types";
import FormInput from "@/components/ui/FormInput";
import Notice from "@/components/ui/Notice/Index";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useApiMutation } from "@/hooks/useApi";
import { useFormStore } from "@/store/useFormStore";
import { AuthResponse } from "@supabase/auth-js";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInField, SignInValues } from "../sign-in";

export default function Email() {
  const { formData } = useFormStore();

  const router = useRouter();

  const [notice, setNotice] = useState<string | null>(null);

  const { mutate, isLoading } = useApiMutation<AuthResponse, LoginParams>(
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

  const handleEmailSubmit = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    const { email } = values;

    mutate(
      { email },
      {
        onSuccess: async () => {
          router.push("/auth/create-account/2.name");
        },
        onError: err => {
          setNotice(err.message || null);
        }
      }
    );
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
        heading="What's your email address?"
        paragraph="Enter a valid email address to continue. We’ll use this email to verify your identity and send important
               updates about your Linuty account."
        footer
      >
        <FormInput
          fields={LoginForm}
          onSubmit={() => handleEmailSubmit()}
          loading={isLoading}
          submitBtnLabel="Continue"
        />
        <View className="mt-4">{notice && <Notice message={notice} />}</View>
      </StepContainer>
    </SafeAreaView>
  );
}
