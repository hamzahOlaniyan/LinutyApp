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

  const { mutate, isLoading } = useApiMutation<AuthResponse>(
    "post",
    "/auth/check-username"
  );

  const LoginForm: SignInField[] = [
    {
      name: "username",
      placeholder: "username",
      type: "text",
      mode: "text",
      required: true
    }
  ];

  const handleEmailSubmit = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    const { username } = values;

    mutate(
      { username },
      {
        onSuccess: async () => {
          router.push("/auth/create-account/password");
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
        paddingHorizontal: wp(4),
        backgroundColor: appColors.white,
        flex: 1
      }}
    >
      <StepContainer
        heading="Create a username"
        paragraph="Pick a unique username that represents you on Linuty. This will be your identity across the app, making it easy for others to find and connect with you."
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
