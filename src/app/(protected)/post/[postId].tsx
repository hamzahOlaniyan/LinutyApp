import { Font } from "@/assets/fonts/FontFamily";
import AppText from "@/components/ui/AppText";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { PostApi } from "@/hooks/usePostApi";
import Icon from "@/icons";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { randomUUID } from "expo-crypto";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation
} from "expo-router";
import React, { useCallback, useEffect, useRef, useState } from "react";

import {
  ActivityIndicator,
  FlatList,
  Pressable,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import { PostResponse } from "../../../../types/supabaseTypes";
import { LocalMedia } from "../create-post";

type EditableMedia = {
  id: string;
  url?: string; // remote
  uri?: string; // local
  mimeType: string;
  width?: number | null;
  height?: number | null;
  sizeBytes?: number;
  size?: number;
  isLocal: boolean;
  remoteId?: string; // optional if your local item id differs
};

export default function PostIdScreen() {
  const { me } = useAuthStore();
  const { postId } = useLocalSearchParams<{ postId?: string }>();

  const navigation = useNavigation();
  const qc = useQueryClient();
  const savedRef = useRef(false);

  const { data: postData } = PostApi.useGetPostById(postId ?? "");
  const { data: mediaFiles } = PostApi.getPostMedia(postId ?? "");

  const updateContent = PostApi.updatePostContent(postId ?? "");
  const addMedia = PostApi.addPostMedia(postId ?? "");

  const [post, setPost] = useState<PostResponse | null>(null);
  const [media, setMedia] = useState<EditableMedia[]>([]);
  const [deletedMediaIds, setDeletedMediaIds] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  useFocusEffect(
    useCallback(() => {
      savedRef.current = false;

      return () => {
        if (!savedRef.current) {
          // discard drafts
          setDirty(false);
          setDeletedMediaIds([]);
          if (postData) setPost(postData);
          if (mediaFiles)
            setMedia(mediaFiles.map(m => ({ ...m, isLocal: false })));
        }
      };
    }, [postData, mediaFiles])
  );

  useEffect(() => {
    if (postData && !dirty) setPost(postData);
  }, [postData, dirty]);

  useEffect(() => {
    if (mediaFiles && !dirty) {
      setMedia(mediaFiles.map(m => ({ ...m, isLocal: false })));
    }
  }, [mediaFiles, dirty]);

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8
    });

    if (result.canceled) return;

    setDirty(true);
    setMedia(prev => [
      ...prev,
      ...result.assets.map(a => ({
        id: randomUUID(),
        uri: a.uri,
        mimeType: a.mimeType ?? "image/jpeg",
        width: a.width,
        height: a.height,
        size: a.fileSize,
        isLocal: true
      }))
    ]);
  };

  const removeImage = useCallback((id: string) => {
    setDirty(true);
    setMedia(prev => {
      const item = prev.find(m => m.id === id);
      if (item && !item.isLocal) setDeletedMediaIds(ids => [...ids, id]);
      return prev.filter(m => m.id !== id);
    });
  }, []);

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
    if (!postId || !me?.id) return;

    const content = post?.content?.trim() || null;
    const localItems = media.filter(m => m.isLocal);

    if (!dirty) return;

    // nothing to save
    if (!content && media.length === 0) return;

    setLoading(true);
    try {
      // 1) PATCH content
      await updateContent.mutateAsync({ content });

      // 2) DELETE removed remote media
      await Promise.all(
        deletedMediaIds.map(id => api.delete(`/post/media/${id}`))
      );

      // 3) Upload locals -> POST /post/:id/media
      if (localItems.length) {
        const uploaded = await Promise.all(
          localItems.map(f =>
            uploadImage({ uri: f.uri!, mimeType: f.mimeType }, me.id)
          )
        );
        // uploaded should return { url, mimeType, sizeBytes, width, height }

        await addMedia.mutateAsync({ images: uploaded });
      }
      await qc.invalidateQueries({ queryKey: [`/post/${postId}`] });
      await qc.invalidateQueries({ queryKey: [`/post/${postId}/media`] });
      await qc.invalidateQueries({ queryKey: ["/feed"] });

      savedRef.current = true;
      setDirty(false);
      setDeletedMediaIds([]);

      navigation.goBack();
    } catch (e) {
      console.log("Update failed", e);
    } finally {
      setLoading(false);
    }
  };

  const renderMediaItem = useCallback(
    ({ item }: { item: EditableMedia }) => (
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.isLocal ? item.uri! : item.url! }}
          style={{ width: 90, height: 90, borderRadius: 12 }}
        />
        <Pressable
          onPress={() => removeImage(item.id)}
          hitSlop={10}
          style={s.removeBtn}
        >
          <Icon name="close" />
        </Pressable>
      </View>
    ),
    [removeImage]
  );

  return (
    <ScreenView>
      <View style={{ height: hp(20) }} className="rounded-xl p-2">
        <TextInput
          style={s.input}
          placeholder="What's on your mind?"
          placeholderTextColor={appColors.placeholder}
          multiline
          value={post?.content ?? ""}
          autoFocus
          onChangeText={text => {
            setDirty(true);
            setPost(prev => (prev ? { ...prev, content: text } : prev));
          }}
        />
      </View>
      <TouchableOpacity
        onPress={handleSubmit}
        className="absolute right-4 top-0 z-50 bg-teal-500 "
      >
        {loading ? <ActivityIndicator /> : <AppText>update</AppText>}
      </TouchableOpacity>

      {media.length > 0 && (
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
          data={media}
          keyExtractor={item => item.id}
          renderItem={renderMediaItem}
        />
      )}
      <View className="elevation-sm p-2">
        <TouchableOpacity onPress={pickImages}>
          {loading ? (
            <ActivityIndicator />
          ) : (
            <Icon name="add_image" size={32} />
          )}
        </TouchableOpacity>
      </View>
    </ScreenView>
  );
}

const s = StyleSheet.create({
  input: {
    fontSize: hp(2),
    fontFamily: Font.Regular,
    color: appColors.text
  },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  }
});
