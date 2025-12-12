export type PostVisibility = "PUBLIC" | "FOLLOWERS" | "LINEAGE_ONLY" | "PRIVATE";

export type PostListItem = {
  id: string;
  profileId: string;
  content: string | null;
  visibility: "PUBLIC" | "FOLLOWERS" | "LINEAGE_ONLY" | "PRIVATE";
  locationText: string | null;
  lineageId: string | null;
  createdAt: string;
  updatedAt: string;
  commentCount: number;
  likeCount: number;
  shareCount: number;
};


export type FeedAuthor = {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

export type FeedMediaFile = {
  id: string;
  postId: string;
  type: "IMAGE" | "VIDEO" | string;
  url: string;
  mimeType: string | null;
  width: number | null;
  height: number | null;
  sizeBytes: number | null;
  createdAt: string;
  updatedAt: string;
};

export type FeedLineage = {
  id: string;
  name: string;
  primarySurname: string | null;
  rootVillage: string | null;
};

export type FeedPost = {
  id: string;
  profileId: string;
  content: string | null;
  visibility: PostVisibility;
  locationText: string | null;
  lineageId: string | null;
  commentCount: number;
  likeCount: number;
  shareCount: number;
  createdAt: string;
  updatedAt: string;

  author: FeedAuthor;
  mediaFiles: FeedMediaFile[];
  lineage: FeedLineage | null;
  _count: {
    comments: number;
    reactions: number;
  };
};

export type FeedResponse = {
  data: FeedPost[];
  nextCursor: string | null;
};

export type Author = {
  id: string;
  username?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  avatarUrl?: string | null;
};

export type MediaFile = {
  id: string;
  url?: string | null; // adjust if your field name differs
  type?: string | null; // "IMAGE" | "VIDEO" etc (optional)
};

export type Post = {
  id: string;
  content?: string | null; // adjust if yours is "text" or "caption"
  createdAt: string | Date;
  visibility?: string | null;
  author: Author;
  mediaFiles?: MediaFile[];
  _count?: {
    comments: number;
    reactions: number;
  };
};

// export type Props = {
//   post: Post;
//   onPress?: (post: Post) => void;
//   onPressLike?: (post: Post) => void;
//   onPressComment?: (post: Post) => void;
// };

// type Props = { post: PostListItem };
export type Props = {
  post: FeedPost;

  onOpenPost?: (postId: string) => void;
  onOpenAuthor?: (authorId: string) => void;
  onOpenMedia?: (postId: string, startIndex?: number) => void;

  onLike?: (postId: string) => void;
  onOpenComments?: (postId: string) => void;
  onMore?: (postId: string) => void;
};
