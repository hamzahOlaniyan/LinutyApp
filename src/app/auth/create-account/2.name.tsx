import FormInput from "@/components/ui/FormInput";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StepContainer from "@/components/ui/StepContainer";
import { useRouter } from "expo-router";
import React from "react";
import { SignInField } from "../sign-in";

export default function Username() {
  const router = useRouter();

  const LoginForm: SignInField[] = [
    {
      name: "firstName",
      placeholder: "First name",
      type: "text",
      mode: "text",
      required: true
    },
    {
      name: "lastName",
      placeholder: "Last name",
      type: "text",
      mode: "text",
      required: true
    }
  ];

  const handleEmailSubmit = async () => {
    router.push("/auth/create-account/3.username");
  };

  return (
    <ScreenView>
      <StepContainer
        heading="What's your name?"
        paragraph="This helps your friends, family, and community to easily recognize and connect."
      >
        <FormInput
          fields={LoginForm}
          onSubmit={() => handleEmailSubmit()}
          submitBtnLabel="Next"
        />
      </StepContainer>
    </ScreenView>
  );
}
