// import { Font } from "@/assets/fonts/FontFamily";
// import Avatar from "@/components/Avatar";
// import Imagepicker from "@/components/Imagepicker";
// import AppText from "@/components/ui/AppText";
// import Button from "@/components/ui/Button";
// import { uploadMediaSmart } from "@/components/UploadImage";
// import { appColors } from "@/constant/colors";
// import { hp, wp } from "@/constant/common";
// import { ImageIcon } from "@/icons/ico/ImageIcon";
// import { Plus } from "@/icons/ico/plus";
// import { createPost } from "@/Services/db/posts";
// import { useAuthStore } from "@/store/useAuthStore";
// import { useMutation, useQueryClient } from "@tanstack/react-query";
// import { useRouter } from "expo-router";
// import React, { useState } from "react";
// import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from "react-native";
// import { useSafeAreaInsets } from "react-native-safe-area-context";

// export default function NewPost() {
//    const [preview, setPreview] = useState<any[]>([]);
//    const [postText, setPostText] = useState("");
//    const { profile } = useAuthStore();

//    const queryClient = useQueryClient();
//    const router = useRouter();

//    const { bottom } = useSafeAreaInsets();

//    const { mutate, isPending, error } = useMutation({
//       mutationFn: async () => {
//          const mediaRes = await uploadMediaSmart(profile?.id, preview, "media");

//          return createPost({
//             content: postText,
//             author: profile!.id,
//             media: mediaRes,
//          });
//       },
//       onSuccess: (data) => {
//          console.log("✅ NEW POST HAS BEEN ADDED", JSON.stringify(data, null, 2));
//          queryClient.invalidateQueries({ queryKey: ["posts"] });
//          setPostText("");
//          router.back();
//       },
//       onError: (error) => Alert.alert("Error", error.message),
//    });

//    return (
//       <ScrollView
//          style={{
//             paddingHorizontal: wp(4),
//             paddingBottom: bottom,
//             position: "relative",
//          }}
//          className="flex-1 bg-white relative"
//       >
//          <View className="gap-4 relative">
//             <View className="flex-row items-center gap-4">
//                <Avatar path={profile?.avatarUrl} size={45} />
//                <View>
//                   <AppText weight="semi" cap="capitalize">
//                      {profile?.firstName} {profile?.lastName}
//                   </AppText>
//                   <View className="flex-row gap-3">
//                      <AppText size="sm" color={appColors.secondary}>
//                         @{profile?.username}
//                      </AppText>
//                   </View>
//                </View>
//             </View>

//             <KeyboardAvoidingView
//                behavior={Platform.OS === "ios" ? "padding" : "height"}
//                keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
//                className="relative"
//             >
//                <View style={{ backgroundColor: appColors.offWhite, height: hp(20) }} className="rounded-xl p-2">
//                   <TextInput
//                      style={{
//                         fontSize: hp(3),
//                         fontFamily: Font.Light,
//                         color: appColors.text,
//                      }}
//                      placeholder="What's on your mind?"
//                      placeholderTextColor={appColors.placeholder}
//                      multiline
//                      value={postText}
//                      onChangeText={setPostText}
//                      autoFocus
//                   />
//                </View>
//             </KeyboardAvoidingView>

//             <Imagepicker
//                size={100}
//                url={null}
//                onPickLocal={(assets) => setPreview(assets)}
//                picker={
//                   <View className="self-end">
//                      <ImageIcon size={32} />
//                   </View>
//                }
//             />
//          </View>
//          <Button
//             onPress={() => mutate()}
//             disabled={!postText.trim()}
//             isLoading={isPending}
//             icon={<Plus color={!postText ? appColors.grey : appColors.blue} />}
//             size="sm"
//             text="Post"
//             className="absolute top-0 right-4 bg-neutral-100 p-2 rounded-lg"
//             variant="secondary"
//             color={appColors.blue}
//          />
//       </ScrollView>
//    );
// }

import React from "react";
import { Text, View } from "react-native";

export default function CreatePost() {
  return (
    <View>
      <Text>CreatePost</Text>
    </View>
  );
}
