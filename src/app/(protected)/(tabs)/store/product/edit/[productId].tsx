import { LocalMedia } from "@/app/(protected)/create-post";
import { Font } from "@/assets/fonts/FontFamily";
import { FeedProduct } from "@/components/Feed/types";
import {
  countries,
  productAvailabilty,
  productCategory,
  productCondition
} from "@/components/Product/categories";
import AppText from "@/components/ui/AppText";
import FormInput from "@/components/ui/FormInput";
import { FormDataType } from "@/components/ui/FormInput/types";
import ScreenView from "@/components/ui/Layout/ScreenView";
import { appColors } from "@/constant/colors";
import { hp } from "@/constant/common";
import { ProductApi } from "@/hooks/useProductApi";
import Icon from "@/icons";
import { api } from "@/lib/api";
import { supabase } from "@/lib/supabase/supabase";
import { useAuthStore } from "@/store/useAuthStore";
import { useFormStore } from "@/store/useFormStore";
import { useQueryClient } from "@tanstack/react-query";
import { randomUUID } from "expo-crypto";
import { Image } from "expo-image";
import * as ImagePicker from "expo-image-picker";
import {
  useFocusEffect,
  useLocalSearchParams,
  useNavigation
} from "expo-router";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import {
  ActivityIndicator,
  FlatList,
  Pressable,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View
} from "react-native";
import {
  ProductAvailabilty,
  ProductCondition,
  ProductInput,
  ProductStatus
} from "../../../../../../../types/supabaseTypes";
import { AdFormField } from "../../create-product";

type EditableMedia = {
  id: string;
  url?: string; // remote
  uri?: string; // local
  mimeType: string;
  width?: number | null;
  height?: number | null;
  sizeBytes?: number;
  size?: number;
  isLocal: boolean;
  remoteId?: string; // optional if your local item id differs
};

export const cities = [{ label: "london", value: "london" }];

