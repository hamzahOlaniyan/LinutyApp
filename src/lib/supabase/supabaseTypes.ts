import { Database, TablesInsert } from "./database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];

export type Post = Database["public"]["Tables"]["Post"]["Row"];
export type PostInput = TablesInsert<"Post">


export type Comment = Database["public"]["Tables"]["Comment"]["Row"];

export type CommentInput = TablesInsert<"Comment">;

export type MediaInput = TablesInsert<"MediaFile">;



