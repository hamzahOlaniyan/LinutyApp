import Button from "@/components/ui/Button";
import { AppInput } from "@/components/ui/Input.tsx";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StepContainer from "@/components/ui/StepContainer";
import { AuthApi } from "@/hooks/useAuthApi";
import { router } from "expo-router";
import React, { useState } from "react";

export default function ForgottonPassword() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  //   const { formData } = useFormStore();

  //   const { bottom } = useSafeAreaInsets();

  //   const LoginForm: SignInField[] = [
  //     {
  //       name: "email",
  //       placeholder: "Email address",
  //       type: "email",
  //       mode: "email",
  //       required: true
  //     }
  //   ];

  console.log({ email });

  const passwordRequest = AuthApi.useResetPassword();

  const handleRequest = async () => {
    setLoading(true);
    try {
      passwordRequest.mutate(
        { email },
        { onSuccess: async d => console.log(d) }
      );
    } catch (error) {
      console.log("something went wrong", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView>
      <StepContainer
        heading={"Forgot Password"}
        paragraph="No worries, we'll send you a reset instruction"
      >
        <AppInput onChangeText={(v: string) => setEmail(v)} value={email} />
        <Button text="Request password reset" onPress={handleRequest} />
        <Button
          text="Back to login"
          variant="plain"
          onPress={() => router.back()}
          isLoading={loading}
        />
      </StepContainer>
    </ScreenView>
  );
}
