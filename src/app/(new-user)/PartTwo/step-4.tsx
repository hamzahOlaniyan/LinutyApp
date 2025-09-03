import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import AppText from "@/src/components/ui/AppText";
import GradientButton from "@/src/components/ui/GradientButton";
import { appColors } from "@/src/constant/colors";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

export default function Step4() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();

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
         router.push("/PartTwo/step-5");
      }
   };

   const RadioSelection = ({ select, field }: { select: string; field: any }) => {
      return (
         <Pressable
            onPress={() => {
               setOnSelect(select), updateField(field, select);
            }}
            className=" flex-row py-4 justify-between"
         >
            <AppText size="lg" weight="semi">
               {" "}
               {select}
            </AppText>
            <Ionicons name={onSelect === select ? "radio-button-on" : "radio-button-off"} size={24} color="black" />
         </Pressable>
      );
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="What's your gender?"
            paragraph="Tell us your gender to help personalize your experience on Linuty. This information can make your profile more complete and help others connect with you in a way that feels authentic."
         >
            <RadioSelection select="Male" field={"gender"} />
            <RadioSelection select="Female" field={"gender"} />
            <RadioSelection select="Other" field={"gender"} />
            {errors.gender && (
               <AppText color={appColors.error} size="sm">
                  {errors.gender}
               </AppText>
            )}
            <View className="gap-2 my-6">
               <GradientButton onPress={handleNext} text="Next" size="lg" />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