export default function EditProductScreen() {
  const { me } = useAuthStore();
  const { resetForm, formData } = useFormStore();
  const setFormData = useFormStore(s => s.setFormData);

  const { productId } = useLocalSearchParams<{ productId?: string }>();

  const { data: productData } = ProductApi.useGetProductById(productId ?? "");
  const { data: mediaFiles } = ProductApi.useGetProductMediaById(
    productId ?? ""
  );

  const initialValues = useMemo(() => {
    const p = productData?.data; // depends on your API shape
    if (!p) return null;

    return {
      title: p.title ?? "",
      price: p.price != null ? String(p.price) : "", // ✅ string
      description: p.description ?? "",
      currency: p.currency ?? "",
      condition: p.condition ?? "",
      category: p.category ?? "",
      availability: p.availability ?? "",
      negotiable: p.negotiable ? "true" : "false", // ✅ if your form store is string-based
      status: p.status ?? "",
      locationText: p.locationText ?? "",
      city: p.city ?? "",
      district: p.district ?? "",
      country: p.country ?? "",
      lat: p.lat != null ? String(p.lat) : "", // ✅ string (if stored in form)
      lng: p.lng != null ? String(p.lng) : ""
    } satisfies Partial<FormDataType>;
  }, [productData]);

  useEffect(() => {
    if (!initialValues) return;
    setFormData(initialValues);
  }, [initialValues, setFormData]);

  const updateContent = ProductApi.useUpdateProductContent(productId ?? "");
  const addMedia = ProductApi.useAddProductMedia(productId ?? "");

  const [product, setProduct] = useState<FeedProduct | null>(null);
  const [media, setMedia] = useState<EditableMedia[]>([]);
  const [deletedMediaIds, setDeletedMediaIds] = useState<string[]>([]);
  const [dirty, setDirty] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation();
  const qc = useQueryClient();
  const savedRef = useRef(false);

  useFocusEffect(
    useCallback(() => {
      savedRef.current = false;

      return () => {
        if (!savedRef.current) {
          // discard drafts
          setDirty(false);
          setDeletedMediaIds([]);
          if (productData?.data) setProduct(productData.data);
          if (mediaFiles)
            setMedia(mediaFiles.map(m => ({ ...m, isLocal: false })));
        }
      };
    }, [productData, mediaFiles])
  );

  useEffect(() => {
    if (product && !dirty) setProduct(product);
  }, [product, dirty]);

  useEffect(() => {
    if (mediaFiles && !dirty) {
      setMedia(mediaFiles.map(m => ({ ...m, isLocal: false })));
    }
  }, [mediaFiles, dirty]);

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

    setDirty(true);
    setMedia(prev => [
      ...prev,
      ...result.assets.map(a => ({
        id: randomUUID(),
        uri: a.uri,
        mimeType: a.mimeType ?? "image/jpeg",
        width: a.width,
        height: a.height,
        size: a.fileSize,
        isLocal: true
      }))
    ]);
  };

  const removeImage = (id: string) => {
    setMedia(prev => {
      const found = prev.find(m => m.id === id);
      if (found && !found.isLocal) setDeletedMediaIds(d => [...d, id]);
      return prev.filter(m => m.id !== id);
    });
    setDirty(true);
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
    if (!productId || !me?.id) return;

    const content: Partial<ProductInput> = {
      title: formData?.title,
      description: formData?.description,
      price: Number(formData?.price),
      currency: formData?.currency,
      condition: formData?.condition as ProductCondition,
      category: formData?.category,
      availability: formData?.availability as ProductAvailabilty,
      negotiable: formData?.negotiable === "true",
      status: formData?.status as ProductStatus,
      locationText: formData?.locationText,
      city: formData?.city,
      district: formData?.district,
      country: formData?.country
      // lat: formData?.lat  as string,
      // lng: formData?.lng as string
    };

    const localItems = media.filter(m => m.isLocal);
    // const values = formData as unknown as Partial<AdFormField>;

    if (!dirty) return;
    if (!content && media.length === 0) return;

    setLoading(true);

    try {
      // 1) PATCH content
      await updateContent.mutateAsync(content);

      // 2) DELETE removed remote media
      await Promise.all(
        deletedMediaIds.map(id => api.delete(`/product/media/${id}`))
      );

      // 3) Upload locals -> POST /post/:id/media
      if (localItems.length) {
        const uploaded = await Promise.all(
          localItems.map(f =>
            uploadImage({ uri: f.uri!, mimeType: f.mimeType }, me.id)
          )
        );
        // uploaded should return { url, mimeType, sizeBytes, width, height }
        await addMedia.mutateAsync({ images: uploaded });
      }

      await qc.invalidateQueries({ queryKey: [`/product/${productId}`] });
      await qc.invalidateQueries({ queryKey: [`/product/${productId}/media`] });
      await qc.invalidateQueries({ queryKey: ["/product/feed"] });

      savedRef.current = true;
      setDirty(false);
      setDeletedMediaIds([]);

      resetForm();
      setMedia([]);
      navigation.goBack();
    } catch (err) {
      console.error(err);
      console.log("product Update post", err);
    } finally {
      setLoading(false);
    }
  };

  const renderMediaItem = useCallback(
    ({ item }: { item: EditableMedia }) => (
      <View style={{ position: "relative" }}>
        <Image
          source={{ uri: item.isLocal ? item.uri! : item.url! }}
          style={{ width: 90, height: 90, borderRadius: 12 }}
        />
        <Pressable
          onPress={() => removeImage(item.id)}
          hitSlop={10}
          style={s.removeBtn}
        >
          <Icon name="close" color="white" />
        </Pressable>
      </View>
    ),
    [removeImage]
  );

  return (
    <ScreenView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: appColors.white
        }}
      >
        {media.length > 0 && (
          <FlatList
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ gap: 10, paddingVertical: 10 }}
            data={media}
            keyExtractor={item => item.id}
            renderItem={renderMediaItem}
          />
        )}

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
          onChangeAnyField={() => setDirty(true)}
        />
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

const s = StyleSheet.create({
  input: {
    fontSize: hp(2),
    fontFamily: Font.Regular,
    color: appColors.text
  },
  removeBtn: {
    position: "absolute",
    top: 6,
    right: 6,
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.6)"
  }
});
