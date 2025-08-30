import AvatarPicker from "@/src/components/AvatarPicker";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { uploadAvatar } from "@/src/components/uploadAvatar";
import { supabase } from "@/src/lib/supabase";
import { useAuthStore } from "@/src/store/authStore";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step7() {
   const [avatarUrl, setAvatarUrl] = useState();
   const { form, errors, updateField, setError, nextStep, resetErrors, reset } = useRegistrationStore();
   const { session } = useAuthStore();

   const [loading, setLoading] = useState(false);

   const router = useRouter();

   console.log(JSON.stringify(form, null, 2));

   async function completeRegistration() {
      setLoading(true);
      try {
         const userId = session?.user?.id;
         uploadAvatar(userId, form.avatarUrl);

         const { error } = await supabase
            .from("profiles")
            .update({
               location: form.location,
               lineage_names: form.lineage_names,
               gender: form.gender,
               ethnicity: form.ethnicity,
               fullLineageName: form.fullLineageName,
               avatarUrl: form.avatarUrl,
               isComplete: true,
               app_interest: form.app_interest,
               interest: form.interests,
            })
            .eq("id", userId);

         if (error) {
            console.log("something went wrong", error);
            setLoading(false);
            throw error;
         }
         // return { status: "success" };
      } catch (err) {
         console.error("try error", err);
      }
   }

   const onUpload = (value: any) => {
      setAvatarUrl(value);
      updateField("avatarUrl", value);
   };

   const handleNext = async () => {
      let valid = true;

      if (!form.avatarUrl) {
         setError("avatarUrl", "please upload an image");
         return;
      }

      if (valid) {
         completeRegistration();
         router.replace("/PartTwo/step-8");
         // completeRegistration().then((res) => {
         //    if (res?.status === "success") {
         //       router.replace("/PartTwo/step-8");
         //    }
         // });
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
                  <GradientButton onPress={handleNext} text="Next" size="lg" isLoading={loading} />
               </View>
            )}
         </StepContainer>
      </ScreenWrapper>
   );
}
