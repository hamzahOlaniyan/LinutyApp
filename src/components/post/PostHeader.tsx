import { ThreeDots } from "@/assets/icons/threedots";
import { appColors } from "@/src/constant/colors";
import { hp, wp } from "@/src/constant/common";
import { Octicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useRouter } from "expo-router";
import { Pressable, View } from "react-native";
import Avatar from "../Avatar";
import AppText from "../ui/AppText";

type PostHeader = {
   id: string;
   avatar: string;
   name: string;
   username: string;
   date: string;
   postInfo: () => void;
};

dayjs.extend(relativeTime);

export default function PostHeader({ id, avatar, name, username, date, postInfo }: PostHeader) {
   const router = useRouter();
   return (
      <View
         style={{
            paddingHorizontal: wp(2),
            paddingVertical: hp(1),
         }}
      >
         <View className="flex-row justify-between items-start">
            <View className="flex-row items-center gap-2">
               <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                  <Avatar path={avatar} size={50} />
               </Pressable>
               <View className="">
                  <View className="flex-row items-center gap-1">
                     <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                        <AppText size="lg" weight="bold" cap="capitalize">
                           {name.trim()}
                        </AppText>
                     </Pressable>
                     <View className="flex-row items-center gap-1 relative -top-[px]">
                        <Octicons name="dot-fill" size={5} color={appColors.lightGrey} className="relative" />
                        <AppText color={appColors.lightGrey} size="xxs" className="">
                           {dayjs(date).fromNow(true)}
                        </AppText>
                     </View>
                  </View>
                  <Pressable onPress={() => router.push(`/(app)/(user)/${id}`)}>
                     <AppText size="sm" color={appColors.lightGrey}>
                        @{username}
                     </AppText>
                  </Pressable>
               </View>
            </View>
            <Pressable onPress={postInfo} className="h-full relative">
               <ThreeDots color={appColors.lightGrey} />
            </Pressable>
         </View>
      </View>
   );
}
