import { TiktokFont } from "@/assets/fonts/FontFamily";
import { ImageIcon } from "@/assets/icons/ImageIcon";
import Avatar from "@/src/components/Avatar";
import Imagepicker from "@/src/components/Imagepicker";
import AppText from "@/src/components/ui/AppText";
import Button from "@/src/components/ui/Button";
import { uploadMediaSmart } from "@/src/components/UploadImage";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { createPost } from "@/src/Services/posts";
// import { useThemeStore } from "@/src/context/themeStore";
import { useAuthStore } from "@/src/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function NewPost() {
   const [preview, setPreview] = useState<string[]>([]);
   const [postText, setPostText] = useState("");
   const { profile } = useAuthStore();

   const queryClient = useQueryClient();
   const router = useRouter();

   const { bottom } = useSafeAreaInsets();

   const { mutate, isPending, error } = useMutation({
      mutationFn: async () => {
         const mediaRes = await uploadMediaSmart(profile?.id, preview as string[]);

         // split uploaded URLs into separate fields if needed
         const imageUrls = mediaRes.filter((m) => m.type === "image").map((m) => m.url);
         const videoUrls = mediaRes.filter((m) => m.type === "video").map((m) => m.url);

         return createPost({
            content: postText,
            author: profile!.id,
            images: imageUrls,
            videos: videoUrls,
         });
      },
      onSuccess: (data) => {
         console.log("✅ NEW POST HAS BEEN ADDED", JSON.stringify(data, null, 2));
         queryClient.invalidateQueries({ queryKey: ["posts"] });
         setPostText("");
         router.back();
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   return (
      <ScrollView
         style={{
            paddingHorizontal: wp(4),
            paddingBottom: bottom,
            position: "relative",
            backgroundColor: "blue",
         }}
         className="flex-1 bg-white relative"
      >
         <View className="gap-4 relative bg-green-200">
            <View className="flex-row items-center gap-4">
               <Avatar path={profile?.avatarUrl} size={45} />
               <View>
                  <AppText weight="semi" cap="capitalize">
                     {profile?.firstName} {profile?.lastName}
                  </AppText>
                  <View className="flex-row gap-3">
                     <AppText weight="med" size="sm" color={appColors.grey}>
                        @{profile?.username}
                     </AppText>
                  </View>
               </View>
            </View>

            <KeyboardAvoidingView
               behavior={Platform.OS === "ios" ? "padding" : "height"}
               keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
               className="relative"
            >
               <View style={{ backgroundColor: appColors.offWhite, height: hp(20) }} className="rounded-xl p-2">
                  <TextInput
                     style={{
                        fontSize: hp(3),
                        fontFamily: TiktokFont.TiktokLight,
                        color: appColors.text,
                     }}
                     placeholder="What's on your mind?"
                     placeholderTextColor={appColors.placeholder}
                     multiline
                     value={postText}
                     onChangeText={setPostText}
                     autoFocus
                  />
               </View>
            </KeyboardAvoidingView>

            <Imagepicker
               size={100}
               url={null}
               onPickLocal={(uri: string[]) => setPreview(uri)}
               picker={
                  <View className="self-end">
                     <ImageIcon size={32} />
                  </View>
               }
            />
         </View>
         <Button
            onPress={() => mutate()}
            disabled={!postText.trim()}
            isLoading={isPending}
            size="sm"
            text="Post"
            className="absolute top-0 right-4 bg-neutral-100 p-2 rounded-lg"
         />
      </ScrollView>
   );
}
