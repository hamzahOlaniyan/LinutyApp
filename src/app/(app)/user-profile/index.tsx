import ProfileGallery from "@/components/profile/ProfileGallery";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileInfo from "@/components/profile/ProfileInfo";
import ProfilePosts from "@/components/profile/ProfilePosts";
import ProfileStore from "@/components/profile/ProfileStore";
import StickyTabs from "@/components/ui/StickyTabs";
import { getPostsUserById } from "@/Services/db/posts";
import { getProfileById } from "@/Services/db/profiles";
import { useAuthStore } from "@/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useWindowDimensions } from "react-native";

export default function index() {
   const { profile } = useAuthStore();
   const layout = useWindowDimensions();
   const [index, setIndex] = React.useState(0);

   const {
      data: USER_POSTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts", { user_id: profile?.id }],
      queryFn: async () => getPostsUserById(profile!.id),
   });

   const { data: PROFILE } = useQuery({
      queryKey: ["profile", profile?.id],
      queryFn: async () => getProfileById(profile.id),
   });

   return (
      <StickyTabs
         header={<ProfileHeader userProfile={profile} />}
         routes={[
            { key: "Posts", title: "Posts" },
            { key: "Pictures", title: "Pictures" },
            { key: "Info", title: "Details" },
            { key: "Store", title: "Your store" },
         ]}
         scenes={{
            Posts: <ProfilePosts item={USER_POSTS} />,
            Pictures: <ProfileGallery />,
            Info: <ProfileInfo item={PROFILE} />,
            Store: <ProfileStore />,
         }}
      />
   );
}
