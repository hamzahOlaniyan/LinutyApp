// import FormInput from "@/components/ui/FormInput";
// import StepContainer from "@/components/ui/StepContainer";
// import { appColors } from "@/constant/colors";
// import { wp } from "@/constant/common";
// import { useFormStore } from "@/store/useFormStore";
// import { useRouter } from "expo-router";
// import React from "react";
// import { View } from "react-native";
// import { SafeAreaView } from "react-native-safe-area-context";
// import { SignInValues } from "../auth/sign-in";
// import { OnboardingField } from "./1-date-of-birth";

// export default function DateOfBirth() {
//   const router = useRouter();
//   const { formData } = useFormStore();

//   // console.log(JSON.stringify(formData, null, 2));

//   const DateOfBirth: OnboardingField[] = [
//     {
//       name: "gender",
//       placeholder: "Gender at birth",
//       required: true,
//       mode: "select",
//       selectOptions: [
//         { label: "male", value: "male" },
//         { label: "female", value: "female" }
//       ]
//     }
//   ];

//   const handleNext = async () => {
//     const values = formData as unknown as Partial<SignInValues>;
//     if (values) {
//       router.push("/onboarding-flow/3-country");
//     }
//   };

//   return (
//     <SafeAreaView
//       style={{
//         paddingHorizontal: wp(3),
//         backgroundColor: appColors.white,
//         flex: 1
//       }}
//     >
//       <StepContainer
//         heading="What's your gender?"
//         paragraph="Tell us your gender to help personalize your experience on Linuty. This information can make your profile more complete and help others connect with you in a way that feels authentic."
//       >
//         <View className="my-6 justify-center gap-4">
//           <FormInput
//             fields={DateOfBirth}
//             onSubmit={() => handleNext()}
//             submitBtnLabel="Continue"
//           />
//         </View>
//       </StepContainer>
//     </SafeAreaView>
//   );
// }

import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import {
  OnboardingFlowState,
  useOnbardingFlowForm
} from "@/store/useOnbardingFlowForm";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

export default function Gender() {
  const { form, errors, updateField, setError, nextStep } =
    useOnbardingFlowForm();

  const [onSelect, setOnSelect] = useState("");

  const router = useRouter();

  const handleNext = async () => {
    let valid = true;

    if (!form.gender) {
      setError("gender", "Please select your gender");
      valid = false;
      return;
    }
    if (valid) {
      nextStep();
      router.push("/onboarding-flow/3-country");
    }
  };

  const RadioSelection = ({
    select,
    field
  }: {
    select: string;
    field: keyof OnboardingFlowState["form"];
  }) => {
    return (
      <Pressable
        onPress={() => {
          setOnSelect(select);
          updateField(field, select);
        }}
        className=" flex-row justify-between py-4"
      >
        <AppText> {select}</AppText>
        <Ionicons
          name={onSelect === select ? "radio-button-on" : "radio-button-off"}
          size={24}
          color="black"
        />
      </Pressable>
    );
  };

  return (
    <View
      style={{
        paddingHorizontal: wp(3),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <StepContainer
        heading="What's your gender?"
        paragraph="Tell us your gender to help personalize your experience on Linuty. This information can make your profile more complete and help others connect with you in a way that feels authentic."
      >
        <RadioSelection select="Male" field={"gender"} />
        <RadioSelection select="Female" field={"gender"} />
        <RadioSelection select="Other" field={"gender"} />
        {errors.gender && (
          <AppText color={appColors.error}>{errors.gender}</AppText>
        )}
        <View className="my-6 gap-2">
          <GradientButton onPress={handleNext} text="Next" size="lg" />
        </View>
      </StepContainer>
    </View>
  );
}
