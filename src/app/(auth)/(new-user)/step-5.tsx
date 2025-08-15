import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { COUNTRIES, NATIONALITIES } from "@/src/data/ProfileData";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";

export default function Step5() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();
   // const [modalVisible, setModalVisible] = useState(false);

   console.log(form);

   const handleNext = async () => {
      let valid = true;

      if (!form.nationality) {
         setError("nationality", "nationality name is required");
         valid = false;
      }
      if (!form.cob) {
         setError("cob", "country of birth is required");
         valid = false;
      }
      if (!form.ethnicity) {
         setError("ethnicity", "ethnicity is required");
         valid = false;
      }

      if (!valid) return;

      if (valid) {
         nextStep();
         router.push("/(auth)/(new-user)/step-6");
      }
   };

   return (
      <ScreenWrapper>
         <StepContainer
            heading="Background Information"
            paragraph="Share your nationality and country of birth to help us build meaningful connections through lineage and community."
         >
            <View className="relative gap-20">
               <Select
                  modalTitle="Nationality"
                  options={NATIONALITIES}
                  placeholder="Nationality"
                  onSelect={(value) => updateField("nationality", value)}
                  height={80}
                  error={!!errors.nationality}
                  errorMessage={errors.nationality}
               />
               <Select
                  options={COUNTRIES}
                  placeholder="Country of Birth"
                  onSelect={(cob) => updateField("cob", cob)}
                  error={!!errors.cob}
                  errorMessage={errors.cob}
               />
               <Select
                  options={NATIONALITIES}
                  placeholder="Ethnicity"
                  onSelect={(ethnicity) => updateField("nationality", ethnicity)}
                  error={!!errors.ethnicity}
                  errorMessage={errors.ethnicity}
               />
               <View className="gap-2 my-6">
                  <Button onPress={handleNext} title="Next" size="lg" />
               </View>
            </View>
         </StepContainer>
      </ScreenWrapper>
   );
}
