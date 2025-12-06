import FormInput from "@/components/FormInput";
import { Field } from "@/components/FormInput/types";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { useApiMutation } from "@/hooks/useApi";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { LoginParams, LoginResponse } from "./types";

export default function Signin() {
   const { formData } = useFormStore();
   const setUser = useAuthStore((s) => s.setUser);

   const router = useRouter();

   const [toastVisible, setToastVisible] = useState(false);
   const [toastMessage, setToastMessage] = useState("");

   const showToast = (msg: string) => {
      setToastMessage(msg);
      setToastVisible(true);
   };

   const { mutate, isLoading } = useApiMutation<LoginResponse, LoginParams>("post", "/auth/authenticate");

   const LoginForm: Field[] = [
      { name: "email", placeholder: "Email address", required: true },
      {
         name: "password",
         placeholder: "password",
         isPassword: true,
         required: true,
      },
   ];

   const handleFormSubmit = async () => {
      const { email, password } = formData;

      mutate(
         { email, password },
         {
            onSuccess: ({ data }) => {
               setUser(data.user);
               showToast("Logged in successfully ✅");
            },
            onError: (err) => {
               showToast(err.message || "Login failed");
            },
         }
      );
   };

   return (
      <SafeAreaView style={{ paddingHorizontal: wp(4), flex: 1, backgroundColor: appColors.white }}>
         <View style={{ position: "relative", marginTop: hp(16) }}>
            <Image
               source={require("@/assets/images/logo.png")}
               style={{ width: 75, height: 75, alignSelf: "center" }}
               contentFit="contain"
            />
         </View>
         <View className="gap-2 py-6 flex-1 justify-between relative">
            <View className="gap-8 relative top-20">
               <FormInput fields={LoginForm} onSubmit={() => handleFormSubmit()} loading={isLoading} />

               {/* <GradientButton text="Sign in" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} size="lg" /> */}
            </View>
            <View className="w-full absolute bottom-5 gap-4">
               <Button
                  text="Create new account"
                  onPress={() => router.push("/auth/createAccount")}
                  size="lg"
                  variant="outline"
               />
               <View className="w-2/3 flex-row items-center justify-center flex-wrap self-center">
                  <AppText size="xs" align="center">
                     By signing in, you agree to our{" "}
                  </AppText>
                  <Pressable>
                     <AppText size="xs" align="center" color="blue">
                        Terms & Conditions,
                     </AppText>
                  </Pressable>
                  <AppText size="xs" align="center">
                     and{" "}
                  </AppText>
                  <Pressable>
                     <AppText size="xs" align="center" color="blue">
                        Privacy policy
                     </AppText>
                  </Pressable>
               </View>
            </View>
         </View>
      </SafeAreaView>
   );
}
