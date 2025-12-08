import FormInput from "@/components/ui/FormInput";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInField } from "../sign-in";

export default function Username() {
  const { formData } = useFormStore();

  console.log(formData);

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
    <SafeAreaView
      style={{
        paddingHorizontal: wp(4),
        backgroundColor: appColors.white,
        flex: 1
      }}
    >
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
    </SafeAreaView>
  );
}
