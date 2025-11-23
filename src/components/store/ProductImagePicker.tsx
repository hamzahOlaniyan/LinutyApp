import { appColors } from "@/constant/colors";
import { ImageIcon } from "@/icons/ico/ImageIcon";
import { Fontisto } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, View } from "react-native";
import AppText from "../ui/AppText";

interface Props {
   size?: number;
   url?: string | null;
   onPickLocal?: (uri: any) => void;
   picker?: React.ReactNode;
   reset?: boolean;
   value?: any[];
}

export default function ProductImagePicker({ url, size = 200, onPickLocal, picker, reset, value = [] }: Props) {
   const [uploading, setUploading] = useState(false);
   const [image, setImage] = useState<{ uri?: string; mimeType?: string; height: number; width: number }[]>([]);

   useEffect(() => {
      if (reset) {
         setImage([]);
      }
   }, [reset]);

   useEffect(() => {
      if (!value) return;

      const arrayValue = Array.isArray(value) ? value : [value];

      const flattened = arrayValue.flat();

      if (flattened.length > 0) {
         const normalized = flattened.map((img: any) => ({
            uri: img.url || img.uri,
            mimeType: img.mimeType,
            height: img.height,
            width: img.width,
         }));
         setImage(normalized);
      }
   }, [value]);

   // console.log(image);

   async function pickStoreImage() {
      try {
         setUploading(true);
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsMultipleSelection: true,
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
               fileName: asset.fileName,
               size: asset.fileSize,
               type: asset.type,
            }));
            setImage((prev) => [...prev, ...newImages]);
            onPickLocal?.(newImages);
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
                  keyExtractor={(item, index) => (item.uri as string) + index}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={{
                     marginVertical: 10,
                     columnGap: 10,
                     borderRadius: 10,
                  }}
                  renderItem={({ item }) => (
                     <View className="relative">
                        <Image
                           source={{ uri: item?.uri }}
                           style={{
                              width: 176,
                              height: 140,
                              borderRadius: 10,
                              resizeMode: "cover",
                           }}
                           className="object-cover object-center w-44 h-40 rounded-md"
                        />
                        <Fontisto
                           onPress={() => removeImage(item?.uri as string)}
                           name="close-a"
                           size={10}
                           color="white"
                           className="absolute top-2 left-3 bg-black/70 p-2 rounded-full"
                        />
                     </View>
                  )}
                  ListHeaderComponent={
                     <View
                        style={{
                           borderWidth: 0.8,
                           borderColor: appColors.inputInactive,
                           padding: 5,
                           borderStyle: "dashed",
                        }}
                        className="w-28 h-40 rounded-md justify-center "
                     >
                        <View className="">
                           <Pressable
                              onPress={pickStoreImage}
                              className="items-center rounded-full gap-2 mr-2 relative p-2 justify-center"
                           >
                              <ImageIcon color={appColors.icons} />
                           </Pressable>
                           <AppText size="sm" weight="med" align="center" color={appColors.secondary}>
                              Add Photo
                           </AppText>
                        </View>
                     </View>
                  }
               />
               {image.length > 0 && (
                  <View className="my-2">
                     <AppText
                        size="sm"
                        color={appColors.blue}
                        weight="med"
                     >{`Photos: ${image.length}/5, Choose your listing's main photo first`}</AppText>
                  </View>
               )}
            </>
         )}
      </View>
   );
}
