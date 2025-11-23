import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import GradientButton from "@/components/ui/GradientButton";
import { Input } from "@/components/ui/Input";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/store/authStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Signin() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const setSession = useAuthStore((s) => s.setSession);
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

   const router = useRouter();

   const handleSignIn = async () => {
      if (!email || !password) {
         Alert.alert("Please fill in all fields");
         return;
      }
      try {
         setLoading(true);
         const { error, data } = await supabase.auth.signInWithPassword({
            email,
            password,
         });
         setSession(data?.session);
         await fetchProfile(data?.user?.id as string);

         const profile = useAuthStore.getState().profile;
         if (profile && !profile.isComplete) {
            router.replace("/auth/new-user/PartTwo/step-4.0");
         } else {
            router.replace("/(app)/(tabs)/(home)");
         }

         if (error) Alert.alert(error.message);
         console.log("logged in");
         setLoading(false);
      } catch (error) {
         console.error("Error signing in:", error);
      } finally {
         setLoading(false);
      }
   };

   return (
      <SafeAreaView style={{ paddingHorizontal: wp(4), flex: 1, backgroundColor: appColors.white }}>
         <View style={{ position: "relative", marginTop: hp(16) }}>
            <Image
               source={require("@/assets/images/logo.png")}
               style={{ width: 100, height: 100, alignSelf: "center" }}
               contentFit="contain"
            />
         </View>
         <View className="gap-2 py-6 flex-1 justify-between relative">
            <View className="gap-8 relative top-20">
               <View className="gap-2">
                  <Input
                     placeholder="Email address"
                     value={email}
                     onChangeText={setEmail}
                     keyboardType="email-address"
                     inputMode="text"
                  />
                  <Input
                     placeholder="Password"
                     value={password}
                     onChangeText={setPassword}
                     secureTextEntry
                     inputMode="text"
                     isPassword={true}
                  />
                  <Pressable onPress={() => router.push("/auth/password-recovery")}>
                     <AppText align="right" size="sm" color={appColors.inputActive}>
                        Forgot password?
                     </AppText>
                  </Pressable>
               </View>
               <GradientButton text="Sign in" onPress={handleSignIn} isLoading={loading} size="lg" />
            </View>
            <View className="w-full absolute bottom-5 gap-4">
               <Button
                  text="Create new account"
                  onPress={() => router.push("/auth/new-user")}
                  size="lg"
                  variant="outline"
               />
               <Button
                  text="skip"
                  onPress={() => router.push("/auth/new-user/PartTwo/step-6.1")}
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
