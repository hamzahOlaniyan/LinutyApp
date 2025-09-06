import ScreenWrapper from "@/src/components/ScreenWrapper";
import AppText from "@/src/components/ui/AppText";
import Button from "@/src/components/ui/Button";
import GradientButton from "@/src/components/ui/GradientButton";
import { Input } from "@/src/components/ui/Input";
import { appColors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { supabase } from "@/src/lib/supabase";
import { useAuthStore } from "@/src/store/authStore";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Pressable, View } from "react-native";

export default function index() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");
   const [loading, setLoading] = useState(false);

   const setSession = useAuthStore((s) => s.setSession);
   // const setUserProfile = useAuthStore((s) => s.setUserProfile);

   const router = useRouter();

   const handleSignIn = async () => {
      if (!email || !password) {
         Alert.alert("Please fill in all fields");
         return;
      }
      try {
         setLoading(true);
         const { error, data: session } = await supabase.auth.signInWithPassword({
            email,
            password,
         });
         setSession(session?.session);

         const { data: profile } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", session?.user?.id as string)
            .single();

         if (profile && !profile.isComplete) {
            router.replace("/(new-user)/PartTwo/step-4.0");
         } else {
            router.replace("/(app)/(tabs)");
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
      <ScreenWrapper>
         <View style={{ position: "relative", marginTop: hp(18) }}>
            <Image
               source={require("@/assets/images/tree-icon.png")}
               style={{ width: 80, height: 80, alignSelf: "center" }}
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
                  <Pressable onPress={() => router.push("/password-recovery")}>
                     <AppText align="right" size="sm" weight="med" color={appColors.inputActive}>
                        Forgot password?
                     </AppText>
                  </Pressable>
               </View>
               <GradientButton text="Sign in" onPress={handleSignIn} isLoading={loading} size="lg" />
            </View>
            <View className="w-full absolute bottom-5 gap-4">
               <Button text="Create new account" onPress={() => router.push("/(new-user")} size="lg" />
               {/* <Button text="skip" onPress={() => router.push("/(new-user)/PartTwo/step-8")} size="lg" /> */}
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
      </ScreenWrapper>
   );
}
