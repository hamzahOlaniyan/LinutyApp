import { ImageIcon } from "@/assets/icons/ImageIcon";
import { InfoIcon } from "@/assets/icons/info";
import { PostsIcon } from "@/assets/icons/PostsIcon";
import ProfileGallery from "@/src/components/profile/ProfileGallery";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfileInfo from "@/src/components/profile/ProfileInfo";
import ProfilePosts from "@/src/components/profile/ProfilePosts";
import Tab from "@/src/components/ui/Tab";
import { appColors } from "@/src/constant/colors";
import { getPostsUserById } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useWindowDimensions, View } from "react-native";
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

   console.log(JSON.stringify(USER_POSTS, null, 2));

   return (
      <View style={{ paddingBottom: bottom, backgroundColor: appColors.white }} className="flex-1">
         <View className="flex-1 gap-4">
            <View className="w-full bg-yellow-500 h-48"></View>
            <ProfileHeader userProfile={profile} />
            <Tab
               routes={[
                  { key: "Posts", icon: <PostsIcon size={24} /> },
                  { key: "Images", icon: <ImageIcon size={24} /> },
                  { key: "Info", icon: <InfoIcon size={24} /> }, // extra route
               ]}
               scenes={{
                  Posts: () => <ProfilePosts item={USER_POSTS} />,
                  profile: () => <ProfileGallery />,
                  info: () => <ProfileInfo />,
               }}
               activeColor={appColors.primary}
            />
         </View>
      </View>
   );
}
