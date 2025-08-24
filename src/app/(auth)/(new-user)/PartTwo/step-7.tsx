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

export default function Step3() {
   const [avatarUrl, setAvatarUrl] = useState();
   const { form, errors, updateField, setError, nextStep, resetErrors, reset } = useRegistrationStore();
   const { session } = useAuthStore();

   const [refreshing, setRefreshing] = React.useState(false);

   const [loading, setLoading] = useState(false);

   const router = useRouter();

   async function completeRegistration() {
      setLoading(true);
      try {
         const userId = session?.user?.id;
         uploadAvatar(userId, form.profilePic);
         //  const user = supabase.auth.getUser(); // assume user already exists

         // 1. Upload avatar if user selected one
         // let avatarUrl = null;
         // if (form.profilePic) {
         //    avatarUrl = await uploadAvatar(userId, form.profilePic);
         // }

         // 2. Save the rest of the form
         const { error } = await supabase
            .from("profiles")
            .update({
               current_location: form.location,
               clan: form.lineage_names,
               gender: form.gender,
               ethnicity: form.ethnicity,
               fullLineageName: form.fullLineageName,
               avatar_url: avatarUrl,
               isComplete: true,
               content: form.app_interest,
               interest: form.interests,
            })
            .eq("id", userId);

         if (error) {
            console.log("something went wrong", error);
            throw error;
         }

         return { status: "success" };
      } catch (err) {
         console.error("try error", err);
      }
   }

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
         completeRegistration().then((res) => {
            if (res?.status === "success") {
               onRefresh();
               router.replace("/PartTwo/step-8");
            }
         });
      }
   };

   const onRefresh = React.useCallback(() => {
      setRefreshing(true);
      setTimeout(() => {
         setRefreshing(false);
      }, 2000);
   }, []);

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
