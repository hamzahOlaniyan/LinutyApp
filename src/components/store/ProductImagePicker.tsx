import { ImageIcon } from "@/assets/icons/ImageIcon";
import { appColors } from "@/src/constant/colors";
import { Fontisto } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import { Alert, FlatList, Image, View } from "react-native";
import AppText from "../ui/AppText";
import Button from "../ui/Button";

interface Props {
   size?: number;
   url?: string | null;
   onPickLocal?: (uri: any) => void;
   picker?: React.ReactNode;
}

export default function ProductImagePicker({ url, size = 200, onPickLocal, picker }: Props) {
   const [uploading, setUploading] = useState(false);
   const [image, setImage] = useState<{ uri: string; mimeType?: string; height: number; width: number }[]>([]);

   async function pickStoreImage() {
      try {
         setUploading(true);
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsMultipleSelection: true,
            aspect: [4, 3],
            quality: 1,
         });
         if (result.canceled || !result.assets || result.assets.length === 0) {
            console.log("User cancelled image picker.");
            return;
         }

         if (!result.canceled) {
            const newImages = result.assets.map((asset) => ({
               uri: asset.uri,
               mimeType: asset.mimeType,
               height: asset.height,
               width: asset.width,
            }));
            setImage((prev) => [...prev, ...newImages]);

            const uris = newImages.map((u) => u.uri);
            onPickLocal?.(uris);
            return;
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

   const removeImage = (uriToRemove: string) => {
      setImage((prev) => prev.filter((img) => img.uri !== uriToRemove));
   };

   return (
      <View className="">
         {image && (
            <>
               <FlatList
                  data={image || []}
                  keyExtractor={(item, index) => item.uri + index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                     marginVertical: 10,
                     columnGap: 10,
                     backgroundColor: appColors.extralightOlive,
                     padding: 10,
                     borderRadius: 10,
                  }}
                  renderItem={({ item }) => (
                     <View className="relative">
                        <Image source={{ uri: item.uri }} className="object-cover object-center w-44 h-40 rounded-md" />
                        <Fontisto
                           onPress={() => removeImage(item.uri)}
                           name="close-a"
                           size={10}
                           color="white"
                           className="absolute top-2 left-3 bg-black/70 p-2 rounded-full"
                        />
                     </View>
                  )}
                  ListHeaderComponent={
                     <View className="w-24 h-40 rounded-md justify-center">
                        <View className="">
                           <Button
                              onPress={pickStoreImage}
                              className="items-center gap-2 mr-2 relative p-2 justify-center"
                           >
                              <ImageIcon />
                           </Button>
                           <AppText size="sm" weight="med">
                              Add Photo
                           </AppText>
                        </View>
                     </View>
                  }
               />
               {image.length > 0 && (
                  <AppText
                     size="sm"
                     color={appColors.primary}
                     weight="med"
                  >{`  Photos: ${image.length}/5, Choose your listing's main photo first`}</AppText>
               )}
            </>
         )}
      </View>
   );
}
