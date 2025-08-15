import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step3() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();

   const handleNext = async () => {
      let valid = true;

      if (!form.firstName) {
         setError("firstName", "first name is required");
         valid = false;
      }
      if (!form.surname) {
         setError("surname", "surname is required");
         valid = false;
      }

      if (!form.username) {
         setError("username", "password is required");
         valid = false;
      }

      if (!valid) return;
      if (valid) {
         nextStep();
         router.push("/(auth)/(new-user)/step-4");
      }
   };

   return (
      <ScreenWrapper>
         <View className="gap-8">
            <StepContainer
               heading=" Whats your name?"
               paragraph=" This helps your friends, family, and community easily recognize and connect. Use the name you’re most
               commonly known by, so others can find you without confusion."
            >
               <View className="gap-2">
                  <Input
                     placeholder="First name"
                     value={form.firstName}
                     onChangeText={(firstName) => updateField("firstName", firstName)}
                     inputMode="text"
                     error={!!errors.firstName}
                     errorMessage={errors.firstName}
                  />
                  <Input
                     placeholder="Last name"
                     value={form.surname}
                     onChangeText={(surname) => updateField("surname", surname)}
                     inputMode="text"
                     error={!!errors.surname}
                     errorMessage={errors.surname}
                  />
               </View>
            </StepContainer>
            <StepContainer
               heading="Create a username"
               paragraph="Pick a unique username that represents you on Linuty. This will be your identity across the app, making it easy for others to find and connect with you."
            >
               <Input
                  placeholder="Username"
                  value={form.username}
                  onChangeText={(username) => updateField("username", username)}
                  inputMode="text"
                  error={!!errors.username}
                  errorMessage={errors.username}
               />
            </StepContainer>
         </View>

         <View className="gap-2 my-6">
            <Button onPress={handleNext} title="Next" size="lg" />
         </View>
      </ScreenWrapper>
   );
}
