import AppText from "@/components/ui/AppText";
import FormInput from "@/components/ui/FormInput";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StepContainer from "@/components/ui/StepContainer";
import { AuthApi } from "@/hooks/useAuthApi";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect, useState } from "react";
import { ActivityIndicator, TouchableOpacity, View } from "react-native";
import { SignInField } from "../sign-in";

export default function OTP() {
  const { formData, resetForm } = useFormStore();
  // const [notice, setNotice] = useState<NoticeState | null>(null);
  const [email, setEmail] = useState<string>("");
  const [timer, setTimer] = useState(60); // countdown in seconds
  const [canResend, setCanResend] = useState(false);

  const router = useRouter();

  useEffect(() => {
    (async () => {
      const saved = await SecureStore.getItemAsync("pending_email");
      if (saved) setEmail(saved);
    })();
  }, []);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;

    if (timer > 0) {
      interval = setInterval(() => {
        setTimer(prev => prev - 1);
      }, 1000);
    } else {
      setCanResend(true);
      // clearInterval(interval);
    }

    return () => clearInterval(interval); // cleanup on unmount
  }, [timer]);

  const sendEmailOtp = AuthApi.sendEmailOtp();
  const verifyEmailOtp = AuthApi.verifyEmailOtp();

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
    const code = formData?.otp?.trim() ?? "";
    const purpose = "signup";

    try {
      await verifyEmailOtp.mutateAsync(
        { email, code, purpose },
        {
          onSuccess: async data => {
            if (data.verified) {
              console.log("email verified ✅");
              await SecureStore.deleteItemAsync("pending_email");
              router.replace("/auth");
              resetForm();
            }

            // queryClient.invalidateQueries({ queryKey: ["me"] });
            // queryClient.invalidateQueries({ queryKey: ["profile"] });
          },
          onError: error => {
            console.log("opt failed ❌", error.message?.message);
          }
        }
      );
    } catch (error) {
      console.log("otp failed ❌", error);
    }
  };

  const resendOtp = async () => {
    console.log("resend otp");

    const purpose = "signup";
    try {
      await sendEmailOtp.mutateAsync(
        { email, purpose },
        {
          onSuccess: async data => {
            console.log("OTP sent", data);
          },
          onError: error => {
            console.log("opt failed ❌", error.message?.message);
          }
        }
      );
    } catch (err) {
      console.log("resend otp fialed ❌", err);
    }
  };

  return (
    <ScreenView>
      <StepContainer
        heading="Enter the 6 digit confirmation code"
        paragraph={`We have sent a verification code to your email address ${email}. To confirm enter the 6-digit code.`}
      >
        <View className="my-6 justify-center gap-4">
          <FormInput
            fields={LoginForm}
            onSubmit={() => handleOTP()}
            submitBtnLabel="Continue"
            loading={verifyEmailOtp.isLoading}
          />
          {/* <View className="mt-4">{notice && <Notice notice={notice} />}</View> */}
          <View className="my-6 justify-center gap-4">
            {canResend ? (
              <TouchableOpacity onPress={resendOtp}>
                <AppText>
                  {sendEmailOtp.isLoading ? (
                    <ActivityIndicator size={"small"} />
                  ) : (
                    "Resend OTP"
                  )}
                </AppText>
              </TouchableOpacity>
            ) : (
              <AppText> Resend OTP in: {timer} sec</AppText>
            )}
          </View>
        </View>
      </StepContainer>
    </ScreenView>
  );
}
