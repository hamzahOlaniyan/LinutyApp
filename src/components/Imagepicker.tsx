import { Fontisto } from "@expo/vector-icons";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { Alert, Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";

interface Props {
   size: number;
   url: string | null;
   onPickLocal?: (uri: any) => void;
   picker: React.ReactNode;
}

const { width: screenWidth } = Dimensions.get("screen");

export default function Imagepicker({ url, size = 200, onPickLocal, picker }: Props) {
   const [uploading, setUploading] = useState(false);
   const [image, setImage] = useState<{ uri: string; mimeType?: string; height: number; width: number }[]>([]);

   async function pickImage() {
      try {
         setUploading(true);
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images", "videos"],
            allowsMultipleSelection: true,
            // aspect: [1, 1],
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
               duration: asset.duration,
               fileName: asset.fileName,
               size: asset.fileSize,
               type: asset.type,
            }));

            setImage((prev) => [...prev, ...newImages]);

            // const uris = newImages.map((u) => u.uri);
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
      <View>
         <View style={styles.imageContainer}>
            {image &&
               image?.map((pic, idx) => (
                  <View key={idx} style={{ width: "49%" }}>
                     <Image
                        source={{ uri: pic?.uri }}
                        transition={100}
                        style={{
                           borderRadius: 10,
                           aspectRatio: 1 / 1,
                        }}
                     />
                     <Fontisto
                        onPress={() => removeImage(pic.uri)}
                        name="close-a"
                        size={16}
                        color="white"
                        className="absolute top-2 left-3 bg-black/70 p-2 rounded-full"
                     />
                  </View>
               ))}
         </View>
         <TouchableOpacity onPress={pickImage}>{picker}</TouchableOpacity>
      </View>
   );
}

const styles = StyleSheet.create({
   imageContainer: {
      flexDirection: "row",
      gap: 4,
      rowGap: 4,
      flexWrap: "wrap",
      justifyContent: "space-between",
   },
});
