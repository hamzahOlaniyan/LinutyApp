import { TiktokFont } from "@/assets/fonts/FontFamily";
import AppText from "@/src/components/AppText";
import GradientButton from "@/src/components/GradientButton";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { colors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { ClanNode, ETHNICITIES, Ethnicity } from "@/src/data/ClanTree";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function Step6_1() {
   const { form, errors, updateField, nextStep, setError } = useRegistrationStore();

   const [selectedEthnicityId, setSelectedEthnicityId] = useState<string | null>(null);
   const [selectedEthnicityName, setSelectedEthnicityName] = useState<string | null>(null);

   const [path, setPath] = useState<ClanNode[]>([]);
   const [currentLevel, setCurrentLevel] = useState<ClanNode[]>([]);

   const router = useRouter();

   // pick ethnicity (Select stays visible because we always render it)
   const handleEthnicitySelect = (ethnicity: Ethnicity) => {
      setSelectedEthnicityId(ethnicity.id);
      setSelectedEthnicityName(ethnicity.name);
      updateField("ethnicity", ethnicity.id); // store id in your form
      setPath([]); // reset lineage path
      setCurrentLevel(ethnicity.clans); // show top-level clans
   };

   // pick clan/subclan
   const handleClanSelect = (clan: ClanNode) => {
      const newPath = [...path, clan];
      setPath(newPath);

      // Update form with the chain of selected clans
      updateField("lineage_ids", newPath.map((p) => p.id) as any);
      updateField("lineage_names", newPath.map((p) => p.name) as any);

      if (clan.children && clan.children.length > 0) {
         setCurrentLevel(clan.children);
      } else {
         // no more children = end of tree
         setCurrentLevel([]);
      }
   };

   const handleBack = () => {
      if (path.length > 0) {
         const newPath = [...path];
         newPath.pop();
         setPath(newPath);

         // Update form when going back
         updateField("lineage_ids", newPath.map((p) => p.id) as any);
         updateField("lineage_names", newPath.map((p) => p.name) as any);

         if (newPath.length > 0) {
            setCurrentLevel(newPath[newPath.length - 1].children || []);
         } else {
            // back to root clans of selected ethnicity
            const ethnicity = ETHNICITIES.find((e) => e.id === selectedEthnicityId);
            setCurrentLevel(ethnicity?.clans || []);
         }
      }
   };

   const atLeaf = currentLevel.length === 0 && path.length > 0;

   const handleNext = () => {
      updateField("lineage_ids", path.map((n) => n.id) as any);
      updateField("lineage_names", [...path.map((n) => n.name)].filter(Boolean) as any);

      let valid = true;

      if (!form.fullLineageName) {
         setError("fullLineageName", "Field is required");
         valid = false;
         return;
      }
      nextStep();
      router.push("/PartTwo/step-6.2");
   };

   return (
      <ScreenWrapper>
         <ScrollView>
            <StepContainer
               heading="What is your lineage"
               paragraph="Share your nationality and country of birth to help."
            >
               <View className="flex-1 gap-4">
                  <Select
                     height={90}
                     options={ETHNICITIES.map((item) => item.name)}
                     placeholder="Ethnicity"
                     searchable
                     selectedValue={selectedEthnicityName ?? undefined}
                     onSelect={(ethnicityName) => {
                        const ethnicity = ETHNICITIES.find((e) => e.name === ethnicityName);
                        if (ethnicity) handleEthnicitySelect(ethnicity);
                     }}
                     error={!!errors.ethnicity}
                     errorMessage={errors.ethnicity}
                  />
                  <View className="gap-6 flex-1">
                     {selectedEthnicityName && (
                        <View className="gap-6">
                           {path.length > 0 && (
                              <View
                                 style={{
                                    backgroundColor: colors.searchBar,
                                    borderRadius: 12,
                                    paddingHorizontal: 10,
                                    paddingVertical: 20,
                                    gap: 10,
                                 }}
                              >
                                 {atLeaf && <AppText weight="semi">Your selected clan</AppText>}

                                 <AppText size="lg" weight="bold" cap="capitalize" color={colors.primary}>
                                    {path.map((p, idx) => `${idx + 1}. ${p.name}  `).join("")}
                                 </AppText>
                              </View>
                           )}

                           {!atLeaf && (
                              <View className="flex-row justify-between">
                                 <AppText size="lg" weight="semi">
                                    Select your clans
                                 </AppText>
                                 {path.length > 0 && (
                                    <Pressable
                                       onPress={handleBack}
                                       style={{ borderWidth: 1, borderRadius: 6, padding: 5 }}
                                       className="flex-row items-center gap-1 justify-center"
                                    >
                                       <Ionicons
                                          name="arrow-back-sharp"
                                          size={16}
                                          color="black"
                                          className="relative top-[2px]"
                                       />
                                       <AppText>back</AppText>
                                    </Pressable>
                                 )}
                              </View>
                           )}
                        </View>
                     )}

                     <View className="flex-row flex-wrap w-full justify-center gap-2 flex-1">
                        {currentLevel.map((clan) => (
                           <TouchableOpacity
                              key={clan.id}
                              onPress={() => handleClanSelect(clan)}
                              className="p-3 px-4 rounded-md relative overflow-hidden"
                              style={{
                                 borderRadius: 8,
                              }}
                           >
                              <LinearGradient
                                 colors={colors.gradients.primaryLight}
                                 start={{ x: 0, y: 0 }}
                                 end={{ x: 1.2, y: 0 }}
                                 style={{
                                    ...StyleSheet.absoluteFillObject,
                                 }}
                              />
                              <Text
                                 style={{
                                    fontFamily: TiktokFont.TiktokSemiBold,
                                    textTransform: "capitalize",
                                    textAlign: "center",
                                    fontSize: 14,
                                 }}
                              >
                                 {clan.name}
                              </Text>
                           </TouchableOpacity>
                        ))}
                     </View>

                     {atLeaf && (
                        <View className="gap-4">
                           <AppText weight="semi" size="lg">
                              Complete you linage
                           </AppText>
                           <View
                              style={{
                                 height: hp(7),
                                 borderWidth: 1,
                                 marginBottom: 3,
                                 borderColor: colors.placeholder,
                                 borderRadius: 15,
                              }}
                              className=" flex-1 flex-row justify-between items-center gap-1 p-2 border rounded-lg"
                           >
                              <TextInput
                                 placeholder="Names"
                                 value={form.fullLineageName}
                                 onChangeText={(linegaeName) => updateField("fullLineageName", linegaeName)}
                                 style={{ fontSize: hp(2), fontFamily: TiktokFont.TiktokMedium }}
                                 placeholderTextColor={"#a3a3a3"}
                                 className="px-2 flex-1"
                              />
                              <AppText size="lg" weight="med" cap="capitalize" color={colors.inputActive}>
                                 {path
                                    .reverse()
                                    .slice(0, 1)
                                    .map((p) => `${p.name} `)
                                    .join("")}
                              </AppText>
                           </View>
                           {errors.fullLineageName && (
                              <AppText size="sm" color={colors.error}>
                                 {errors.fullLineageName}
                              </AppText>
                           )}
                        </View>
                     )}

                     <View className="my-6">
                        {atLeaf && <GradientButton text="Next" onPress={handleNext} size="lg" />}
                     </View>
                  </View>
               </View>
            </StepContainer>
         </ScrollView>
      </ScreenWrapper>
   );
}
