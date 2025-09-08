import { HomeSolid } from "@/assets/icons/home-solid";
import ProfileHeader from "@/src/components/profile/ProfileHeader";
import ProfilePosts from "@/src/components/profile/ProfilePosts";
import Tab from "@/src/components/ui/Tab";
import { appColors } from "@/src/constant/colors";
import { getPostsUserById } from "@/src/Services/posts";
import { useAuthStore } from "@/src/store/authStore";
import { useQuery } from "@tanstack/react-query";
import React from "react";
import { useWindowDimensions, View } from "react-native";

export default function index() {
   const { profile } = useAuthStore();
   const layout = useWindowDimensions();
   const [index, setIndex] = React.useState(0);

   const {
      data: USER_POSTS,
      isLoading,
      error,
   } = useQuery({
      queryKey: ["posts"],
      queryFn: async () => getPostsUserById(profile!.id),
   });

   // console.log("USER POST", JSON.stringify(profile, null, 2));

   return (
      <View style={{ backgroundColor: appColors.white }} className="flex-1">
         <ProfileHeader userProfile={profile} />
         <Tab
            routes={[
               { key: "Posts", icon: <HomeSolid size={24} /> },
               // { key: "profile", icon: <ImageIcon size={24} /> },
               // { key: "settings", icon: <InfoIcon size={24} /> }, // extra route
            ]}
            scenes={{
               Posts: () => <ProfilePosts item={USER_POSTS} />,
               // profile: ProfileRoute,
               // settings: SettingsRoute,
            }}
         />
      </View>
   );
}
