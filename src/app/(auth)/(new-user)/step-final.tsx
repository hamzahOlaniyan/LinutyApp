import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import React from "react";
import { View } from "react-native";

export default function StepFinal() {
   const { form } = useRegistrationStore();

   console.log(JSON.stringify(form, null, 2));

   const completeRegistration = async () => {
      try {
         //  const user = await supabase.auth.getUser(); // assume user already exists
         //  const userId = user?.data?.user?.id;

         // 1. Upload avatar if user selected one
         let avatarUrl = null;
         //  if (form?.profilePic) {
         //     avatarUrl = await uploadAvatar(userId ?? "", form?.profilePic);
         //  }

         // 2. Save the rest of the form
         //  const { error } = await supabase
         //     .from("profiles")
         //     .update({
         //        form,
         //        avatar_url: avatarUrl,
         //     })
         //     .eq("id", userId);

         //  if (error) throw error;

         console.log("Registration complete!");
      } catch (err) {
         console.error(err);
      }
   };

   return (
      <View>
         <AppText size="xxl" weight="semi">
            step-final
         </AppText>
         <View className="gap-2 my-6">
            <Button onPress={completeRegistration} title="Next" size="lg" />
         </View>
      </View>
   );
}
