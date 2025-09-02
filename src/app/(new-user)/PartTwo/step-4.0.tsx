import AppText from "@/src/components/AppText";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { DateTimePickerAndroid } from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import moment from "moment";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

export default function Step4() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();

   const [date, setDate] = useState<string>(new Date().toISOString().split("T")[0]);
   const [age, setAge] = useState(0);

   const router = useRouter();

   const onChange = (event: {}, selectedDate?: Date) => {
      if (selectedDate) {
         const formattedDate = selectedDate.toISOString().split("T")[0];
         const age = moment().diff(moment(formattedDate, "YYYY-MM-DD"), "years");
         setAge(age);
         updateField("dob", formattedDate);
         setDate(formattedDate);
      }
   };

   const showDatepicker = () => {
      showMode("date");
   };

   const showMode = (currentMode: any) => {
      DateTimePickerAndroid.open({
         value: new Date(date),
         onChange,
         mode: currentMode,
         is24Hour: true,
      });
   };

   const handleNext = async () => {
      let valid = true;

      if (!form.dob) {
         setError("dob", "Date of birth is required!");
         valid = false;
         return;
      }
      if (age < 18) {
         setError("dob", "You must be at least 18 years old.");
         return;
      }
      if (valid) {
         nextStep();
         router.push("/PartTwo/step-4");
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="What's is your date of birth?"
            paragraph="Choose your date of birth. You can always make this private later."
         >
            <View
               style={{
                  height: hp(7),
                  borderWidth: 0.9,
                  marginBottom: 3,
                  borderColor: appColors.inputInactive,
                  borderRadius: 15,
               }}
               className={`w-full flex-row items-center justify-between px-4 `}
            >
               <AppText weight="med" size="lg">
                  {moment(date).format("D MMMM YYYY")}
               </AppText>
               <Pressable onPress={showDatepicker} className="opacity-0 absolute w-full h-full">
                  <AppText>Show date picker!</AppText>
               </Pressable>
               <AppText>{`(${moment().diff(moment(date, "YYYY-MM-DD"), "years")} years old)`}</AppText>
            </View>
            {errors.dob && (
               <AppText color={appColors.error} size="sm">
                  {errors.dob}
               </AppText>
            )}

            <View className="gap-2 my-6">
               <GradientButton onPress={handleNext} text="Next" size="lg" />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
