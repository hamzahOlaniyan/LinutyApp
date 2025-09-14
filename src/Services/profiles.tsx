// import { TablesUpdate } from "@/supabase/types/database.types";
import { supabase } from "../lib/supabase";

export const getProfiles = async (id: any) => {
   const { data, count } = await supabase
      .from("profiles")
      .select("id, username, firstName,lastName, avatarUrl", { count: "exact" })
      .neq("id", id)
      .throwOnError();
   return { data, count };
};

export const getProfileById = async (id: string) => {
   const { data } = await supabase.from("profiles").select("*").eq("id", id).single().throwOnError();
   return data;
};

export const updateProfile = async (id: string, updateProfile: any) => {
   const { data } = await supabase
      .from("profiles")
      .update(updateProfile)
      .eq("id", id)
      .throwOnError()
      .select("*")
      .maybeSingle();
   return data;
};
