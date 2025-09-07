import { supabase } from "../lib/supabase";
// import { ProductInput } from "../types/types";

export const getStoreProduct = async () => {
   const { data, error } = await supabase
      .from("store")
      .select("*")
      .order("created_at", { ascending: false })
      .throwOnError();
   return data;
};

export const createStoreProduct = async (newProduct: any) => {
   const { data } = await supabase.from("store").insert(newProduct).select("*").throwOnError();
   return data;
};

export const getStoreProductById = async (id: string) => {
   const { data, error } = await supabase
      .from("store")
      .select("* , profiles(firstName,lastName, avatarUrl, username)")
      .not("id", "is", null)
      .eq("id", id)
      .order("created_at", { ascending: false })
      .single()
      .throwOnError();
   return data;
};

export const getStoreProductByProfileId = async (id: string) => {
   const { data, error } = await supabase
      .from("store")
      .select("* , profiles(firstName,lastName, avatarUrl, username)")
      .not("id", "is", null)
      .eq("profileId", id)
      .order("created_at", { ascending: false })
      .throwOnError();
   return data;
};
