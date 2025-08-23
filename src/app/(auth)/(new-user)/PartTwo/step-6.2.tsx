import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
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

export default function Step6() {
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
                  renderItem={({ item }) => (
                     <View className="flex-row justify-between py-5">
                        <Pressable onPress={() => handlePress(item)}>
                           <AppText size="lg" weight="med">
                              {item}
                           </AppText>
                        </Pressable>
                        {selected === item && (
                           <MaskedView maskElement={<FontAwesome name="check-circle" size={20} color="black" />}>
                              <LinearGradient
                                 colors={colors.gradients.primary}
                                 start={{ x: 0, y: 0 }}
                                 end={{ x: 1, y: 0 }}
                                 style={{ width: 20, height: 20 }}
                              />
                           </MaskedView>
                        )}
                     </View>
                  )}
               />
            </View>
         </StepContainer>
         {showButton && (
            <View className="bg-white h-20 absolute bottom-0 w-full self-center justify-center">
               <Button title="Next" onPress={handleNext} />
            </View>
         )}
      </ScreenWrapper>
   );
}
