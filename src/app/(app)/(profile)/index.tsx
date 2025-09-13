import ProfileHeader from "@/src/components/profile/ProfileHeader";
import { appColors } from "@/src/constant/colors";
import { wp } from "@/src/constant/common";
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
            <View style={{ paddingHorizontal: wp(3) }}>
               <View className="w-full bg-yellow-500 h-32 rounded-lg"></View>
            </View>

            <ProfileHeader userProfile={profile} />
            {/* <Tab /> */}
            {/* <Tab
               routes={[
                  { key: "Posts", title: "Posts" },
                  { key: "Images", title: "Pictures" },
                  { key: "Info", title: "Details" }, // extra route
               ]}
               scenes={{
                  Posts: () => <ProfilePosts item={USER_POSTS} />,
                  profile: () => <ProfileGallery />,
                  info: () => <ProfileInfo />,
               }}
            /> */}
         </View>
      </View>
   );
}
