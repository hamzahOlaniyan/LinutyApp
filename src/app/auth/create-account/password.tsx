import FormInput from "@/components/ui/FormInput";
import Notice from "@/components/ui/Notice/Index";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SignInField } from "../sign-in";

export default function Email() {
  const { formData } = useFormStore();

  const [notice, setNotice] = useState<string | null>(null);

  const router = useRouter();

  const LoginForm: SignInField[] = [
    {
      name: "password",
      placeholder: "Password",
      type: "text",
      mode: "password",
      required: true
    },
    {
      name: "confirm_password",
      placeholder: "Confirm password",
      type: "text",
      mode: "password",
      required: true
    }
  ];

  const handlePasswordSubmit = async () => {
    if (formData.password !== formData.confirm_password) {
      setNotice("password does not match");
      return;
    }
    router.push("/auth/create-account/agreement");
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
        heading="Create a password"
        paragraph="Your password should be at least 8 characters long. Avoid using easily guessed information. (Password must a contain uppercase,lowercase, digits & symbol)."
      >
        <FormInput
          fields={LoginForm}
          onSubmit={() => handlePasswordSubmit()}
          submitBtnLabel="Continue"
        />
        <View className="mt-4">{notice && <Notice message={notice} />}</View>
      </StepContainer>
    </SafeAreaView>
  );
}
