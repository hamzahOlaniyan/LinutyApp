//  type PostWithUser = Database["public"]["Tables"]["posts"]["Row"] & {
//   user: Database["public"]["Tables"]["profiles"]["Row"];
//   postLikes: Database["public"]["Tables"]["postLikes"]["Row"][];
//   comments: { count: number }[];
// };

//  type PostLike = Database["public"]["Tables"]["postLikes"]["Row"];

//  type PostType = Database["public"]["Tables"]["posts"]["Row"];

//  type PostWithUser = Database["public"]["Tables"]["posts"]["Row"] & {
//   user: Database["public"]["Tables"]["profiles"]["Row"];
//   postLikes: Database["public"]["Tables"]["postLikes"]["Row"][];
//   comments: { count: number }[];
// };

//  type PostLike = Database["public"]["Tables"]["postLikes"]["Row"];

//  type UserProfile = Database["public"]["Tables"]["profiles"]["Row"];

//  type AuthContextType = {
//   user: User | null;
//   isAuthenticated: boolean;
//   isVerified: boolean;
//   profile: Tables<"profiles"> | null;
//   otpUserEmail: string | null;
//   setOtpUserEmail: React.Dispatch<React.SetStateAction<string | null>>;
//   isAuthReady: boolean;
// };

//  type PostInput = TablesInsert<"posts">;
//  type CommentInput = TablesInsert<"comments">;
//  type RelationshipInput = TablesInsert<"relationships"> & UserProfile;

//  type ProductInput = TablesInsert<"store">;
