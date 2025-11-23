import FriendList from "@/components/Friends/FriendList";
import FriendRequest from "@/components/Friends/FriendRequest";
import FriendSearch from "@/components/Friends/FriendSearch";
import ScreenHeader from "@/components/ui/ScreenHeader";
import StickyTabs from "@/components/ui/StickyTabs";
import { appColors } from "@/constant/colors";
import { Search2 } from "@/icons/ico/search2";
import { useLocalSearchParams } from "expo-router";
import React, { useState } from "react";
import { View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import ClanMembers from "../explore/clan-members";

export default function Friends() {
   const [showSearchBar, setShowSearchbar] = useState(false);
   const { initialTab } = useLocalSearchParams<{ initialTab?: string }>();
   return (
      <View style={{ backgroundColor: appColors.white, flex: 1 }}>
         <SafeAreaView style={{ flex: 1 }}>
            <View className="px-4">
               <ScreenHeader
                  headerTitle="Friends"
                  leftAction={
                     <Search2 size={32} color={appColors.black} onPress={() => setShowSearchbar(!showSearchBar)} />
                  }
               />
            </View>
            <StickyTabs
               initialKey={initialTab}
               // header={
               //    <ScreenHeader
               //       headerTitle="Your friends"
               //       leftAction={
               //          <Search2 size={32} color={appColors.black} onPress={() => setShowSearchbar(!showSearchBar)} />
               //       }
               //    />
               // }
               routes={[
                  { key: "Search", title: "Search friends" },
                  { key: "ClanMembers", title: "Clan Members" },
                  { key: "Yourfriends", title: "Your friends" },
                  { key: "FriendRequest", title: "Friend request" },
               ]}
               scenes={{
                  Search: <FriendSearch showSearchBar={showSearchBar} />,
                  Yourfriends: <FriendList />,
                  FriendRequest: <FriendRequest />,
                  ClanMembers: <ClanMembers showSearchBar={showSearchBar} />,
               }}
            />
         </SafeAreaView>
      </View>
   );
}
