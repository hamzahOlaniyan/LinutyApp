import { PhotoIcon } from "@/icons/ico/photoIcon";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import { ActivityIndicator, StyleSheet, TouchableOpacity, View } from "react-native";
import { appColors } from "../constant/colors";
import { supabase } from "../lib/supabase";
import { updateProfile } from "../Services/profiles";
import { useAuthStore } from "../store/authStore";

export default function CoverImagepicker() {
   const { profile } = useAuthStore();

   const [uploading, setUploading] = useState(false);
   const [image, setImage] = useState<any>();
   const [uri, setUri] = useState<string | null>(null);

   const queryClient = useQueryClient();

   async function pickImage() {
      try {
         setUploading(true);
         let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ["images"],
            allowsMultipleSelection: false,
            quality: 1,
         });
         if (result.canceled || !result.assets || result.assets.length === 0) {
            console.log("User cancelled image picker.");
            return;
         }

         if (!result.canceled) {
            setImage(result.assets);
            setUri(result.assets[0].uri);
            return { status: true, uri: result.assets[0].uri };
         }
      } catch (error) {
         console.log(error);
      } finally {
         setUploading(false);
      }
   }

   const uploadImage = async (userId: string, imageUri: string, folder: string) => {
      try {
         const arraybuffer = await fetch(imageUri).then((res) => res.arrayBuffer());
         const fileExt = imageUri.split(".").pop()?.toLowerCase() ?? "jpeg";

         if (!userId) throw new Error("User not logged in.");

         const filename = `${userId}-${Date.now()}.${fileExt}`;
         const fullPath = `users/${userId}/${filename}`;

         const { error: uploadError } = await supabase.storage.from(folder).upload(fullPath, arraybuffer, {
            contentType: "image/jpeg",
            upsert: true,
         });

         if (uploadError) throw uploadError;

         const {
            data: { publicUrl },
         } = supabase.storage.from(folder).getPublicUrl(fullPath);

         return publicUrl;
      } catch (err) {
         console.error("Avatar upload failed", err);
         throw err;
      }
   };

   const handleCoverImage = useMutation({
      mutationFn: async (uri: string) => {
         const coverImage = await uploadImage(profile?.id, uri, "media");
         await updateProfile(profile?.id, { cover_photo: coverImage });
         return coverImage; // return uploaded URL
      },
      onSuccess: async (data) => {
         console.log("✅ Cover image updated:", data);
         await queryClient.invalidateQueries({ queryKey: ["profile", profile?.id] });
      },
      onError: (err) => {
         console.error("❌ Failed to upload cover image", err);
      },
   });

   const handleCoverImageChange = async () => {
      const picked = await pickImage();
      if (picked?.status && picked.uri) {
         handleCoverImage.mutate(picked.uri); // ✅ pass the uri here
      }
   };

   // const removeImage = (uriToRemove: string) => {
   //    setImage((prev) => prev.filter((img) => img.uri !== uriToRemove));
   // };

   // console.log(JSON.stringify(profile, null, 2));

   return (
      <View>
         <View style={styles.imageContainer}>
            <View
               style={{ backgroundColor: appColors.offWhite }}
               className="w-full h-48 rounded-lg justify-center items-center overflow-hidden"
            >
               {handleCoverImage.isPending && <ActivityIndicator />}
               {profile?.cover_photo && (
                  <Image
                     source={{ uri: profile?.cover_photo }}
                     transition={100}
                     style={{ width: "100%", height: "100%" }}
                     contentPosition="center"
                  />
               )}
               {uri && (
                  <Image
                     source={image.uri}
                     transition={100}
                     style={{ width: "100%", height: "100%", aspectRatio: image.width / image.height }}
                  />
               )}
               <TouchableOpacity
                  onPress={handleCoverImageChange}
                  style={{
                     borderWidth: 2,
                     borderColor: profile?.cover_photo || image ? appColors.white : appColors.black,
                  }}
                  className="w-24 h-24 rounded-full  justify-center items-center absolute"
               >
                  <PhotoIcon color={profile?.cover_photo || image ? appColors.white : appColors.black} />
               </TouchableOpacity>
            </View>
         </View>
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
