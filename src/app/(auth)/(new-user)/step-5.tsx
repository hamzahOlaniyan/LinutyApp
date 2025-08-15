import ScreenWrapper from "@/src/components/ScreenWrapper";
import Select from "@/src/components/Select";
import StepContainer from "@/src/components/StepContainer";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";

export default function Step5() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();
   const [modalVisible, setModalVisible] = useState(false);
   console.log(form);


   const handleNext = async () => {
      let valid = true;

      // if (!form.firstName) {
      //    setError("firstName", "first name is required");
      //    valid = false;
      // }
      // if (!form.surname) {
      //    setError("surname", "surname is required");
      //    valid = false;
      // }

      // if (!form.username) {
      //    setError("username", "password is required");
      //    valid = false;
      // }

      // if (!valid) return;
      if (valid) {
         nextStep()
         router.push("/(auth)/(new-user)/step-6");
      }
   };
   return (
      <ScreenWrapper>
         <StepContainer
            heading="Background Information"
            paragraph="Share your nationality and country of birth to help us build meaningful connections through lineage and community."
         >
            <View className="flex-1 bg-purple-600 h-full">
     <Select options={null} placeholder="Nationality" onSelect={()=>setModalVisible(true) }/> 
               <Select options={null} placeholder="Nationality" onSelect={()=>setModalVisible(true) }/>
               <Select options={null} placeholder="Nationality" onSelect={()=>setModalVisible(true) }/> 

            </View>

         </StepContainer>
        
            {/* <Button onPress={handleNext} title="Next" size="lg" /> */}
         
         {/* <Modal isOpen={modalVisible}>''
            </Modal>  */}
      </ScreenWrapper>
   );
}
