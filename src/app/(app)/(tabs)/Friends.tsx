import { Search2Outline } from "@/assets/icons/search-2-outline";
import FriendList from "@/src/components/Friends/FriendList";
import FriendRequest from "@/src/components/Friends/FriendRequest";
import FriendSearch from "@/src/components/Friends/FriendSearch";
import ScreenWrapper from "@/src/components/ScreenWrapper";
import ScreenHeader from "@/src/components/ui/ScreenHeader";
import StickyTabs from "@/src/components/ui/StickyTabs";
import { appColors } from "@/src/constant/colors";
import React, { useState } from "react";

export default function Friends() {
   const [showSearchBar, setShowSearchbar] = useState(false);
   return (
      <ScreenWrapper paddingHorizontal={0}>
         <StickyTabs
            header={
               <ScreenHeader
                  headerTitle="Your friends"
                  leftAction={
                     <Search2Outline
                        size={32}
                        color={appColors.black}
                        onPress={() => setShowSearchbar(!showSearchBar)}
                     />
                  }
               />
            }
            routes={[
               { key: "Search", title: "Search friends" },
               { key: "Yourfriends", title: "Your friends" },
               { key: "FriendRequest", title: "Friend request" },
            ]}
            scenes={{
               Search: <FriendSearch showSearchBar={showSearchBar} />,
               Yourfriends: <FriendList />,
               FriendRequest: <FriendRequest />,
            }}
         />
      </ScreenWrapper>
   );
}
