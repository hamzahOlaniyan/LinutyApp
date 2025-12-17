import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Agreement() {
  // const { formData, resetFormData } = useFormStore();

  const router = useRouter();

  // console.log(JSON.stringify(formData, null, 2));

  // const { mutate, isLoading } = useApiMutation<AuthResponse>(
  //   "post",
  //   "/auth/register"
  // );

  const handleEmailSubmit = async () => {
    // const values = formData as unknown as Partial<SignInValues>;
    // const { email, password, username, firstName, lastName } = values;
    // resetFormData();
    router.push("/auth/create-account/6.otp");

    // mutate(
    //   { email, password, username, firstName, lastName },
    //   {
    //     onSuccess: async ({ data }) => {
    //       router.push("/auth/create-account/otp");
    //     },
    //     onError: err => {}
    //   }
    // );
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(3),
        backgroundColor: appColors.white,
        flex: 1
      }}
    >
      <StepContainer heading="Agree to Linuty's terms and policies">
        <View className="gap-5">
          <AppText>
            By creating an account on Linuty, you agree to use the platform
            responsibly and respectfully. You must provide accurate information,
            keep your account secure, and be at least 13 years old (or the legal
            minimum in your country).
          </AppText>
          <AppText>
            We ask all members to respect others and avoid posting harmful,
            offensive, or misleading content. Accounts that engage in
            harassment, abuse, or violations of our community guidelines may be
            suspended or removed.
          </AppText>
          <AppText>
            Your personal information (such as name, email, and lineage details)
            is collected to provide and improve our services. We will never sell
            your data to third parties, and you remain in control of your
            privacy settings.
          </AppText>
          <AppText>
            By continuing, you confirm that you have read and accepted these
            terms and our privacy practices.
          </AppText>
          <View className="mt-4">
            <GradientButton
              text="continue"
              onPress={handleEmailSubmit}
              // isLoading={isLoading}
            />
          </View>
        </View>
      </StepContainer>
    </SafeAreaView>
  );
}
