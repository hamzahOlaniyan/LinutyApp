import { TiktokFont } from "@/assets/fonts/FontFamily";
import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { colors } from "@/src/constant/colors";
import { hp } from "@/src/constant/common";
import { ClanNode, ETHNICITIES, Ethnicity } from "@/src/data/ClanTree";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Pressable, ScrollView, TextInput, View } from "react-native";

export default function Step6() {
   const { form, errors, updateField, nextStep, setError } = useRegistrationStore();

   const [selectedEthnicityId, setSelectedEthnicityId] = useState<string | null>(null);
   const [selectedEthnicityName, setSelectedEthnicityName] = useState<string | null>(null);

   const [path, setPath] = useState<ClanNode[]>([]);
   const [currentLevel, setCurrentLevel] = useState<ClanNode[]>([]);

   const router = useRouter();

   console.log(JSON.stringify(form, null, 2));

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
      router.push("/PartTwo/step-7");
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
                     selectedValue={selectedEthnicityName ?? undefined} // ✅ use selectedValue
                     onSelect={(ethnicityName) => {
                        const ethnicity = ETHNICITIES.find((e) => e.name === ethnicityName);
                        if (ethnicity) handleEthnicitySelect(ethnicity);
                     }}
                     error={!!errors.ethnicity}
                     errorMessage={errors.ethnicity}
                  />
                  <View className="gap-2 flex-1">
                     {selectedEthnicityName && (
                        <View
                           className="gap-4 p-6 bg-purple-700"
                           style={{
                              padding: atLeaf ? 16 : 0,
                              borderRadius: 10,
                              backgroundColor: atLeaf ? colors.darkWhite : "",
                           }}
                        >
                           {!atLeaf ? (
                              <AppText size="xl" weight="bold">
                                 Select your clans
                              </AppText>
                           ) : (
                              <AppText weight="semi">Your selected clan</AppText>
                           )}

                           {path.length > 0 && (
                              <View
                                 style={{
                                    backgroundColor: colors.offwhite,
                                    padding: 10,
                                    borderRadius: 10,
                                    paddingHorizontal: 10,
                                 }}
                              >
                                 <AppText size="lg" weight="semi" cap="capitalize">
                                    {path.map((p) => `${p.name}   `).join("")}
                                 </AppText>
                              </View>
                           )}
                        </View>
                     )}

                     <View className="flex-row flex-wrap w-full justify-center gap-2 flex-1 my-4">
                        {currentLevel.map((clan) => (
                           <Button
                              onPress={() => handleClanSelect(clan)}
                              title={clan.name}
                              variant="outline"
                              size="sm"
                           />
                        ))}
                     </View>

                     {path.length > 0 && (
                        <View style={{ top: atLeaf ? -40 : 0 }}>
                           <Pressable onPress={handleBack} className="flex-row items-center gap-1 justify-center my-8">
                              <AntDesign name="back" size={14} color="black" />
                              <AppText>back one step</AppText>
                           </Pressable>
                        </View>
                     )}

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
                                 // borderColor: isFocused ? colors.focus : error ? colors.error : colors.placeholder,
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
                              <AppText size="lg" weight="med" color={colors.gray}>
                                 {path
                                    .slice(0, 1)
                                    .reverse()
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

                     <View className="my-4">{atLeaf && <Button title="Next" onPress={handleNext} />}</View>
                  </View>
               </View>
            </StepContainer>
         </ScrollView>
      </ScreenWrapper>
   );
}
