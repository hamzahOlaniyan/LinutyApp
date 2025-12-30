import { Font } from "@/assets/fonts/FontFamily";
import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import { appColors } from "@/constant/colors";
import { hp, wp } from "@/constant/common";
import { PostApi } from "@/hooks/usePostApi";
import Icon from "@/icons";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { randomUUID } from "expo-crypto";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export type LocalMedia = {
  id?: string;
  uri: string;
  mimeType: string;
  width?: number;
  height?: number;
  size?: number;
};

export default function Create_post() {
  const { me } = useAuthStore();
  const createPostMutation = PostApi.createPost();

  const [content, setContent] = useState("");
  const [media, setMedia] = useState<LocalMedia[]>([]);
  const [loading, setLoading] = useState(false);

  const name = `${me?.firstName} ${me?.lastName}`;

  const navigation = useNavigation();

  const { bottom } = useSafeAreaInsets();

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8
    });

    if (result.canceled) return;

    const selected = result.assets.map(asset => ({
      id: randomUUID(),
      uri: asset.uri,
      mimeType: asset.mimeType ?? "image/jpeg",
      width: asset.width,
      height: asset.height,
      size: asset.fileSize
    }));

    setMedia(prev => [...prev, ...selected]);
  };

  const removeImage = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
  };

  async function uploadImage(file: LocalMedia, userId: string) {
    const fileExt = file.uri.split(".").pop() || "jpg";
    const filePath = `posts/${userId}/${Date.now()}-${file.id}.${fileExt}`;

    const response = await fetch(file.uri);

    // ✅ works in RN + TS
    const arrayBuffer = await response.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
      .from("post-images")
      .upload(filePath, fileData, {
        contentType: file.mimeType,
        upsert: false
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("post-images")
      .getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      mimeType: file.mimeType,
      type: "IMAGE" as const,
      width: file.width,
      height: file.height,
      sizeBytes: fileData.byteLength
    };
  }

  const handleSubmit = async () => {
    console.log("clicked");

    try {
      setLoading(true);

      if (!me?.id) {
        console.error("No authenticated user");
        setLoading(false);
        return;
      }

      // 1️⃣ Upload media first
      let uploadedMedia;

      if (!content?.trim() && media.length === 0) {
        setLoading(false);
        return;
      }

      if (media.length > 0) {
        uploadedMedia = await Promise.all(
          media.map(file => uploadImage(file, me.id))
        );
      }

      // 2️⃣ Create post
      await createPostMutation.mutateAsync(
        {
          content,
          visibility: "PUBLIC",
          images: uploadedMedia
        },
        {
          onSuccess: async () => console.log("✅ new post has been created"),
          onError: async error =>
            console.log("something whent wrong", error.message)
        }
      );

      // 3️⃣ Reset + navigate back
      setContent("");
      setMedia([]);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      console.log("Failed to create post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScrollView
      style={{
        paddingBottom: bottom,
        position: "relative"
      }}
      className="relative flex-1 bg-white"
    >
      <View className="relative gap-4">
        <View
          style={{
            paddingHorizontal: wp(3)
          }}
          className="flex-row items-center gap-4"
        >
          <Avatar path={me?.avatarUrl} size={45} />
          <View className="flex-1">
            <AppText className="font-SemiBold capitalize">{name}</AppText>
            <AppText variant={"small"} color={appColors.placeholder}>
              @{me?.username}
            </AppText>
          </View>
          <TouchableOpacity
            onPress={handleSubmit}
            disabled={!content}
            className="rounded-full  bg-teal-500  px-4 py-2 disabled:bg-neutral-300"
          >
            {loading ? (
              <ActivityIndicator />
            ) : (
              <View className="flex-row items-center">
                <AppText
                  color={appColors.white}
                  className="font-Medium disabled:text-neutral-400"
                >
                  Post
                </AppText>
              </View>
            )}
          </TouchableOpacity>
        </View>

        <View style={{ height: hp(20) }} className="rounded-xl p-2">
          <TextInput
            style={{
              fontSize: hp(2),
              fontFamily: Font.Regular,
              color: appColors.text
            }}
            placeholder="What's on your mind?"
            placeholderTextColor={appColors.placeholder}
            multiline
            value={content}
            onChangeText={setContent}
            autoFocus
          />
        </View>
        <View
          style={{
            paddingHorizontal: wp(3)
          }}
        >
          <View className="elevation-sm p-2">
            <TouchableOpacity onPress={pickImages} className="w-[110px]">
              <View className="flex-row items-start justify-between rounded-md bg-neutral-100 p-2">
                <View className="justify-start ">
                  <Icon name="add_image" size={24} />
                  <AppText variant={"xs"}>Photo/Video</AppText>
                </View>
                <Icon name="plus" size={18} />
              </View>
            </TouchableOpacity>
          </View>

          {media.length > 0 && (
            <Pressable onPress={() => setMedia([])} className="justify-end">
              <AppText variant={"small"} className="text-right text-error">
                Remove all
              </AppText>
            </Pressable>
          )}
          <FlatList
            horizontal
            data={media}
            // keyExtractor={(item: LocalMedia, index: number) => index}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              gap: 10,
              paddingVertical: 10
            }}
            renderItem={({ item }) => (
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 12
                  }}
                />

                {/* delete button */}
                <Pressable
                  onPress={() => removeImage(item.id as string)}
                  hitSlop={10}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.6)"
                  }}
                >
                  <AppText style={{ color: "white", fontSize: 14 }}>✕</AppText>
                </Pressable>
              </View>
            )}
          />
        </View>
      </View>
    </ScrollView>
  );
}
