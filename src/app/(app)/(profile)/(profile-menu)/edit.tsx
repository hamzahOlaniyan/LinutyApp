import ScreenWrapper from "@/src/components/ScreenWrapper";
import Button from "@/src/components/ui/Button";
import { Input } from "@/src/components/ui/Input";
import InputArea from "@/src/components/ui/InputArea";
import { wp } from "@/src/constant/common";
// import UserAvatarPicker from "@/src/components/UserAvatarPicker";
// import { useAuthStore } from "@/src/context/authStore";
import { getProfileById, updateProfile } from "@/src/Services/profiles";
import { useAuthStore } from "@/src/store/authStore";
// import { useAuth } from "@/src/utils/AuthProvider";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import { View } from "react-native";

export default function EditScreen() {
   const [fullName, setFullName] = useState("");
   const [bio, setBio] = useState("");
   const [avatatUrl, setAvatarUrl] = useState("");

   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const { data: profiles } = useQuery({
      queryKey: ["profile", profile?.id],
      queryFn: async () => getProfileById(profile!.id),
   });

   const { mutate, isPending, error } = useMutation({
      mutationFn: () => updateProfile(profile!.id, { full_name: fullName, bio, avatar_url: avatatUrl }),

      onSuccess: () => {
         console.log("SUCCESS!!!, FORM UPDATED");
         queryClient.invalidateQueries({ queryKey: ["profile", profile?.id] });
         router.back();
      },
      onError: (error) => {
         console.log("ERROR!!!", error?.message, error?.cause, error?.name, error?.stack);
      },
   });

   useEffect(() => {
      setFullName(profile?.full_name ?? "");
      setBio(profile?.bio ?? "");
      setAvatarUrl(profile?.avatar_url ?? "");
   }, [profile?.id]);

   return (
      <ScreenWrapper>
         <View style={{ marginHorizontal: wp(3) }} className="flex-1">
            <View className="gap-16">
               {/* <UserAvatarPicker currentAvatar={profile?.avatar_url ?? ""} onUpload={setAvatarUrl} /> */}
               <View className="gap-4">
                  <Input label="name" value={fullName} onChangeText={setFullName} placeholder="full name" />
                  <InputArea label="bio" value={bio} onChangeText={setBio} multiline placeholder="bio" />
                  <Button text="save" onPress={() => mutate()} isLoading={isPending} />
               </View>
            </View>
         </View>
      </ScreenWrapper>
   );
}
