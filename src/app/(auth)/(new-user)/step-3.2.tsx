import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { colors } from "@/src/constant/colors";
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

   const cutomeUsername = form.firstName + form.surname;

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
         setLoading(false);
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
         router.push("/agreement");
         setLoading(false);
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Create a username"
            paragraph="Pick a unique username that represents you on Linuty. This will be your identity across the app, making it easy for others to find and connect with you."
         >
            <Input
               icon={<MaterialIcons name="alternate-email" size={20} color={colors.placeholder} />}
               placeholder="Username"
               value={form.username}
               onChangeText={(username) => updateField("username", username)}
               inputMode="text"
               error={!!errors.username}
               errorMessage={errors.username}
            />
            <View className="gap-2 my-6">
               <Button onPress={handleNext} title="Next" size="lg" />
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
