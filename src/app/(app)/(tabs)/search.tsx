import ScreenWrapper from "@/src/components/ScreenWrapper";
import FriendList from "@/src/components/search/FriendList";
import FriendSearch from "@/src/components/search/FriendSearch";
import ScreenHeader from "@/src/components/ui/ScreenHeader";
import Tab from "@/src/components/ui/Tab";
import { wp } from "@/src/constant/common";
import React from "react";
import { View } from "react-native";

export default function Search() {
   return (
      <ScreenWrapper paddingHorizontal={0}>
         <View className="flex-1">
            <View style={{ paddingHorizontal: wp(4) }}>
               <ScreenHeader headerTitle="Your friends" />
            </View>
            <Tab
               routes={[
                  { key: "Search", title: "Search friends" },
                  { key: "Yourfriends", title: "Your friends" },
                  { key: "FriendRequest", title: "Friend request" },
               ]}
               scenes={{
                  Search: () => <FriendSearch />,
                  Yourfriends: () => <FriendList />,
                  // info: () => <ProfileInfo />,
               }}
            />
         </View>
      </ScreenWrapper>
   );
}
