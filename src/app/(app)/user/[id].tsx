import ProfileGallery from "@/components/profile/ProfileGallery";
import ProfilePosts from "@/components/profile/ProfilePosts";
import AppText from "@/components/ui/AppText";
import StickyTabs from "@/components/ui/StickyTabs";
import UserHeader from "@/components/user/UserHeader";
import { appColors } from "@/constant/colors";
import { getPostsUserById } from "@/Services/posts";
import { getProfileById } from "@/Services/profiles";
import { useQuery } from "@tanstack/react-query";
import { Stack, useLocalSearchParams, useRouter } from "expo-router";
import React from "react";
import { View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
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
      queryKey: ["posts", { author: id }],
      queryFn: async () => getPostsUserById(id),
   });

   const { data: PROFILE } = useQuery({
      queryKey: ["profile", id],
      queryFn: async () => getProfileById(id),
   });

   const fullName = `${PROFILE?.firstName} ${PROFILE?.lastName}`;

   return (
      <ScrollView style={{ backgroundColor: appColors.extralightOlive, flex: 1, marginBottom: bottom }}>
         <Stack.Screen
            options={{
               title: fullName,
               headerShadowVisible: false,
            }}
         />
         <UserHeader profile={PROFILE} />
         <View style={{ backgroundColor: appColors.white }} className="mt-2 gap-4">
            <View style={{ backgroundColor: appColors.white }} className="p-4">
               <AppText size="xxl" weight="semi">
                  Activities
               </AppText>
            </View>

            <StickyTabs
               // header={<UserHeader profile={PROFILE} />}
               routes={[
                  { key: "Post", title: "Posts" },
                  { key: "Images", title: "Pictures" },
                  { key: "About", title: "About" },
               ]}
               scenes={{
                  Post: <ProfilePosts item={USER_POSTS} />,
                  Images: <ProfileGallery />,
                  // About: <ProfileInfo profile={PROFILE} />,
               }}
            />
         </View>
      </ScrollView>
   );
}
