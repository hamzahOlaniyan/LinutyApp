import FormInput from "@/components/ui/FormInput";
import ScreenView from "@/components/ui/Layout/ScreenView";
import StepContainer from "@/components/ui/StepContainer";
import { AuthApi } from "@/hooks/useAuthApi";
import { useFormStore } from "@/store/useFormStore";
import { useRouter } from "expo-router";
import React from "react";
import { SignInField } from "../sign-in";

export default function Email() {
  const { formData } = useFormStore();

  const router = useRouter();

  // const [notice, setNotice] = useState<string | null>(null);

  const checkUsername = AuthApi.checkUsername();

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
    const username = formData.username?.trim();

    checkUsername.mutateAsync(
      { username: username ?? "" },
      {
        onSuccess: async () => {
          router.push("/auth/create-account/4.password");
        },
        onError: err => {
          console.log("error", err.response?.data);
        }
      }
    );
  };

  return (
    <ScreenView>
      <StepContainer
        heading="Create a username"
        paragraph="Pick a unique username that represents you on Linuty. This will be your identity across the app, making it easy for others to find and connect with you."
      >
        <FormInput
          fields={LoginForm}
          onSubmit={() => handleEmailSubmit()}
          loading={checkUsername.isLoading}
          submitBtnLabel="Continue"
        />
        {/* <View className="mt-4">{notice && <Notice message={notice} />}</View> */}
      </StepContainer>
    </ScreenView>
  );
}
