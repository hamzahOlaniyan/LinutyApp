import { supabase } from "../lib/supabase";
import { ProductInput } from "../types/types";

export const getStoreProduct = async () => {
   const { data, error } = await supabase
      .from("store")
      .select("*")
      .order("created_at", { ascending: false })
      .throwOnError();
   return data;
};

export const createStoreProduct = async (newProduct: ProductInput) => {
   const { data } = await supabase.from("store").insert(newProduct).select("*").throwOnError();
   return data;
};

export const getStoreProductById = async (id: string) => {
   const { data, error } = await supabase
      .from("store")
      .select("*, profiles(full_name,avatar_url)")
      .not("id", "is", null)
      .eq("id", id)
      .single()
      .throwOnError();
   return data;
};

export const getStoreProductByProfileId = async (profileId: string) => {
   const { data, error } = await supabase
      .from("store")
      .select("*, profiles(full_name,avatar_url)")
      .eq("profileId", profileId)
      .order("created_at", { ascending: false })
      .throwOnError();
   return data;
};
