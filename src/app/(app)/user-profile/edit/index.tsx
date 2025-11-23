// import { useAuth } from "@/src/utils/AuthProvider";
import CoverImagepicker from "@/components/CoverImagepicker";
import AppText from "@/components/ui/AppText";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { EditIcon } from "@/icons/ico/edit";
import { getProfileById } from "@/Services/db/profiles";
import { useAuthStore } from "@/store/authStore";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import React, { useState } from "react";
import { View } from "react-native";

export default function EditScreen() {
   const { profile } = useAuthStore();
   const [fullName, setFullName] = useState("");
   const [bio, setBio] = useState("");
   const [avatatUrl, setAvatarUrl] = useState("");

   const queryClient = useQueryClient();

   const { data: PROFILE } = useQuery({
      queryKey: ["profile", profile?.id],
      queryFn: async () => getProfileById(profile!.id),
   });

   // const { mutate, isPending, error } = useMutation({
   //    mutationFn: () => updateProfile(profile!.id, { full_name: fullName, bio, avatar_url: avatatUrl }),

   //    onSuccess: () => {
   //       console.log("SUCCESS!!!, FORM UPDATED");
   //       queryClient.invalidateQueries({ queryKey: ["profile", profile?.id] });
   //       router.back();
   //    },
   //    onError: (error) => {
   //       console.log("ERROR!!!", error?.message, error?.cause, error?.name, error?.stack);
   //    },
   // });

   // useEffect(() => {
   //    setFullName(profile?.full_name ?? "");
   //    setBio(profile?.bio ?? "");
   //    setAvatarUrl(profile?.avatar_url ?? "");
   // }, [profile?.id]);

   return (
      <View style={{ paddingHorizontal: wp(3), backgroundColor: appColors.white }} className="flex-1">
         <CoverImagepicker />

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
