import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { colors } from "@/src/constant/colors";
import { ClanNode, ETHNICITIES, Ethnicity } from "@/src/data/ClanTree";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { AntDesign } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ScrollView, TouchableOpacity, View } from "react-native";

export default function Step6() {
   const { form, errors, updateField, nextStep } = useRegistrationStore();

   const [selectedEthnicityId, setSelectedEthnicityId] = useState<string | null>(null);
   const [selectedEthnicityName, setSelectedEthnicityName] = useState<string | null>(null);

   const [path, setPath] = useState<ClanNode[]>([]);
   const [currentLevel, setCurrentLevel] = useState<ClanNode[]>([]);

   const router = useRouter();

   console.log({ form });

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

   // what to save when user is done
   const handleNext = () => {
      // store both ids and names if you like
      updateField("lineage_ids", path.map((n) => n.id) as any);
      updateField("lineage_names", [selectedEthnicityName, ...path.map((n) => n.name)].filter(Boolean) as any);
      nextStep();
      router.push("/(auth)/(new-user)/step-7");
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
                  <View className="gap-2">
                     {selectedEthnicityName && (
                        <View
                           className="gap-4 p-6"
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
                              <AppText weight="semi">Your selected clans</AppText>
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

                     <View className="gap-2 mt-4">
                        {currentLevel.map((clan) => (
                           <TouchableOpacity
                              key={clan.id}
                              onPress={() => handleClanSelect(clan)}
                              style={{
                                 alignItems: "center",
                                 padding: 8,
                                 borderRadius: 20,
                                 width: "100%",
                                 borderWidth: 1,
                                 borderColor: colors.placeholder,
                              }}
                           >
                              <AppText weight="med" cap="capitalize">
                                 {clan.name}
                              </AppText>
                           </TouchableOpacity>
                        ))}
                     </View>

                     {path.length > 0 && (
                        <View className="flex-row items-center gap-2 justify-center">
                           <AntDesign name="back" size={14} color="black" />
                           <Button title="back one step" onPress={handleBack} variant="plain" />
                        </View>
                     )}

                     {atLeaf && <Button title="Next" onPress={handleNext} />}
                  </View>
               </View>
            </StepContainer>
         </ScrollView>
      </ScreenWrapper>
   );
}
