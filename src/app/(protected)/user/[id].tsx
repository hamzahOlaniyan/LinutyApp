import ProfileGallery from "@/components/profile/ProfileGallery";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePosts from "@/components/profile/ProfilePosts";
import StickyTabs from "@/components/ui/StickyTabs";
import UserHeader from "@/components/user/UserHeader";
import { getPostsUserById } from "@/Services/db/posts";
import { getProfileById } from "@/Services/db/profiles";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function UserProfile() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const router = useRouter();

   const { bottom } = useSafeAreaInsets();

   const {
      data: USER_POSTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts", id],
      queryFn: async () => getPostsUserById(id),
      enabled: !!id,
   });

   const { data: PROFILE } = useQuery({
      queryKey: ["profile", id],
      queryFn: async () => getProfileById(id),
      enabled: !!id,
   });

   console.log("ID", JSON.stringify(PROFILE, null, 2));

   const allMedia = USER_POSTS?.flatMap((post) => {
      if (!post?.media) return [];

      // Handle both stringified JSON and arrays
      let mediaArray = [];
      if (typeof post.media === "string") {
         try {
            mediaArray = JSON.parse(post.media);
         } catch {
            return [];
         }
      } else if (Array.isArray(post.media)) {
         mediaArray = post.media;
      }

      return mediaArray;
   });

   const imageMedia = allMedia?.filter((m) => m.type === "image");
   const videoMedia = allMedia?.filter((m) => m.type === "video");

   const fullName = `${PROFILE?.firstName} ${PROFILE?.lastName}`;

   return (
      <>
         <Stack.Screen
            options={{
               title: fullName,
            }}
         />
         <StickyTabs
            header={<UserHeader profile={PROFILE} />}
            routes={[
               { key: "Post", title: "Posts" },
               { key: "Images", title: "Pictures" },
               { key: "Video", title: "Videos" },
               { key: "About", title: "About" },
            ]}
            scenes={{
               Post: <ProfilePosts item={USER_POSTS} />,
               Images: <ProfileGallery imageMedia={imageMedia} />,
               About: <ProfileInfo profile={PROFILE} />,
            }}
         />
      </>
   );
}
