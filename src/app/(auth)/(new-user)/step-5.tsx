import AppText from "@/src/components/AppText";
import Button from "@/src/components/Button";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import StepContainer from "@/src/components/StepContainer";
import { useRegistrationStore } from "@/src/store/useRegistrationState";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, Modal, Pressable, StyleSheet, Text, View } from "react-native";

export default function Step4() {
   const { form, errors, updateField, setError, nextStep } = useRegistrationStore();
   const router = useRouter();
   const [modalVisible, setModalVisible] = useState(false);

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
         nextStep();
         router.push("/(auth)/(new-user)/step-5");
      }
   };
   return (
      <ScreenWrapper>
         <StepContainer
            heading="Background Information"
            paragraph="Share your nationality and country of birth to help us build meaningful connections through lineage and community."
         >
            <View className="gap-4">
               <AppText size="lg" weight="semi">
                  Male
               </AppText>
               <AppText size="lg" weight="semi">
                  Female
               </AppText>
            </View>
         </StepContainer>
         <View className="gap-2 my-6">
            <Button onPress={handleNext} title="Next" size="lg" />
         </View>
         <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
               Alert.alert("Modal has been closed.");
               setModalVisible(!modalVisible);
            }}
         >
            <View style={styles.centeredView}>
               <View style={styles.modalView}>
                  <Text style={styles.modalText}>Hello World!</Text>
                  <Pressable style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
                     <Text style={styles.textStyle}>Hide Modal</Text>
                  </Pressable>
               </View>
            </View>
         </Modal>
         <Pressable style={[styles.button, styles.buttonOpen]} onPress={() => setModalVisible(true)}>
            <Text style={styles.textStyle}>Show Modal</Text>
         </Pressable>
      </ScreenWrapper>
   );
}

const styles = StyleSheet.create({
   centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "rgba(0,0,0,.3)",
   },
   modalView: {
      width: "100%",
      height: "100%",
      // margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
         width: 0,
         height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
   },
   button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
   },
   buttonOpen: {
      backgroundColor: "#F194FF",
   },
   buttonClose: {
      backgroundColor: "#2196F3",
   },
   textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
   },
   modalText: {
      marginBottom: 15,
      textAlign: "center",
   },
});
