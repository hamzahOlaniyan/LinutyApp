import { Database, TablesInsert } from "../src/lib/supabase/database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];

export type PostResponse = Database["public"]["Tables"]["Post"]["Row"];
export type PostInput = TablesInsert<"Post">


export type Comment = Database["public"]["Tables"]["Comment"]["Row"];

export type CommentInput = TablesInsert<"Comment">;

export type MediaInput = TablesInsert<"MediaFile">;

export type MediaFile = Database["public"]["Tables"]["MediaFile"]["Row"]



