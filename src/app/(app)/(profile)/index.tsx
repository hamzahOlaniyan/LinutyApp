import ProfileGallery from "@/src/components/profile/ProfileGallery";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import ProfilePosts from "@/src/components/profile/ProfilePosts";
import StickyTabs from "@/src/components/ui/StickyTabs";
import { getPostsUserById } from "@/src/Services/posts";
import { getProfileById } from "@/src/Services/profiles";
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

   const { data: PROFILE } = useQuery({
      queryKey: ["profile", profile?.id],
      queryFn: async () => getProfileById(profile.id),
   });

   // console.log("PROFILE", JSON.stringify(PROFILE, null, 2));

   return (
      <StickyTabs
         header={<ProfileHeader userProfile={profile} />}
         routes={[
            { key: "Posts", title: "Posts" },
            { key: "Pictures", title: "Pictures" },
            { key: "Info", title: "Details" }, // extra route
         ]}
         scenes={{
            Posts: <ProfilePosts item={USER_POSTS} />,
            Pictures: <ProfileGallery />,
            Info: <ProfileInfo item={PROFILE} />,
         }}
      />
   );
}
