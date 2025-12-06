import { supabase } from "../../lib/supabase";

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

export async function deleteProduct(postId: string) {
   const res = await supabase.from("store").delete().eq("id", postId).single().throwOnError();
   return { success: true };
}

export async function updateProduct(postId: string, value: any) {
   const { error } = await supabase.from("store").update(value).eq("id", postId).single().throwOnError();

   return { error };
}

export const getStoreProductById = async (id: string) => {
   const { data, error } = await supabase
      .from("store")
      .select("* , profiles(id, firstName,lastName, avatarUrl, username)")
      .not("id", "is", null)
      .eq("id", id)
      .order("created_at", { ascending: false })
      .single()
      .throwOnError();
   return data;
};

export const getStoreProductByProfileId = async (profileId: string) => {
   console.log("Fetching products for profileId:", profileId);

   const { data, error } = await supabase
      .from("store")
      .select("*")
      .eq("profile_id", profileId)
      .order("created_at", { ascending: false })
      .throwOnError();

   if (error) {
      console.error("Error fetching products:", error);
   }
   return data;
};

export const createStore = async (profile_id: string) => {
   const { data, error } = await supabase.from("profiles").update({ hasStore: true }).eq("id", profile_id).select();
   return data;
};
