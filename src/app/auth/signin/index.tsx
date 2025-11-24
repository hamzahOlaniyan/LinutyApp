import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/Input";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { supabase } from "@/lib/supabase";
import { getRedirectPath } from "@/navigation/authRedirect";
import { signInFlow } from "@/Services/authService";
import { useAuthStore } from "@/store/useAuthStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React from "react";
import { Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

import { Controller, useForm } from "react-hook-form";

const formSchema = z.object({
   email: z.string().email("Please enter a valid email address."),
   password: z.string().min(8, "Please enter at least 8 characters.").max(64, "Please enter fewer than 64 characters."),
});

type FormValues = z.infer<typeof formSchema>;

export default function Signin() {
   const profile = useAuthStore((s) => s.profile);

   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

   const router = useRouter();

   const {
      control,
      handleSubmit,
      formState: { errors, isSubmitting },
      reset: resetForm,
   } = useForm<FormValues>({
      resolver: zodResolver(formSchema),
      defaultValues: { email: "", password: "" },
   });

   const onSubmit = async (values: FormValues) => {
      try {
         await signInFlow({
            values,
            supabase,
            setSession,
            fetchProfile,
         });
         const redirectPath = getRedirectPath(profile);
         router.replace(redirectPath as any);
         resetForm();
      } catch (e: any) {
         console.log(e);
      }
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
               <View className="gap-2">
                  <Controller
                     control={control}
                     name="email"
                     render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                           placeholder="Email address"
                           value={value}
                           onChangeText={onChange}
                           keyboardType="email-address"
                           inputMode="text"
                           error={errors.email?.message}
                        />
                     )}
                  />
                  <Controller
                     control={control}
                     name="password"
                     render={({ field: { onChange, onBlur, value } }) => (
                        <Input
                           placeholder="••••••••"
                           value={value}
                           onChangeText={onChange}
                           secureTextEntry
                           inputMode="text"
                           isPassword={true}
                           error={errors.password?.message}
                        />
                     )}
                  />
                  <Pressable onPress={() => router.push("/auth/password-recovery")}>
                     <AppText align="right" size="sm" color={appColors.inputActive}>
                        Forgot password?
                     </AppText>
                  </Pressable>
               </View>
               <GradientButton text="Sign in" onPress={handleSubmit(onSubmit)} isLoading={isSubmitting} size="lg" />
            </View>
            <View className="w-full absolute bottom-5 gap-4">
               <Button
                  text="Create new account"
                  onPress={() => router.push("/auth/createAccount")}
                  size="lg"
                  variant="outline"
               />
               {/* <Button
                  text="skip"
                  onPress={() => router.push("/auth/new-user/PartTwo/step-6.1")}
                  size="lg"
                  variant="outline"
               /> */}
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
