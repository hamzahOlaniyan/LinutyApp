export type PostWithUser = Database["public"]["Tables"]["posts"]["Row"] & {
  user: Database["public"]["Tables"]["profiles"]["Row"];
  postLikes: Database["public"]["Tables"]["postLikes"]["Row"][];
  comments: { count: number }[];
};

export type PostLike = Database["public"]["Tables"]["postLikes"]["Row"];

export type PostType = Database["public"]["Tables"]["posts"]["Row"];

export type PostWithUser = Database["public"]["Tables"]["posts"]["Row"] & {
  user: Database["public"]["Tables"]["profiles"]["Row"];
  postLikes: Database["public"]["Tables"]["postLikes"]["Row"][];
  comments: { count: number }[];
};

export type PostLike = Database["public"]["Tables"]["postLikes"]["Row"];

export type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

export type AuthContextType = {
  user: User | null;
  isAuthenticated: boolean;
  isVerified: boolean;
  profile: Tables<"profiles"> | null;
  otpUserEmail: string | null;
  setOtpUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
  isAuthReady: boolean;
};

export type PostInput = TablesInsert<"posts">;
export type CommentInput = TablesInsert<"comments">;
export type RelationshipInput = TablesInsert<"relationships"> & UserProfile;

export type ProductInput = TablesInsert<"store">;
