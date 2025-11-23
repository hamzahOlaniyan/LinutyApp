import { TiktokFont } from "@/assets/fonts/FontFamily";
import StepContainer from "@/components/StepContainer";
import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import Select from "@/components/ui/Select";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { ClanNode, ETHNICITIES, Ethnicity } from "@/data/ClanTree";
import { Plus } from "@/icons/ico/plus";
import { useRegistrationStore } from "@/store/useRegistrationState";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { ImageBackground, Pressable, ScrollView, StyleSheet, TextInput, TouchableOpacity, View } from "react-native";

export default function Step6_1() {
   const { form, errors, updateField, nextStep, setError } = useRegistrationStore();

   const [selectedEthnicityId, setSelectedEthnicityId] = useState<string | null>(null);
   const [selectedEthnicityName, setSelectedEthnicityName] = useState<string | null>(null);

   const [path, setPath] = useState<ClanNode[]>([]);
   const [currentLevel, setCurrentLevel] = useState<ClanNode[]>([]);

   const router = useRouter();

   // console.log(JSON.stringify(form, null, 2));

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
   const lastSelected = path.length > 0 ? `${path[path.length - 1].name}` : "";

   const resetClanTree = () => {
      const ethnicity = ETHNICITIES.find((e) => e.name === selectedEthnicityName);
      if (path.length > 0) {
         setPath([]);
         setCurrentLevel(ethnicity?.clans as []);
         updateField("lineage_names", "");
         updateField("lineage_ids", "");
      }
   };

   const handleNext = () => {
      if (form.isFather === "No") {
         router.push("/PartTwo/step-6.2");
      }
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
      <ScrollView style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white }}>
         <StepContainer heading="What is your lineage" paragraph="Share your nationality and country of birth to help.">
            <View className="flex-1 gap-4">
               <Select
                  label="Your ethnicity"
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
               {selectedEthnicityName && selectedEthnicityId && (
                  <Select
                     label={`Is your father ${selectedEthnicityName} ?`}
                     height={90}
                     options={["Yes", "No"]}
                     placeholder={`Is your father ${selectedEthnicityName} ?`}
                     selectedValue={form.isFather ?? undefined}
                     onSelect={(value) => updateField("isFather", value)}
                     error={!!errors.ethnicity}
                     errorMessage={errors.ethnicity}
                  />
               )}
               <View className="gap-6 flex-1">
                  {selectedEthnicityName && form.isFather === "Yes" && (
                     <View className="gap-6">
                        {path.length > 0 && (
                           <ImageBackground
                              source={require("@/assets/images/19_dhans11.jpg")}
                              style={style.image}
                              borderRadius={15}
                           >
                              {atLeaf && <AppText color={appColors.colouredText}>Your selected clan</AppText>}

                              <AppText
                                 style={{ flex: 1, width: "100%" }}
                                 size="xl"
                                 weight="bold"
                                 cap="capitalize"
                                 color={appColors.white}
                              >
                                 {path.map((p, idx) => `${idx + 1}. ${p.name}    `).join("")}
                              </AppText>
                           </ImageBackground>
                        )}

                        <View className="flex-row justify-between items-center gap-12">
                           {!atLeaf && (
                              <AppText size="lg" weight="semi">
                                 * Select your sub clans
                              </AppText>
                           )}
                           {path.length > 0 && (
                              <View
                                 style={{
                                    flexDirection: "row",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    flex: 1,
                                 }}
                              >
                                 <Pressable
                                    onPress={handleBack}
                                    className="flex-row items-center gap-1 justify-center self-end"
                                 >
                                    <Ionicons
                                       name="arrow-back-sharp"
                                       size={12}
                                       color="black"
                                       className="relative top-[1px]"
                                    />
                                    <AppText weight="semi" size="sm">
                                       back 1 step
                                    </AppText>
                                 </Pressable>
                                 <TouchableOpacity onPress={resetClanTree} style={{ alignSelf: "center" }}>
                                    <AppText size="sm" color={appColors.error} weight="med" cap="capitalize">
                                       reset
                                    </AppText>
                                 </TouchableOpacity>
                              </View>
                           )}
                        </View>
                     </View>
                  )}
                  {form.isFather === "Yes" ? (
                     <View className="flex-row flex-wrap w-full justify-center gap-2">
                        {currentLevel.map((clan) => (
                           <TouchableOpacity
                              key={clan.id}
                              onPress={() => handleClanSelect(clan)}
                              style={[{ borderWidth: 1, borderColor: appColors.border }, style.selectabaleBtn]}
                           >
                              <AppText size="lg" cap="capitalize">
                                 {clan.name}
                              </AppText>
                              <Plus size={18} />
                           </TouchableOpacity>
                        ))}
                     </View>
                  ) : null}

                  {atLeaf && (
                     <View className="gap-4">
                        <AppText weight="semi" size="lg">
                           * Please enter your abtiriis
                        </AppText>
                        <View
                           style={{
                              height: hp(7),
                              borderWidth: 1,
                              marginBottom: 3,
                              borderColor: appColors.placeholder,
                              borderRadius: 15,
                              flex: 1,
                           }}
                           className=" flex-1 flex-row justify-between items-center gap-1 p-2 border rounded-lg"
                        >
                           <TextInput
                              placeholder="Names"
                              value={form.fullLineageName}
                              onChangeText={(name) => updateField("fullLineageName", name)}
                              style={{ fontSize: hp(2), fontFamily: TiktokFont.TiktokMedium }}
                              placeholderTextColor={"#a3a3a3"}
                              className="px-2 flex-1"
                           />
                           <AppText size="lg" weight="med" cap="capitalize" color={appColors.inputActive}>
                              {lastSelected}
                           </AppText>
                        </View>
                        {errors.fullLineageName && (
                           <AppText size="sm" color={appColors.error}>
                              {errors.fullLineageName}
                           </AppText>
                        )}
                     </View>
                  )}

                  <View className="my-6">
                     {atLeaf && <GradientButton text="Next" onPress={handleNext} size="lg" />}
                     {form.isFather === "No" && <GradientButton text="Next" onPress={handleNext} size="lg" />}
                  </View>
               </View>
            </View>
         </StepContainer>
      </ScrollView>
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
      padding: 20,
      gap: 10,
   },
});
