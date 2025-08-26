import AppText from "@/src/components/AppText";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Searchbar from "@/src/components/Searchbar";
import StepContainer from "@/src/components/StepContainer";
import { colors } from "@/src/constant/colors";
import { PROFESSIONS } from "@/src/data/ProfileData";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { FontAwesome } from "@expo/vector-icons";
import MaskedView from "@react-native-masked-view/masked-view";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";

export default function Step6_2() {
   const { form, errors, updateField, nextStep, setError } = useRegistrationStore();
   const [searchText, setSearchText] = useState("");
   const [selected, setSelected] = useState("");
   const [showButton, setShowButton] = useState(false);

   const router = useRouter();

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
      <ScreenWrapper>
         <StepContainer
            heading="What is your Occupation"
            paragraph="Share your nationality and country of birth to help."
         >
            <View className="gap-4">
               <Searchbar value={searchText} onChangeText={(e) => setSearchText(e)} onPress={() => setSearchText("")} />
               <FlatList
                  scrollEnabled
                  data={PROFESSIONS}
                  keyExtractor={(item) => item}
                  showsVerticalScrollIndicator={false}
                  contentContainerStyle={{ rowGap: 10 }}
                  renderItem={({ item }) => (
                     <Pressable onPress={() => handlePress(item)} className="flex-row justify-between py-2">
                        <AppText size="lg" weight="med">
                           {item}
                        </AppText>
                        {selected === item && (
                           <MaskedView maskElement={<FontAwesome name="check-circle" size={24} color="black" />}>
                              <LinearGradient
                                 colors={colors.gradients.primary}
                                 start={{ x: 0, y: 0 }}
                                 end={{ x: 1, y: 0 }}
                                 style={{ width: 24, height: 24 }}
                              />
                           </MaskedView>
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
      </ScreenWrapper>
   );
}
