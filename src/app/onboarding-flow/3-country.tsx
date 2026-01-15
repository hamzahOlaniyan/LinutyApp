import GradientButton from "@/components/ui/GradientButton";
import Select from "@/components/ui/Select/Select";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { COUNTRIES } from "@/data/ProfileData";
import { useOnbardingFlowForm } from "@/store/useOnbardingFlowForm";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Country() {
  const { form, errors, updateField, setError } = useOnbardingFlowForm();
  const router = useRouter();

  const handleNext = async () => {
    let valid = true;

    if (!form.country) {
      setError("country", "country of birth is required");
      valid = false;
    }

    if (valid) {
      router.push("/onboarding-flow/4-ethnicity");
    }
  };

  return (
    <View
      style={{
        paddingHorizontal: wp(3),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <StepContainer
        heading="Background Information"
        paragraph="Share your nationality and country of birth to help us build meaningful connections through lineage and community."
      >
        <View className="relative gap-24">
          <Select
            options={COUNTRIES}
            snap={2}
            searchable
            placeholder="Country"
            onSelect={country => updateField("country", country)}
            error={!!errors.country}
            errorMessage={errors.country}
            modalTitle="select country"
          />
          <View className="my-6 gap-2">
            <GradientButton onPress={handleNext} text="Next" size="lg" />
          </View>
        </View>
      </StepContainer>
    </View>
  );
}
