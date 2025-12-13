import { Database } from "./database.types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];

export type Post = Database["public"]["Tables"]["Post"]["Row"];

export type Comment = Database["public"]["Tables"]["Comment"]["Row"];

