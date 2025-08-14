import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step2() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();
   const [confirmPassword, setConfirmPassword] = useState("");
   const [passwordError, setPasswordError] = useState("");

   const handleNext = async () => {
      console.log("next");

      let valid = true;

      if (!form.password) {
         setError("password", "password is required");
         valid = false;
      }

      if (!confirmPassword) {
         setPasswordError("please confirm your password");
         valid = false;
      } else if (form.password !== confirmPassword) {
         setPasswordError("Password does not match");
         return;
      }

      if (!valid) return;
      if (valid) {
         nextStep();
         router.push("/(auth)/(new-user)/step-3");
         setConfirmPassword("");
      }
   };

   return (
      <ScreenWrapper>
         <View className="gap-6">
            <AppText size="xxl" weight="bold">
               Create a password
            </AppText>
            <AppText size="lg" weight="med">
               Your password should be at least 8 characters long. Avoid using easily guessed information.
            </AppText>
            <View className="gap-2">
               <Input
                  placeholder="Password"
                  value={form.password}
                  onChangeText={(password) => updateField("password", password)}
                  secureTextEntry
                  inputMode="text"
                  isPassword={true}
                  error={!!errors.password}
                  errorMessage={errors.password}
               />
               <Input
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  secureTextEntry
                  inputMode="text"
                  isPassword={true}
                  error={!!passwordError}
                  errorMessage={passwordError}
               />
            </View>
            <View className="gap-2 my-6">
               <Button onPress={handleNext} title="Next" size="lg" />
            </View>
         </View>
      </ScreenWrapper>
   );
}
