import { Font } from "@/assets/fonts/FontFamily";
import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import Select from "@/components/ui/Select";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { ClanNode, ETHNICITIES, Ethnicity } from "@/data/ClanTree";
import Icon from "@/icons";
import { useOnbardingFlowForm } from "@/store/useOnbardingFlowForm";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";

export default function EthnicityScreen() {
  const { form, errors, updateField, setError } = useOnbardingFlowForm();

  const [selectedEthnicityName, setSelectedEthnicityName] = useState<
    string | null
  >(null);

  const [path, setPath] = useState<ClanNode[]>([]);
  const [currentLevel, setCurrentLevel] = useState<ClanNode[]>([]);

  const router = useRouter();

  const handleEthnicitySelect = (ethnicity: Ethnicity) => {
    setSelectedEthnicityName(ethnicity.name);
    updateField("ethnicity", ethnicity.name);
    setPath([]);
    setCurrentLevel(ethnicity.clans);
  };

  const handleClanSelect = (clan: ClanNode) => {
    const newPath = [...path, clan];
    setPath(newPath);

    updateField(
      "clan_tree",
      newPath.map(p => p.id)
    );

    if (clan.children && clan.children.length > 0) {
      setCurrentLevel(clan.children);
    } else {
      setCurrentLevel([]);
    }
  };

  const handleBack = () => {
    if (path.length > 0) {
      const newPath = [...path];
      newPath.pop();
      setPath(newPath);

      updateField(
        "clan_tree",
        newPath.map(p => p.name)
      );

      if (newPath.length > 0) {
        setCurrentLevel(newPath[newPath.length - 1].children || []);
      } else {
        // back to root clans of selected ethnicity
        const ethnicity = ETHNICITIES.find(
          e => e.name === selectedEthnicityName
        );
        setCurrentLevel(ethnicity?.clans || []);
      }
    }
  };

  const atLeaf = currentLevel.length === 0 && path.length > 0;
  const lastSelected = path.length > 0 ? `${path[path.length - 1].name}` : "";

  const resetClanTree = () => {
    const ethnicity = ETHNICITIES.find(e => e.name === selectedEthnicityName);
    if (path.length > 0) {
      setPath([]);
      setCurrentLevel(ethnicity?.clans as []);
      updateField("clan_tree", "");
      // updateField("lineage_ids", "");
    }
  };

  const handleNext = () => {
    if (form.isFather === "No") {
      router.push("/onboarding-flow/5-profession");
    }
    updateField("clan_tree", [...path.map(n => n.name)].filter(Boolean));

    let valid = true;

    if (!form.clan_tree) {
      setError("clan_tree", "Field is required");
      valid = false;
      return;
    }
    if (valid) {
      // nextStep();
      router.push("/onboarding-flow/5-profession");
    }
  };

  return (
    <ScrollView
      style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white }}
    >
      <StepContainer
        heading="What is your lineage"
        paragraph="Share your nationality and country of birth to help."
      >
        <View className="flex-1 gap-4">
          <Select
            label="Your ethnicity"
            height={90}
            options={ETHNICITIES.map(item => item.name)}
            placeholder="Ethnicity"
            searchable
            selectedValue={selectedEthnicityName ?? undefined}
            onSelect={ethnicityName => {
              const ethnicity = ETHNICITIES.find(e => e.name === ethnicityName);
              if (ethnicity) handleEthnicitySelect(ethnicity);
            }}
            error={!!errors.ethnicity}
            errorMessage={errors.ethnicity}
          />
          {selectedEthnicityName && (
            <Select
              label={`Is your father ${selectedEthnicityName} ?`}
              height={90}
              options={["Yes", "No"]}
              placeholder={`Is your father ${selectedEthnicityName} ?`}
              selectedValue={form.isFather ?? undefined}
              onSelect={value => updateField("isFather", value)}
              error={!!errors.ethnicity}
              errorMessage={errors.ethnicity}
            />
          )}
          <View className="flex-1 gap-6">
            {selectedEthnicityName && form.isFather === "Yes" && (
              <View className="gap-6">
                {path.length > 0 && (
                  <>
                    {atLeaf && (
                      <AppText color={appColors.grey}>
                        Your selected clan
                      </AppText>
                    )}

                    <AppText
                      style={{ flex: 1, width: "100%" }}
                      color={appColors.text}
                    >
                      {path
                        .map((p, idx) => `${idx + 1}. ${p.name}    `)
                        .join("")}
                    </AppText>
                  </>
                )}

                <View className="flex-row items-center justify-between gap-12">
                  {!atLeaf && <AppText>* Select your sub clans</AppText>}
                  {path.length > 0 && (
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "center",
                        flex: 1
                      }}
                    >
                      <Pressable
                        onPress={handleBack}
                        className="flex-row items-center justify-center gap-1 self-end"
                      >
                        <Ionicons
                          name="arrow-back-sharp"
                          size={12}
                          color="black"
                          className="relative top-[1px]"
                        />
                        <AppText>back 1 step</AppText>
                      </Pressable>
                      <TouchableOpacity
                        onPress={resetClanTree}
                        style={{ alignSelf: "center" }}
                      >
                        <AppText color={appColors.error}>reset</AppText>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              </View>
            )}
            {form.isFather === "Yes" ? (
              <View className="w-full flex-row flex-wrap justify-center gap-2">
                {currentLevel.map(clan => (
                  <TouchableOpacity
                    key={clan.id}
                    onPress={() => handleClanSelect(clan)}
                    style={[
                      { borderWidth: 1, borderColor: appColors.border },
                      style.selectabaleBtn
                    ]}
                  >
                    <AppText>{clan.name}</AppText>
                    <Icon name="plus" />
                  </TouchableOpacity>
                ))}
              </View>
            ) : null}

            {atLeaf && (
              <View className="gap-4">
                <AppText>* Please enter your abtiriis</AppText>
                <View
                  style={{
                    height: hp(7),
                    borderWidth: 1,
                    marginBottom: 3,
                    borderColor: appColors.placeholder,
                    borderRadius: 15,
                    flex: 1
                  }}
                  className=" flex-1 flex-row items-center justify-between gap-1 rounded-lg border p-2"
                >
                  <TextInput
                    placeholder="Names"
                    value={form.fullName}
                    onChangeText={name => updateField("fullName", name)}
                    style={{ fontSize: hp(2), fontFamily: Font.Medium }}
                    placeholderTextColor={"#a3a3a3"}
                    className="flex-1 px-2"
                  />
                  <AppText color={appColors.inputInactive}>
                    {lastSelected}
                  </AppText>
                </View>
                {errors.fullName && (
                  <AppText color={appColors.error}>{errors.fullName}</AppText>
                )}
              </View>
            )}

            <View className="my-6">
              {atLeaf && <GradientButton text="Next" onPress={handleNext} />}
              {form.isFather === "No" && (
                <GradientButton text="Next" onPress={handleNext} />
              )}
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
    gap: 6
  },
  image: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
    gap: 10
  }
});
