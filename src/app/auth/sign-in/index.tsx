import { LoginParams } from "@/components/types";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import { Field } from "@/components/ui/FormInput/types";
import Terms from "@/components/ui/Terms";
import ToastModal from "@/components/ui/ToastModal";
import { appColors } from "@/constant/colors";
import { DEFAULT_TOAST_DURATION, wp } from "@/constant/common";
import { useApiMutation } from "@/hooks/useApi";
import { LoginResponse } from "@/store/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { AuthResponse } from "@supabase/supabase-js";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type SignInValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  confirm_password: string;
  otp: string;
};

export type SignInField = Omit<Field, "name"> & {
  name: keyof SignInValues;
};

export default function Signin() {
  const { formData, resetFormData } = useFormStore();
  const { setSession } = useAuthStore();

  const [toastVisible, setToastVisible] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | React.ReactNode>(
    ""
  );
  const [toastDuration, setToastDuration] = useState(DEFAULT_TOAST_DURATION);

  const showToast = (msg: string | React.ReactNode) => {
    setToastMessage(msg);
    setToastVisible(true);
  };

  const { mutate, isLoading } = useApiMutation<LoginResponse, LoginParams>(
    "post",
    "/auth/login"
  );

  const { mutate: resendVerification, isLoading: sendingVerificationEmail } =
    useApiMutation<AuthResponse, LoginParams>(
      "post",
      "/auth/resend-verification-email"
    );

  const LoginForm: SignInField[] = [
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      mode: "email",
      required: true
    },
    {
      name: "password",
      placeholder: "password",
      mode: "password",
      required: true
    }
  ];

  const handleFormSubmit = async () => {
    const values = formData as unknown as Partial<SignInValues>;
    const { email, password } = values;

    mutate(
      { email, password },
      {
        onSuccess: async data => {
          resetFormData({ password: "" });
          setSession(data);
          router.replace("/(protected)/(tabs)/(home)");
          // setToastDuration(DEFAULT_TOAST_DURATION);
          // showToast("Logged in successfully ✅");
        },
        onError: err => {
          console.log("sign in", err.message, err.response);

          if (err.message?.includes("not verified")) {
            setToastDuration(10000);
            showToast(
              <AppText>
                <AppText className="text-white">Email not verified. </AppText>
                <Pressable onPress={() => resendVerification}>
                  <AppText className="text-primary">
                    Resend verification email
                  </AppText>
                </Pressable>
              </AppText>
            );
          } else {
            showToast(err.message || "Login failed");
          }
        }
      }
    );
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(3),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <View className="flex-1 gap-20 pt-32">
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 75, height: 75, alignSelf: "center" }}
          contentFit="contain"
        />
        <FormInput
          fields={LoginForm}
          onSubmit={() => handleFormSubmit()}
          loading={isLoading || sendingVerificationEmail}
          submitBtnLabel="Sign in"
        />

        <View className="absolute bottom-5 w-full gap-4">
          <Button
            text="onboarding-flow"
            onPress={() => router.replace("/onboarding-flow")}
            variant="outline"
          />
          <Button
            text="Create new account"
            onPress={() => router.push("/auth/create-account")}
            variant="outline"
          />
          <Terms />
        </View>
      </View>
      <ToastModal
        visible={toastVisible}
        message={toastMessage}
        onClose={() => setToastVisible(false)}
        duration={toastDuration}
      />
    </SafeAreaView>
  );
}
