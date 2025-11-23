import ProductImagePicker from "@/components/store/ProductImagePicker";
import AppText from "@/components/ui/AppText";
import Button from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { InputArea } from "@/components/ui/InputArea";
import Select from "@/components/ui/Select";
import { uploadMediaSmart } from "@/components/UploadImage";
import { appColors } from "@/constant/colors";
import { wp } from "@/constant/common";
import { Plus } from "@/icons/ico/plus";
import { getStoreProductById, updateProduct } from "@/Services/db/store";
import { useAuthStore } from "@/store/authStore";
import { useProductFormState } from "@/store/useProductFormState";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";
import { available, ProductCategory, ProductCondition } from "../../new-product";

export default function EditPost() {
   const { id, type } = useLocalSearchParams<{ id?: string; type: string }>();
   // const params = useLocalSearchParams();

   const router = useRouter();

   const { profile } = useAuthStore();
   const queryClient = useQueryClient();
   const [resetPicker, setResetPicker] = useState(false);

   const { form, errors, updateField, setError, resetErrors, resetForm } = useProductFormState();

   const { bottom } = useSafeAreaInsets();

   // const [content, setContent] = useState("");
   const [preview, setPreview] = useState<any[]>([]);

   const { data, error, isFetching } = useQuery({
      queryKey: ["store", id],
      queryFn: () => getStoreProductById(id as string),
      enabled: !!id && !!type,
   });

   useEffect(() => {
      if (data) {
         updateField("name", data.name);
         updateField("price", data.price);
         updateField("category", data.category);
         updateField("condition", data.condition);
         updateField("availability", data.availability);
         updateField("description", data.description);
         updateField("image", data.images);
      }
   }, [data]);

   const { mutate, isPending } = useMutation({
      mutationFn: async () => {
         const mediaRes = await uploadMediaSmart(profile?.id, form.image, "store");
         await updateProduct(id as string, {
            name: form.name,
            price: form.price,
            category: form.category,
            condition: form.condition,
            availability: form.availability,
            description: form.description,
            images: mediaRes,
         });
      },

      onSuccess: () => {
         Alert.alert("Success", "Post updated!", [
            {
               onPress: () => router.back(),
            },
         ]);
         queryClient.invalidateQueries({ queryKey: ["store", id] });
      },
      onError: (error) => {
         console.log("❌ couldnt update post", error.cause, error.message);
      },
   });

   return (
      <SafeAreaView style={{ backgroundColor: appColors.white, marginBottom: bottom }}>
         <ScrollView showsHorizontalScrollIndicator={false} className="relative">
            <View
               style={{ paddingHorizontal: wp(4) }}
               className="w-full flex-row relative justify-between items-center"
            >
               <Button
                  text="Cancel"
                  onPress={() => router.back()}
                  variant="secondary"
                  size="sm"
                  isLoading={isPending}
               />
               <Button
                  text="Update"
                  onPress={() => mutate()}
                  icon={<Plus color={appColors.success} />}
                  color={appColors.success}
                  variant="secondary"
                  size="sm"
                  isLoading={isPending}
               />
            </View>
            <View style={{ paddingLeft: wp(4) }}>
               <ProductImagePicker
                  onPickLocal={(uri: []) => updateField("image", uri)}
                  reset={resetPicker}
                  value={form.image}
               />
            </View>

            {!!errors.image && (
               <View className="my-4">
                  <AppText color={appColors.error}>*{errors.image}</AppText>
               </View>
            )}

            <View style={{ paddingHorizontal: wp(4), paddingBottom: 100 }} className="justify-between relative mt-6">
               <View className="gap-4">
                  <AppText weight="semi">Product Information</AppText>
                  <Input
                     placeholder="name"
                     value={form.name}
                     onChangeText={(name) => updateField("name", name)}
                     inputMode="text"
                     error={!!errors.name}
                     errorMessage={errors.name}
                  />
                  <Input
                     placeholder="Price"
                     value={form.price as any}
                     onChangeText={(price) => updateField("price", price)}
                     keyboardType="numeric"
                     inputMode="numeric"
                     error={!!errors.price}
                     errorMessage={errors.price}
                  />
                  <Select
                     options={ProductCategory}
                     onSelect={(category: string) => updateField("category", category)}
                     placeholder="Category"
                     modalTitle="Category"
                     selectedValue={form.category}
                     error={!!errors.category}
                     errorMessage={errors.category}
                  />
                  <Select
                     options={ProductCondition}
                     selectedValue={form.condition}
                     onSelect={(condition: string) => updateField("condition", condition)}
                     placeholder="Condition"
                     modalTitle="Condition"
                     error={!!errors.condition}
                     errorMessage={errors.condition}
                  />
                  <Select
                     options={available}
                     selectedValue={form.availability}
                     onSelect={(available: string) => updateField("availability", available)}
                     placeholder="availability"
                     modalTitle="Availability"
                     error={!!errors.availability}
                     errorMessage={errors.availability}
                  />
                  <InputArea
                     placeholder="Description"
                     value={form.description}
                     onChangeText={(description: string) => updateField("description", description)}
                     inputMode="text"
                     error={!!errors.description}
                     errorMessage={errors.description}
                  />
               </View>

               <View className="mt-20">
                  <AppText size="sm" color={appColors.blue}>
                     Store items are public and can be seen by anyone on Linuty. Store listing must not decriminate.
                  </AppText>
               </View>
            </View>
         </ScrollView>
      </SafeAreaView>
   );
}
