import AppText from "@/components/ui/AppText";
import GradientButton from "@/components/ui/GradientButton";
import LSeachBar from "@/components/ui/LSeachBar";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { PROFESSIONS } from "@/data/ProfileData";
import Icon from "@/icons";
import { useOnbardingFlowForm } from "@/store/useOnbardingFlowForm";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { FlatList, Pressable, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function Profession() {
  const { updateField } = useOnbardingFlowForm();
  const [searchText, setSearchText] = useState("");
  const [selected, setSelected] = useState("");
  const [showButton, setShowButton] = useState(false);

  const { bottom } = useSafeAreaInsets();

  const router = useRouter();

  const handlePress = (item: string) => {
    updateField("profession", item);
    setSelected(item);
    setShowButton(true);
  };

  const handleNext = () => {
    router.push("/onboarding-flow/6-interests");
  };

  return (
    <View
      style={{
        paddingHorizontal: wp(3),
        flex: 1,
        backgroundColor: appColors.white,
        marginBottom: bottom,
        overflow: "hidden"
      }}
    >
      <StepContainer
        heading="What is your proffession?"
        paragraph="Share your nationality and country of birth to help."
      >
        <View className="gap-4">
          <LSeachBar searchBarValue={text => setSearchText(text)} />
          <FlatList
            scrollEnabled
            data={PROFESSIONS?.sort().filter(item =>
              item.toLowerCase().includes(searchText.toLowerCase())
            )}
            keyExtractor={item => item}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
              rowGap: 10,
              paddingBottom: 650,
              marginBottom: bottom
            }}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => handlePress(item)}
                className="flex-row justify-between py-2"
              >
                <AppText>{item}</AppText>
                {selected === item && (
                  <View style={{ borderWidth: 1.5, borderRadius: 50 }}>
                    <Icon name="check" />
                  </View>
                )}
              </Pressable>
            )}
          />
        </View>
      </StepContainer>
      {showButton && (
        <View className="absolute bottom-0 h-20 w-full justify-center self-center bg-white">
          <GradientButton text="Next" onPress={handleNext} />
        </View>
      )}
    </View>
  );
}
