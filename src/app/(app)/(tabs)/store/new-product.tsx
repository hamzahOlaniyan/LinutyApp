import NewListingHeader from "@/components/store/NewListingHeader";
import ProductImagePicker from "@/components/store/ProductImagePicker";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import InputArea from "@/components/ui/InputArea";
import Select from "@/components/ui/Select";
import { uploadMediaSmart } from "@/components/UploadImage";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Plus } from "@/icons/ico/plus";
import { createStore, createStoreProduct } from "@/Services/store";
import { useAuthStore } from "@/store/authStore";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const ProductCondition = ["new", "used - like", "used - good", "used - fair"];
export const ProductCategory = ["electrionic", "furniture", "vehicle", "other"];
const available = ["immediatly", "in a week", "in a month ", "other"];

export default function NewProduct() {
   const { profile } = useAuthStore();
   const [title, setTitle] = useState("");
   const [price, setPrice] = useState("");
   const [category, setCategory] = useState<string | null>(null);
   const [availability, setAvailability] = useState("");
   const [condition, setCondition] = useState<string | null>("");
   const [description, setDescription] = useState("");
   const [productImage, setProductImage] = useState<any[]>([]);
   const [resetPicker, setResetPicker] = useState(false);

   const queryClient = useQueryClient();
   const { bottom } = useSafeAreaInsets();

   const router = useRouter();

   // const uploadImage = async () => {
   //    if (!image.length) return;
   //    const uploadedPaths: string[] = [];

   //    for (const img of image) {
   //       try {
   //          const arrayBuffer = await fetch(img.uri).then((res) => res.arrayBuffer());
   //          const fileExt = img.uri.split(".").pop()?.toLowerCase() ?? "jpeg";

   //          if (!profile?.id) throw new Error("User not logged in.");

   //          const filename = `${Date.now()}.${fileExt}`;
   //          const fullPath = `users/${profile.id}/${filename}`;

   //          // const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${fileExt}`;

   //          // const { data, error } = await supabase.storage.from("store").upload(path, arrayBuffer, {
   //          //    contentType: img?.mimeType ?? "image/jpeg",
   //          // });

   //          const { data, error: uploadError } = await supabase.storage.from("store").upload(fullPath, arrayBuffer, {
   //             contentType: img.mimeType ?? "image/jpeg",
   //             upsert: true,
   //          });

   //          if (uploadError) throw uploadError;

   //          uploadedPaths.push(fullPath);
   //       } catch (err) {
   //          console.error("Failed to upload image:", err);
   //       }
   //    }
   //    return uploadedPaths;
   // };

   const { mutate, isPending, error } = useMutation({
      mutationFn: async () => {
         const imageRes = await uploadMediaSmart(profile.id, productImage as any, "store");

         return createStoreProduct({
            name: title,
            price: price,
            availability: availability,
            category: category,
            condition: condition,
            description: description,
            images: imageRes,
            profile_id: profile?.id,
         });
      },
      onSuccess: async () => {
         await createStore(profile?.id);
         Alert.alert("New products has been added");
         setTitle("");
         setCategory(null);
         setCondition(null);
         handleReset();
         setPrice("");
         setAvailability("");
         setDescription("");
         queryClient.invalidateQueries({ queryKey: ["store"] });
         router.back();
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   const handleReset = () => {
      setProductImage([]);
      setResetPicker(true);
      // Optional: turn it off after triggering reset so it can be reused
      setTimeout(() => setResetPicker(false), 100);
   };

   return (
      <ScrollView
         decelerationRate={0.8}
         className="relative"
         style={{ paddingHorizontal: wp(3), backgroundColor: appColors.white, marginBottom: bottom }}
      >
         {/* <View className="flex-row items-center"> */}
         <View className="w-full flex-row relative justify-center items-center">
            <NewListingHeader image={profile?.avatarUrl} firstName={profile?.firstName} lastName={profile?.lastName} />
            <Button
               text="Publish"
               onPress={() => mutate()}
               icon={<Plus color={appColors.blue} />}
               color={appColors.blue}
               variant="secondary"
               size="sm"
               disabled={isPending}
               isLoading={isPending}
            />
         </View>
         <ProductImagePicker onPickLocal={(uri: []) => setProductImage(uri)} reset={resetPicker} />
         <View style={{ paddingBottom: 200, paddingTop: 30 }} className="gap-4 flex-1">
            <AppText weight="semi">Product Information</AppText>
            <Input placeholder="Title" value={title} onChangeText={setTitle} inputMode="text" />
            <Input
               placeholder="Price"
               value={price}
               onChangeText={setPrice}
               keyboardType="numeric"
               inputMode="numeric"
            />
            <Select
               options={ProductCategory}
               onSelect={(val: any) => setCategory(val)}
               placeholder="Category"
               modalTitle="Category"
               selectedValue={category}
            />
            <Select
               options={ProductCondition}
               selectedValue={condition}
               onSelect={(val: any) => setCondition(val)}
               placeholder="Condition"
               modalTitle="Condition"
            />
            <Select
               options={available}
               onSelect={(val: any) => setAvailability(val)}
               selectedValue={availability}
               placeholder="availability"
               modalTitle="Availability"
            />
            <InputArea placeholder="Description" value={description} onChangeText={setDescription} inputMode="text" />

            <View className="">
               <AppText>
                  Store items are public and can be seen by anyone on Linuty. Store listing must not decriminate.
               </AppText>
            </View>
         </View>
      </ScrollView>
   );
}
