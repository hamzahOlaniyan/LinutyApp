import AvatarPicker from "@/src/components/AvatarPicker";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step3() {
   const [avatarUrl, setAvatarUrl] = useState();
   const { form, errors, updateField, setError, nextStep, resetErrors } = useRegistrationStore();

   const router = useRouter();

   // useFocusEffect(
   //    React.useCallback(() => {
   //       return () => resetErrors();
   //    }, [resetErrors])
   // );

   // console.log("step-7", JSON.stringify(avatarUrl, null, 2));

   const onUpload = (value: any) => {
      setAvatarUrl(value);
      updateField("profilePic", value);
   };

   const handleNext = async () => {
      console.log("next");

      let valid = true;

      if (!form.profilePic) {
         setError("profilePic", "please upload an image");
         return;
      }

      if (valid) {
         nextStep();
         router.replace("/step-8");
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Add a profile picture"
            paragraph="Add a profile picture so that friends know it's you. Everyone will be able to see your picture."
         >
            <AvatarPicker size={200} url={""} onPickLocal={(uri: string) => onUpload(uri as any)} />
            {avatarUrl && (
               <View className="gap-2 my-6">
                  <Button onPress={handleNext} title="Next" size="lg" />
               </View>
            )}
         </StepContainer>
      </ScreenWrapper>
   );
}
