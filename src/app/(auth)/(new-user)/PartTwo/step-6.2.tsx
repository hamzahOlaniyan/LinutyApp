import { CheckIcon } from "@/assets/icons/CheckIcon";
import StepContainer from "@/src/components/StepContainer";
import AppText from "@/src/components/ui/AppText";
import GradientButton from "@/src/components/ui/GradientButton";
import Searchbar from "@/src/components/ui/Searchbar";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
import { PROFESSIONS } from "@/src/data/ProfileData";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Step6_2() {
   const { form, errors, updateField, nextStep, setError } = useRegistrationStore();
   const [searchText, setSearchText] = useState("");
   const [selected, setSelected] = useState("");
   const [showButton, setShowButton] = useState(false);

   const { bottom } = useSafeAreaInsets();

   const router = useRouter();

   console.log({ bottom });

   const handlePress = (item: string) => {
      updateField("profession", item);
      setSelected(item);
      setShowButton(true);
      nextStep();
   };

   const handleNext = () => {
      nextStep();
      router.push("/PartTwo/step-6.3");
   };

   return (
      <View
         style={{
            paddingHorizontal: wp(4),
            flex: 1,
            backgroundColor: appColors.white,
            marginBottom: bottom,
            overflow: "hidden",
         }}
      >
         <StepContainer
            heading="What is your Occupation"
            paragraph="Share your nationality and country of birth to help."
         >
            <View className="gap-4">
               <Searchbar value={searchText} onChangeText={(e) => setSearchText(e)} onPress={() => setSearchText("")} />
               <FlatList
                  scrollEnabled
                  data={PROFESSIONS?.sort().filter((item) => item.toLowerCase().includes(searchText.toLowerCase()))}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ rowGap: 10, paddingBottom: 650, marginBottom: bottom }}
                  renderItem={({ item }) => (
                     <Pressable onPress={() => handlePress(item)} className="flex-row justify-between py-2">
                        <AppText size="lg" weight="med">
                           {item}
                        </AppText>
                        {selected === item && (
                           <View style={{ borderWidth: 1.5, borderRadius: 50 }}>
                              <CheckIcon />
                           </View>
                        )}
                     </Pressable>
                  )}
               />
            </View>
         </StepContainer>
         {showButton && (
            <View className="bg-white h-20 absolute bottom-0 w-full self-center justify-center">
               <GradientButton text="Next" onPress={handleNext} />
            </View>
         )}
      </View>
   );
}
