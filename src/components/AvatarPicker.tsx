import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, StyleSheet, View } from "react-native";
import AppText from "./ui/AppText";
import Button from "./ui/Button";

interface Props {
   size: number;
   url: string | null;
   // onUpload: (filePath: string) => void;
   onPickLocal?: (uri: any) => void;
}

export default function AvatarPicker({ url, size = 150, onPickLocal }: Props) {
   const [uploading, setUploading] = useState(false);
   const [avatarUrl, setAvatarUrl] = useState<string | null>(null);
   const avatarSize = { height: size, width: size };

   // useEffect(() => {
   //    if (url) downloadImage(url);
   // }, [url]);

   // async function downloadImage(path: string) {
   //    try {
   //       const { data, error } = await supabase.storage.from("avatars").download(path);

   //       if (error) {
   //          throw error;
   //       }

   //       const fr = new FileReader();
   //       fr.readAsDataURL(data);
   //       fr.onload = () => {
   //          setAvatarUrl(fr.result as string);
   //       };
   //    } catch (error) {
   //       if (error instanceof Error) {
   //          console.log("Error downloading image: ", error.message);
   //       }
   //    }
   // }

   async function pickAvatar() {
      try {
         setUploading(true);
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
         });
         if (result.canceled || !result.assets || result.assets.length === 0) {
            console.log("User cancelled image picker.");
            return;
         }

         if (!result.canceled) {
            const image = result.assets[0].uri;
            setAvatarUrl(image);
            onPickLocal?.(image);
         }
      } catch (error) {
         if (error instanceof Error) {
            Alert.alert(error.message);
         } else {
            throw error;
         }
      } finally {
         setUploading(false);
      }
   }

   return (
      <View className="gap-12">
         {!avatarUrl && (
            // <Image
            //    source={require("@/assets/images/person-placeholder.jpg")}
            //    style={[avatarSize, { borderRadius: 100, alignSelf: "center" }]}
            // />
            <AppText>Image placeholder</AppText>
         )}
         {avatarUrl && (
            <AppText>Image placeholder</AppText>

            // <Image
            //    source={[{ uri: avatarUrl }]}
            //    accessibilityLabel="Avatar"
            //    style={[avatarSize, styles.avatar, styles.image]}
            // />
         )}
         <View>
            <Button
               text={uploading ? "Uploading ..." : avatarUrl ? "Change image" : "Upload"}
               onPress={pickAvatar}
               disabled={uploading}
               size="lg"
               variant="outline"
            />
         </View>
      </View>
   );
}

const styles = StyleSheet.create({
   avatar: {
      borderRadius: 5,
      overflow: "hidden",
      maxWidth: "100%",
      alignSelf: "center",
   },
   image: {
      objectFit: "cover",
      paddingTop: 0,
      borderRadius: 100,
   },
   noImage: {
      backgroundColor: "#333",
      borderWidth: 1,
      borderStyle: "solid",
      borderColor: "rgb(200, 200, 200)",
      borderRadius: 5,
   },
});
