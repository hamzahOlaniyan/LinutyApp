import { EditIcon } from "@/assets/icons/edit";
import { PhotoIcon } from "@/assets/icons/photoIcon";
import AppText from "@/src/components/ui/AppText";
import { appColors } from "@/src/constant/colors";
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

   const { data: PROFILE } = useQuery({
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
      <View style={{ paddingHorizontal: wp(3), backgroundColor: appColors.white }} className="flex-1">
         <View className="w-full bg-yellow-500 h-48 rounded-lg justify-center items-center">
            <View className="w-24 h-24 rounded-full border justify-center items-center">
               <PhotoIcon />
            </View>
         </View>

         <View className="gap-2 my-4">
            <ListItem label="First name" value={PROFILE?.firstName} />
            <ListItem label="Last name" value={PROFILE?.lastName} />
            <ListItem label="First" value={PROFILE?.username} />

            {/* <UserAvatarPicker currentAvatar={profile?.avatar_url ?? ""} onUpload={setAvatarUrl} /> */}
            {/* <View className="gap-4">
               <Input label="name" value={fullName} onChangeText={setFullName} placeholder="full name" />
               <InputArea label="bio" value={bio} onChangeText={setBio} multiline placeholder="bio" />
               <Button text="save" onPress={() => mutate()} isLoading={isPending} />
            </View> */}
         </View>
      </View>
   );
}

const ListItem = ({
   children,
   label,
   value,
}: {
   label: string;
   children?: React.ReactNode;
   value?: React.ReactNode;
}) => {
   return (
      <View
         style={{
            borderBottomColor: appColors.bordersLight,
            borderBottomWidth: 1,
            paddingVertical: 4,
            gap: 12,
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            // backgroundColor: "pink",
         }}
      >
         <View className="flex-1">
            <AppText weight="semi">{label}</AppText>
            <AppText size="lg" weight="reg">
               {value}
            </AppText>
         </View>
         <EditIcon />
      </View>
   );
};
