import StepContainer from "@/src/components/StepContainer";
import GradientButton from "@/src/components/ui/GradientButton";
import { Input } from "@/src/components/ui/Input";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { supabase } from "@/src/lib/supabase";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step3() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const [loading, setLoading] = useState(false);
   const router = useRouter();

   const handleNext = async () => {
      let valid = true;

      if (!form.username) {
         setError("username", "username is required");
         valid = false;
         3;
      }

      setLoading(true);

      const { data, error } = await supabase
         .from("profiles") // 👈 your users table
         .select("id")
         .eq("username", form.username)
         .maybeSingle();

      if (data) {
         setError("username", "this username name has already been taken, choose another one");
         valid = false;
         return;
      }

      if (error) {
         setError("email", "Error checking email, try again later");
         valid = false;
         return;
      }

      if (!valid) return;
      if (valid) {
         nextStep();
         setLoading(false);
         router.push("/PartOne/agreement");
      }
   };

   return (
      <View style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, flex: 1 }}>
         <StepContainer
            heading="Create a username"
            paragraph="Pick a unique username that represents you on Linuty. This will be your identity across the app, making it easy for others to find and connect with you."
         >
            <Input
               icon={<MaterialIcons name="alternate-email" size={20} color={appColors.placeholder} />}
               placeholder="Username"
               value={form.username}
               onChangeText={(username) => updateField("username", username)}
               inputMode="text"
               error={!!errors.username}
               errorMessage={errors.username}
            />
            <View className="gap-2 my-6">
               <GradientButton onPress={handleNext} text="Next" size="lg" isLoading={loading} />
            </View>
         </StepContainer>
      </View>
   );
}
