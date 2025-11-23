import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { useAuthStore } from "@/store/authStore";
import { useRegistrationStore } from "@/store/useRegistrationState";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { Stack, useRouter } from "expo-router";
import { StatusBar } from "expo-status-bar";
import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";

export default function Step8() {
   const { form, reset } = useRegistrationStore();
   const { session } = useAuthStore();
   const fetchProfile = useAuthStore((s) => s.fetchProfile);

   const router = useRouter();
   const userId = session?.user?.id;

   const screenHeight = Dimensions.get("window").height;
   const screenWidth = Dimensions.get("window").width;

   // useEffect(() => {
   //    const timer = setTimeout(() => {
   //       fetchProfile(userId);
   //       router.replace("/(app)/(tabs)");
   //       reset();
   //    }, 6000);
   //    return () => clearTimeout(timer);
   // }, []);

   return (
      <>
         <LinearGradient
            colors={appColors.gradients.primary}
            // start={{ x: 1, y: 0 }}
            // end={{ x: 0, y: 0 }}
            dither={true}
            style={{
               flex: 1,
               justifyContent: "center",
            }}
         >
            <Stack.Screen options={{ title: "", headerBackVisible: false, header: () => "" }} />
            {/* <ImageBackground
               imageStyle={{ paddingHorizontal: wp(3) }}
               source={require("@/assets/images/19_dhans11_2.jpg")}
               style={style.image}
               resizeMode="cover"
            > */}
            <StatusBar style="light" />
            <View>
               <Image
                  source={require("@/assets/images/logo.png")}
                  style={{ width: 100, height: 100, alignSelf: "center" }}
                  contentFit="contain"
               />
               <AppText>Image placeholder</AppText>

               <View className="self-center gap-8">
                  {/* <Image
                     source={[{ uri: form.avatarUrl }]}
                     accessibilityLabel="Avatar"
                     style={{ width: 150, height: 150, borderRadius: 300, alignSelf: "center" }}
                  /> */}
                  <AppText>Image placeholder</AppText>

                  <View className="gap-12">
                     <View>
                        <AppText color={appColors.white} size="xxxl" align="center" weight="semi">
                           Welcome to Linuty
                        </AppText>
                        <AppText color={appColors.white} size="xxxl" align="center" cap="capitalize">
                           {form.firstName}
                        </AppText>
                     </View>
                     <View style={[{ width: screenWidth / 1.2, gap: 10 }]}>
                        <AppText color={appColors.white} weight="semi" size="lg" align="center">
                           We’re proud to have you join us as part of the{" "}
                           <AppText
                              color={appColors.white}
                              size="xxl"
                              weight="extraBold"
                              style={{ textDecorationLine: "underline" }}
                           >
                              {form.lineage_names.pop()}
                           </AppText>{" "}
                           community.
                        </AppText>
                        <AppText color={appColors.white} align="center">
                           This space is built for connecting with family, relatives, and clan members across the world
                           — preserving heritage, strengthening unity, and supporting one another.
                        </AppText>
                     </View>
                  </View>
               </View>
            </View>
            {/* </ImageBackground> */}
         </LinearGradient>
      </>
   );
}

const style = StyleSheet.create({
   selectabaleBtn: {
      height: hp(5),
      paddingHorizontal: 16,
      borderRadius: 400,
      justifyContent: "center",
      alignItems: "center",
      flexDirection: "row",
      gap: 6,
   },
   image: {
      flex: 1,
      justifyContent: "center",
   },
   glass: {
      backgroundColor: "rgba(255, 255, 255, 0.10)",
      borderRadius: 20,
      padding: 20,
      borderWidth: 0.5,
      borderColor: "#694d91",
      // shadowColor: "#000",
      // shadowOffset: { width: 0, height: 4 }, // 👈 this moves the shadow
      // shadowOpacity: 0.3,
      // shadowRadius: 8,
      // elevation: 50,
   },
});
