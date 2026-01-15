import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import FormInput from "@/components/ui/FormInput";
import { Field } from "@/components/ui/FormInput/types";
import Terms from "@/components/ui/Terms";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { Image } from "expo-image";
import { router } from "expo-router";
import React, { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export type SignInValues = {
  email: string | undefined;
  password: string;
  firstName: string;
  lastName: string;
  username: string;
  confirm_password: string;
  otp: string;
};

export type SignInField = Omit<Field, "name"> & {
  name: keyof SignInValues;
};

export default function Signin() {
  const { formData } = useFormStore();

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const LoginForm: SignInField[] = [
    {
      name: "email",
      placeholder: "Email address",
      type: "email",
      mode: "email",
      required: true
    },
    {
      name: "password",
      placeholder: "password",
      mode: "password",
      required: true
    }
  ];

  const handleSignInUser = async () => {
    setLoading(true);

    const { data } = await supabase.auth.signInWithPassword({
      email: formData.email as string,
      password: formData.password as string
    });

    useAuthStore.getState().setSession(data.session);
    router.replace("/(protected)/(tabs)/(home)");
  };

  return (
    <SafeAreaView
      style={{
        paddingHorizontal: wp(3),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <View className="flex-1 gap-20 pt-32">
        <Pressable
          style={[styles.button, styles.buttonOpen]}
          onPress={() => setModalVisible(true)}
        >
          <AppText style={styles.textStyle}>Show Modal</AppText>
        </Pressable>
        <Image
          source={require("@/assets/images/logo.png")}
          style={{ width: 75, height: 75, alignSelf: "center" }}
          contentFit="contain"
        />
        <FormInput
          fields={LoginForm}
          onSubmit={() => handleSignInUser()}
          loading={loading}
          submitBtnLabel="Sign in"
          forgottonPassword
        />

        <View className="absolute bottom-5 w-full gap-4">
          <Button
            text="Create new account"
            onPress={() => router.push("/auth/create-account")}
            variant="outline"
          />
          <Terms />
        </View>
      </View>
      <Modal
        animationType="fade"
        transparent={true}
        backdropColor="red"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View className="absolute left-0 right-0 top-0 h-full w-full bg-black/50">
          {/* <View style={styles.centeredView}> */}
          <View style={styles.modalView}>
            <AppText style={styles.modalText}>Hello World!</AppText>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <AppText style={styles.textStyle}>Hide Modal</AppText>
            </Pressable>
          </View>
        </View>
        {/* </View> */}
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF"
  },
  buttonClose: {
    backgroundColor: "#2196F3"
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});
