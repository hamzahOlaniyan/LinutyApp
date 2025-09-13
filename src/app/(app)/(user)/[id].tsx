import ProfileGallery from "@/src/components/profile/ProfileGallery";
import ProfilePosts from "@/src/components/profile/ProfilePosts";
import StickyTabs from "@/src/components/ui/Tab";
import UserHeader from "@/src/components/user/UserHeader";
import UserInfo from "@/src/components/user/UserInfo";
import { getPostsUserById } from "@/src/Services/posts";
import { getProfileById } from "@/src/Services/profiles";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";

export default function id() {
   const { id } = useLocalSearchParams<{ id: string }>();
   const router = useRouter();

   const {
      data: USER_POSTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts", { author: id }],
      queryFn: async () => getPostsUserById(id),
   });

   const { data: PROFILE } = useQuery({
      queryKey: ["profile", id],
      queryFn: async () => getProfileById(id),
   });

   console.log(JSON.stringify(USER_POSTS, null, 2));

   return (
      <>
         <Stack.Screen
            options={{
               title: PROFILE?.firstName,
               headerShadowVisible: false,
            }}
         />
         <StickyTabs
            header={<UserHeader profile={PROFILE} />}
            routes={[
               { key: "Post", title: "Posts" },
               { key: "Images", title: "Pictures" },
               { key: "About", title: "About" },
            ]}
            scenes={{
               Post: <ProfilePosts item={USER_POSTS} />,
               Images: <ProfileGallery />,
               About: <UserInfo profile={PROFILE} />,
            }}
         />
      </>
   );
}
