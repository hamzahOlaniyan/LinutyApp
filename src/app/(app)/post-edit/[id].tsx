import Avatar from "@/components/Avatar";
import Imagepicker from "@/components/Imagepicker";
import Button from "@/components/ui/Button";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { ImageIcon } from "@/icons/ico/ImageIcon";
import { getPostById, updatePost } from "@/Services/db/posts";
import { getStoreProductById } from "@/Services/db/store";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";

export default function EditPost() {
   const { id, type } = useLocalSearchParams<{ id?: string; type: string }>();
   const params = useLocalSearchParams();
   const { profile } = useAuthStore();
   const queryClient = useQueryClient();

   const [content, setContent] = useState("");
   const [preview, setPreview] = useState<any[]>([]);

   const queryFn = async () => {
      if (type === "product") {
         return await getStoreProductById(id as string);
      } else {
         return await getPostById(id as string);
      }
   };

   const { data, error, isFetching } = useQuery({
      queryKey: ["edit-item", id, type],
      queryFn,
      enabled: !!id && !!type,
   });

   useEffect(() => {
      if (data?.content) setContent(data.content);
   }, [data]);

   const { mutate, isPending } = useMutation({
      mutationFn: async () => {
         // const mediaRes = await uploadMediaSmart(profile?.id, preview, "media");
         await updatePost(id as string, { content: content });
      },
      onSuccess: () => {
         Alert.alert("Success", "Post updated!");
         queryClient.invalidateQueries({ queryKey: ["posts"] });
      },
      onError: (error) => {
         console.log("❌ couldnt update post", error.cause);
      },
   });

   return (
      <ScrollView style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white }}>
         <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 80}
            className="relative"
         >
            <View className="flex-row justify-between">
               <Avatar path={profile?.avatarUrl} size={45} />
               <Button text="save" variant="secondary" onPress={() => mutate()} isLoading={isPending} />
            </View>
            <TextInput
               multiline
               style={{ fontSize: 18, flex: 1 }}
               value={content}
               onChangeText={(text) => setContent(text)}
            />
            <Imagepicker
               size={100}
               url={null}
               onPickLocal={(assets) => setPreview(assets)}
               picker={
                  <View className="self-end">
                     <ImageIcon size={32} />
                  </View>
               }
            />
         </KeyboardAvoidingView>
      </ScrollView>
   );
}
