import { Database, TablesInsert } from './database.types';

export type Profile = Database["public"]["Tables"]["profile"]["Row"];
export type ProfileInput = TablesInsert<"profile">;


export type PostResponse = Database["public"]["Tables"]["Post"]["Row"];
export type PostInput = TablesInsert<"Post">


export type Comment = Database["public"]["Tables"]["Comment"]["Row"];

export type CommentInput = TablesInsert<"Comment">;

export type MediaInput = TablesInsert<"MediaFile">;
export type MediaFile = Database["public"]["Tables"]["MediaFile"]["Row"]

export type ProductTable = Database["public"]["Tables"]["Product"]["Row"]
export type ProductInput= TablesInsert<"Product">


export type ProductMediaTable = Database["public"]['Tables']["ProductMedia"]["Row"]
export type ProductMediaInput = TablesInsert<"ProductMedia">

export type Product = Database["public"]["Tables"]["Product"]["Row"]
export type  ProductCondition = Database["public"]['Enums']["ProductCondition"]
export type  ProductAvailabilty = Database["public"]['Enums']['Available']
export type  ProductStatus= Database["public"]['Enums']["ListingStatus"]








