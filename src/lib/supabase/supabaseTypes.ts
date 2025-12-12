import { Database } from "./types";

export type Profile = Database["public"]["Tables"]["profile"]["Row"];

export type Post = Database["public"]["Tables"]["Post"]["Row"];
