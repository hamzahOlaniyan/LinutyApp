import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import { Input } from "@/src/components/Input";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import { colors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { Link, useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, View } from "react-native";

export default function index() {
   const [email, setEmail] = useState("");
   const [password, setPassword] = useState("");

   const router = useRouter();
   return (
      <ScreenWrapper>
         <View style={{ position: "relative", marginTop: hp(18) }}>
            <Image
               source={require("@/assets/images/logo_1.svg")}
               style={{ width: 100, height: 36, objectFit: "contain", alignSelf: "center" }}
            />
         </View>
         <View className="gap-2 py-6 flex-1 justify-between relative">
            <View className="gap-8 relative top-20">
               <View className="gap-2">
                  <Input
                     icon={<MaterialCommunityIcons name="email-outline" size={18} color={colors.placeholder} />}
                     placeholder="Email address"
                     value={email}
                     onChangeText={setEmail}
                     keyboardType="email-address"
                     inputMode="text"
                  />
                  <Input
                     icon={<MaterialCommunityIcons name="lock-outline" size={18} color={colors.placeholder} />}
                     placeholder="Password"
                     value={password}
                     onChangeText={setPassword}
                     secureTextEntry
                     inputMode="text"
                     isPassword={true}
                  />
                  <Pressable>
                     <AppText align="right" size="md" weight="med">
                        Forgot password
                     </AppText>
                  </Pressable>
               </View>
               <Button
                  title="Sign in"
                  // onPress={handleSignIn}
                  // isLoading={loading}
                  disabled={!email || !password}
                  size="lg"
               />
            </View>
            <View className="gap-6 absolute bottom-5">
               <Link href={"/(auth)/(new-user)/step-1"} asChild>
                  <Button title="Create new account" size="lg" variant="outline" />
               </Link>
               <View className="flex-row items-center justify-center flex-wrap">
                  <AppText size="sm" align="center">
                     By signing in, you agree to our{" "}
                  </AppText>
                  <Pressable>
                     <AppText size="sm" align="center" color="blue">
                        Terms & Conditions,
                     </AppText>
                  </Pressable>
                  <AppText size="sm" align="center">
                     and{" "}
                  </AppText>
                  <Pressable>
                     <AppText size="sm" align="center" color="blue">
                        Privacy policy
                     </AppText>
                  </Pressable>
               </View>
            </View>
         </View>
      </ScreenWrapper>
   );
}
