import GradientButton from "@/components/ui/GradientButton";
import StepContainer from "@/components/ui/StepContainer";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { ProfileApi } from "@/hooks/useProfileApi";
import Icon from "@/icons";
import { queryClient } from "@/lib/queryClient";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useOnbardingFlowForm } from "@/store/useOnbardingFlowForm";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { TouchableOpacity, View } from "react-native";

type completeRegistrationInput = {
  location?: string;
  dateOfBirth?: string;
  clan_tree?: string[];
  gender?: string | null;
  ethnicity?: string | null;
  fullName?: string | null;
  avatarUrl?: string | null;
  profession?: string | null;
  interest?: string[];
  appInterests?: string[];
  isProfileComplete?: boolean;
};

export default function ProfilePic() {
  const { me } = useAuthStore();
  const { form, setError } = useOnbardingFlowForm();

  const updateProfile = ProfileApi.useCompleteRegistration();

  const [loading, setLoading] = useState(false);
  const [profilePic, setProfilePic] =
    useState<ImagePicker.ImagePickerAsset | null>(null);

  const router = useRouter();

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [4, 3],
      allowsMultipleSelection: false,
      quality: 1
    });

    if (result.canceled) {
      setProfilePic(null);
      return;
    }

    const asset = result.assets?.[0];
    if (!asset?.uri) {
      setProfilePic(null);
      return;
    }

    setProfilePic(asset);
  };

  async function uploadAvatar(
    file: ImagePicker.ImagePickerAsset,
    userId: string
  ) {
    if (!file?.uri) throw new Error("No file uri provided");

    const uri = file.uri;
    const fileExt = uri.split(".").pop()?.toLowerCase() || "jpg";
    const filePath = `profile-pic/${userId}/${Date.now()}-${file.id ?? "avatar"}.${fileExt}`;

    const response = await fetch(uri);
    const arrayBuffer = await response.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
      .from("profile-avatar")
      .upload(filePath, fileData, {
        contentType: file.mimeType ?? "image/jpeg",
        upsert: false
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("profile-avatar")
      .getPublicUrl(filePath);
    return data.publicUrl; // returns string
  }

  // console.log("FormData", JSON.stringify(form, null, 2));

  async function completeRegistration() {
    setLoading(true);

    if (!me?.id) {
      setLoading(false);
      return;
    }

    // console.log("profilePic before upload:", profilePic);

    if (!profilePic?.uri) {
      setLoading(false);
      setError?.("avatarUrl", "Please select a profile picture"); // if you have this
      return;
    }

    const avatarUrl = await uploadAvatar(profilePic, me.id);

    const content: completeRegistrationInput = {
      dateOfBirth: form.dateOfBirth,
      gender: form.gender,
      location: form.location,
      ethnicity: form.ethnicity,
      fullName: form.fullName,
      clan_tree: form.clan_tree,
      avatarUrl,
      profession: form.profession,
      appInterests: form.appInterests,
      interest: form.interests,
      isProfileComplete: true
    };

    try {
      await updateProfile.mutateAsync(content, {
        onSuccess: async () => {
          queryClient.invalidateQueries({ queryKey: ["me"] });
          queryClient.invalidateQueries({ queryKey: ["profile"] });
          console.log("✅form completed,");
          router.replace("/onboarding-flow/8-welcome");
          // reset();
        },
        onError: err => {
          console.log("❌ something went wrong", err.message);
        }
      });
    } catch (err) {
      console.error("failed sending formr", err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <View
      style={{
        paddingHorizontal: wp(4),
        flex: 1,
        backgroundColor: appColors.white
      }}
    >
      <StepContainer
        heading="Add a profile picture"
        paragraph="Add a profile picture so that friends know it's you. Everyone will be able to see your picture."
      >
        <View className="relative">
          <View className="relative">
            <View
              style={{
                width: 150,
                height: 150,
                backgroundColor: "grey",
                borderRadius: 400,
                alignSelf: "center",
                position: "relative",
                justifyContent: "center",
                alignContent: "center"
              }}
            >
              {profilePic ? (
                <Image
                  source={{ uri: profilePic.uri }}
                  style={{ width: 150, height: 150, borderRadius: 400 }}
                />
              ) : (
                <Image
                  source={require("@/assets/images/person-placeholder.jpg")}
                  style={{
                    width: 150,
                    height: 150,
                    borderRadius: 400,
                    overflow: "hidden"
                  }}
                />
              )}
              <View className="absolute bottom-0 right-0 z-50 self-center">
                <TouchableOpacity
                  className="h-10 w-10 items-center justify-center rounded-full bg-neutral-400"
                  onPress={pickImages}
                >
                  <Icon name="edit" />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {profilePic && (
            <View className="my-6 gap-2">
              <GradientButton
                onPress={completeRegistration}
                text="Next"
                size="lg"
                isLoading={loading}
              />
            </View>
          )}
        </View>
      </StepContainer>
    </View>
  );
}
