import AppText from "@/components/ui/AppText";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Profile } from "../../../../types/supabaseTypes";

export default function Info(me: Profile) {
  const [readmore, setReadMore] = useState(false);

  const name = `${me?.firstName} ${me?.lastName}`;

  const router = useRouter();

  return (
    <View style={{ paddingHorizontal: wp(3), marginTop: 12, marginBottom: 30 }}>
      <View style={s.infoContainer}>
        <View style={s.infoWrapper}>
          <Avatar path={me?.avatarUrl} size={100} />
          <View className="flex-1 gap-2">
            <View>
              <AppText variant="profile_name" className="capitalize">
                {name}
              </AppText>
              <AppText>@{me?.username}</AppText>
            </View>

            <View className="flex-row gap-4">
              <View className="">
                <AppText className="font-SemiBold">347</AppText>
                <AppText variant={"small"} color={appColors.placeholder}>
                  Followers
                </AppText>
              </View>
              <View className="">
                <AppText className="font-SemiBold">3</AppText>
                <AppText variant={"small"} color={appColors.placeholder}>
                  Following
                </AppText>
              </View>
            </View>
          </View>
        </View>
        {!readmore ? (
          <AppText className="font-Medium">
            {me?.bio.substring(0, 95)}...{" "}
            <AppText
              onPress={() => setReadMore(!readmore)}
              color={appColors.secondary}
            >
              {" "}
              more
            </AppText>
          </AppText>
        ) : (
          <AppText className="font-Medium">
            {me?.bio}
            <AppText
              onPress={() => setReadMore(!readmore)}
              color={appColors.secondary}
            >
              {" "}
              less
            </AppText>
          </AppText>
        )}
        <View className="mt-4 flex-row justify-between gap-4 ">
          <Button
            size="sm"
            text="Manage your profile"
            className="flex-1"
            variant="secondary"
          />
          <Button
            text="Edit profile"
            size="sm"
            variant="secondary"
            onPress={() => router.push("/me/edit")}
          />
        </View>
      </View>
    </View>
  );
}

const s = StyleSheet.create({
  infoContainer: {
    gap: 12
  },
  infoWrapper: {
    flexDirection: "row",
    gap: 12
  },
  avatar: {
    width: 130,
    height: 130,
    borderRadius: 200
  }
});
