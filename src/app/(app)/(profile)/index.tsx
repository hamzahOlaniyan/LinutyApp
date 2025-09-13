import ProfileGallery from "@/src/components/profile/ProfileGallery";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import ProfilePosts from "@/src/components/profile/ProfilePosts";
import StickyTabs from "@/src/components/ui/Tab";
import { getPostsUserById } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useWindowDimensions } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export default function index() {
   const { profile } = useAuthStore();
   const layout = useWindowDimensions();
   const [index, setIndex] = React.useState(0);

   const { bottom } = useSafeAreaInsets();

   const {
      data: USER_POSTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts", { user_id: profile?.id }],
      queryFn: async () => getPostsUserById(profile!.id),
   });

   return (
      <StickyTabs
         header={<ProfileHeader userProfile={profile} />}
         routes={[
            { key: "Posts", title: "Posts" },
            { key: "Images", title: "Pictures" },
            { key: "Info", title: "Details" }, // extra route
         ]}
         scenes={{
            Posts: <ProfilePosts item={USER_POSTS} />,
            profile: <ProfileGallery />,
            info: <ProfileInfo />,
         }}
      />
   );
}
