import NewListingHeader from "@/components/store/NewListingHeader";
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
import { createStoreProduct } from "@/Services/db/store";
import { useAuthStore } from "@/store/authStore";
import { useProductFormState } from "@/store/useProductFormState";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFocusEffect, useRouter } from "expo-router";
import React, { useCallback, useState } from "react";
import { Alert, ScrollView, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { createStore } from "zustand";

export const ProductCondition = ["new", "used - like", "used - good", "used - fair"];
export const ProductCategory = ["electrionic", "furniture", "vehicle", "other"];
export const available = ["immediatly", "in a week", "in a month ", "other"];

export default function NewProduct() {
   const { profile } = useAuthStore();
   const { form, errors, updateField, setError, resetErrors, resetForm } = useProductFormState();

   const [productImage, setProductImage] = useState<any[]>([]);
   const [resetPicker, setResetPicker] = useState(false);
   const [loading, setLoading] = useState(false);

   const queryClient = useQueryClient();
   const { bottom } = useSafeAreaInsets();

   const router = useRouter();

   console.log(JSON.stringify(form, null, 2));

   const { mutate, isPending, error } = useMutation({
      mutationFn: async () => {
         const imageRes = await uploadMediaSmart(profile.id, form.image as any, "store");
         {
            return createStoreProduct({
               name: form.name,
               price: form.price,
               availability: form.availability,
               category: form.category,
               condition: form.condition,
               description: form.description,
               images: imageRes,
               profile_id: profile?.id,
            });
         }
      },
      // onMutate: async () => {
      //    queryClient.invalidateQueries({ queryKey: ["store"] });
      // },
      onSuccess: async () => {
         queryClient.invalidateQueries({ queryKey: ["store"] });

         if (!profile?.hasStore) {
            await createStore(profile?.id);
         }

         handleReset();
         Alert.alert("New products has been added", "", [{ text: "OK", onPress: () => router.back() }]);
      },
      onError: (error) => Alert.alert("Error", error.message),
   });

   useFocusEffect(
      useCallback(() => {
         return () => {
            resetForm();
         };
      }, [])
   );

   const handleFormValidation = () => {
      let valid = true;

      setLoading(true);
      if (form.image.length < 1) {
         setError("image", "A minium of 1 image is require!");
         valid = false;
      }

      if (!form.name) {
         setError("name", "name is required!");
         valid = false;
      }
      if (!form.price) {
         setError("price", "price is required!");
         valid = false;
      }
      if (!form.description) {
         setError("description", "description is required!");
         valid = false;
      }
      if (!form.category) {
         setError("category", "category is required!");
         valid = false;
      }
      if (!form.condition) {
         setError("condition", "condition is required!");
         valid = false;
      }
      if (!form.availability) {
         setError("availability", "availability is required!");
         valid = false;
      }
      if (valid) {
         mutate();
         setLoading(false);
      }
   };

   const handleReset = () => {
      setProductImage([]);
      setResetPicker(true);
      resetErrors();
      resetForm();
      setTimeout(() => setResetPicker(false), 100);
   };

   return (
      <ScrollView
         decelerationRate={0.8}
         className="relative"
         style={{ paddingHorizontal: wp(4), backgroundColor: appColors.white, marginBottom: bottom }}
      >
         <View className="w-full flex-row relative justify-center items-center">
            <NewListingHeader image={profile?.avatarUrl} firstName={profile?.firstName} lastName={profile?.lastName} />
            <Button
               text="Publish"
               onPress={handleFormValidation}
               icon={<Plus color={appColors.blue} />}
               color={appColors.blue}
               variant="secondary"
               size="sm"
               isLoading={isPending}
            />
         </View>
         <ProductImagePicker onPickLocal={(uri: []) => updateField("image", uri)} reset={resetPicker} />

         {!!errors.image && (
            <View className="my-4">
               <AppText color={appColors.error}>*{errors.image}</AppText>
            </View>
         )}

         <View style={{ paddingBottom: 100 }} className="justify-between relative mt-6">
            <View className="gap-4">
               <AppText weight="semi">Product Information</AppText>
               <Input
                  placeholder="Title"
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
   );
}
