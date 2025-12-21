import FormHeader from "@/components/Ad/FormHeader";
import {
  productAvailabilty,
  productCategory,
  productCondition
} from "@/components/Product/categories";
import AppText from "@/components/ui/AppText";
import FormInput from "@/components/ui/FormInput";
import { Field } from "@/components/ui/FormInput/types";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { appColors } from "@/constant/colors";
import { COUNTRIES } from "@/data/ProfileData";
import { ProductApi } from "@/hooks/useProductApi";
import Icon from "@/icons";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { randomUUID } from "expo-crypto";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "expo-router";
import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  TouchableOpacity,
  View
} from "react-native";
import { LocalMedia } from "../../create-post";

export type FormValues = {
  title: string;
  price: number;
  description: string;
  category: string;
  condition: string;
  availability: string;
  country: string;
  city: string;
};

export type AdFormField = Omit<Field, "name"> & {
  name: keyof FormValues;
};

export const cities = [{ label: "london", value: "london" }];

export default function Post_Add_screen() {
  const { formData, resetForm } = useFormStore();
  const { me } = useAuthStore();

  const createProductMutation = ProductApi.useCreateProduct();

  // const [toastVisible, setToastVisible] = useState(false);
  // const [toastMessage, setToastMessage] = useState<string | React.ReactNode>(
  //   ""
  // );
  // const [toastDuration, setToastDuration] = useState(DEFAULT_TOAST_DURATION);
  const [media, setMedia] = useState<LocalMedia[]>([]);
  const [loading, setLoading] = useState(false);

  // console.log(JSON.stringify(formData, null, 2));

  // const showToast = (msg: string | React.ReactNode) => {
  //   setToastMessage(msg);
  //   setToastVisible(true);
  // };

  const countries = COUNTRIES.map(c => c).flatMap(i => [
    { label: i, value: i }
  ]);

  // const router = useRouter();
  const navigation = useNavigation();

  const AdForm: AdFormField[] = [
    {
      name: "title",
      placeholder: "Product name",
      type: "text",
      mode: "text",
      required: true
    },
    {
      name: "price",
      placeholder: "price",
      type: "number",
      mode: "text",
      required: true
    },
    {
      name: "description",
      placeholder: "description",
      type: "text",
      mode: "text",
      required: true
    },
    {
      name: "category",
      placeholder: "category",
      mode: "select",
      required: true,
      selectOptions: productCategory,
      selectOptionsTitle: "select category"
    },
    {
      name: "condition",
      placeholder: "condition",
      mode: "select",
      required: true,
      selectOptions: productCondition,
      selectOptionsTitle: "condition"
    },
    {
      name: "availability",
      placeholder: "availability",
      mode: "select",
      required: true,
      selectOptions: productAvailabilty,
      selectOptionsTitle: "availability"
    },
    {
      name: "country",
      placeholder: "country",
      required: true,
      mode: "select",
      selectOptions: countries,
      selectOptionsTitle: "select country"
    },
    {
      name: "city",
      placeholder: "city",
      mode: "select",
      selectOptions: cities,
      selectOptionsTitle: "select your city",
      required: true
    }
  ];

  const pickImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsMultipleSelection: true,
      quality: 0.8
    });

    if (result.canceled) return;

    const selected = result.assets.map(asset => ({
      id: randomUUID(),
      uri: asset.uri,
      mimeType: asset.mimeType ?? "image/jpeg",
      width: asset.width,
      height: asset.height,
      size: asset.fileSize
    }));

    setMedia(prev => [...prev, ...selected]);
  };

  const removeImage = (id: string) => {
    setMedia(prev => prev.filter(m => m.id !== id));
  };

  async function uploadImage(file: LocalMedia, userId: string) {
    const fileExt = file.uri.split(".").pop() || "jpg";
    const filePath = `products/${userId}/${Date.now()}-${file.id}.${fileExt}`;

    const response = await fetch(file.uri);

    // ✅ works in RN + TS
    const arrayBuffer = await response.arrayBuffer();
    const fileData = new Uint8Array(arrayBuffer);

    const { error } = await supabase.storage
      .from("product-image")
      .upload(filePath, fileData, {
        contentType: file.mimeType,
        upsert: false
      });

    if (error) throw error;

    const { data } = supabase.storage
      .from("product-image")
      .getPublicUrl(filePath);

    return {
      url: data.publicUrl,
      mimeType: file.mimeType,
      type: "IMAGE" as const,
      width: file.width,
      height: file.height,
      sizeBytes: fileData.byteLength
    };
  }

  const handleSubmit = async () => {
    console.log("clicked");
    const values = formData as unknown as Partial<AdFormField>;

    try {
      setLoading(true);

      if (!me?.id || !values) {
        console.error("No authenticated user");
        setLoading(false);
        return;
      }

      // 1️⃣ Upload media first
      let uploadedMedia;

      if (!formData && media.length === 0) {
        setLoading(false);
        return;
      }

      if (media.length > 0) {
        uploadedMedia = await Promise.all(
          media.map(file => uploadImage(file, me.id))
        );
      }

      // 2️⃣ Create post
      await createProductMutation.mutateAsync(
        {
          title: formData.title,
          description: formData.description,
          price: Number(formData.price),
          currency: formData.currency,
          condition: formData.condition,
          category: formData.category,
          availability: formData.availability,
          negotiable: formData.negotiable,
          status: formData.status,
          locationText: formData.locationText,
          city: formData.city,
          district: formData.district,
          country: formData.country,
          lat: formData.lat,
          lng: formData.lng,
          images: uploadedMedia
        },
        {
          onSuccess: async () => console.log("✅ new Product has been created"),
          onError: async error =>
            console.log("something whent wrong", error.message)
        }
      );
      resetForm();
      setMedia([]);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      console.log("Failed to create post", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <ScreenView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: appColors.white
        }}
      >
        <View>
          <FormHeader
            firstName={me?.firstName ?? ""}
            lastName={me?.lastName ?? ""}
            avatarUrl={me?.avatarUrl ?? ""}
          />
          <FlatList
            horizontal
            data={media}
            // keyExtractor={(item: LocalMedia, index: number) => index}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            renderItem={({ item }) => (
              <View style={{ position: "relative" }}>
                <Image
                  source={{ uri: item.uri }}
                  style={{
                    width: 90,
                    height: 90,
                    borderRadius: 12
                  }}
                />

                {/* delete button */}
                <Pressable
                  onPress={() => removeImage(item.id as string)}
                  hitSlop={10}
                  style={{
                    position: "absolute",
                    top: 6,
                    right: 6,
                    width: 24,
                    height: 24,
                    borderRadius: 12,
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "rgba(0,0,0,0.6)"
                  }}
                >
                  <AppText style={{ color: "white", fontSize: 14 }}>✕</AppText>
                </Pressable>
              </View>
            )}
          />
          {media.length > 0 && (
            <View className="my-2">
              <AppText
                color={appColors.placeholder}
              >{`Photos: ${media.length}/5, Choose your listing's main photo first`}</AppText>
            </View>
          )}
          <View className="elevation-sm p-2">
            <TouchableOpacity onPress={pickImages}>
              {loading ? (
                <ActivityIndicator />
              ) : (
                <Icon name="add_image" size={32} />
              )}
            </TouchableOpacity>
          </View>
          <AppText>Product Information</AppText>

          <FormInput
            fields={AdForm}
            onSubmit={handleSubmit}
            submitBtnLabel={"send"}
            loading={loading}

            // loading={isLoading || sendingVerificationEmail}
            // customButton={
            //   <TouchableOpacity className="absolute -top-[10rem] right-3 justify-center rounded-lg border p-2">
            //     {loading ? (
            //       <ActivityIndicator />
            //     ) : (
            //       <AppText>+ post add</AppText>
            //     )}
            //   </TouchableOpacity>
            // }
          />
        </View>
        <View className="mt-20">
          <AppText>
            Store items are public and can be seen by anyone on Linuty. Store
            listing must not decriminate.
          </AppText>
        </View>
      </ScrollView>
    </ScreenView>
  );
}
