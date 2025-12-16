// import { useAuth } from "@/src/utils/AuthProvider";
// import CoverImagepicker from "@/components/CoverImagepicker";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
// import { getProfileById } from "@/Services/db/profiles";
import React from "react";
import { View } from "react-native";

export default function EditScreen() {
  // const [fullName, setFullName] = useState("");
  // const [bio, setBio] = useState("");
  // const [avatatUrl, setAvatarUrl] = useState("");

  // const { data: PROFILE } = useQuery({
  //    queryKey: ["profile", profile?.id],
  //    queryFn: async () => getProfileById(profile!.id),
  // });

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
    <View
      style={{ paddingHorizontal: wp(3), backgroundColor: appColors.white }}
      className="flex-1"
    >
      {/* <CoverImagepicker /> */}

      <View className="my-4 gap-2">
        {/* <ListItem label="First name" value={PROFILE?.firstName} />
            <ListItem label="Last name" value={PROFILE?.lastName} />
            <ListItem label="First" value={PROFILE?.username} /> */}

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
