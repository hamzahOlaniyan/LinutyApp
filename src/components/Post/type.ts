
export type PostVisibility = "PUBLIC" | "FOLLOWERS" | "LINEAGE_ONLY" | "PRIVATE";

// export type PostListItem = {
//   id: string;
//   profileId: string;
//   content: string | null;
//   visibility: "PUBLIC" | "FOLLOWERS" | "LINEAGE_ONLY" | "PRIVATE";
//   locationText: string | null;
//   lineageId: string | null;
//   createdAt: string;
//   updatedAt: string;
//   commentCount: number;
//   likeCount: number;
//   shareCount: number;
// };
export type PostCardProps = {
  post: FeedPost;
  likeCount?: number;
  commentCount?:number;
};

// export type PostCardProps = {
//   post: FeedPost;
// };


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

// export type Author = {
//   id: string;
//   username?: string | null;
//   firstName?: string | null;
//   lastName?: string | null;
//   avatarUrl?: string | null;
// };

// export type CommentResponse = {
//   id: string;
//   profileId: string;
//   content: string | null;
//   visibility: PostVisibility;
//   locationText: string | null;
//   lineageId: string | null;
//   commentCount: number;
//   likeCount: number;
//   shareCount: number;
//   createdAt: string;
//   updatedAt: string;

//   author: FeedAuthor;
//   mediaFiles: FeedMediaFile[];
//   lineage: FeedLineage | null;
//   _count: {
//     comments: number;
//     reactions: number;
//   };
// };

// export type FeedResponse = {
//   data: FeedPost[];
//   nextCursor: string | null;
// };



// export type MediaFile = {
//   id: string;
//   url?: string | null; // adjust if your field name differs
//   type?: string | null; // "IMAGE" | "VIDEO" etc (optional)
// };

// export type Post = {
//   id: string;
//   content?: string | null; // adjust if yours is "text" or "caption"
//   createdAt: string | Date;
//   visibility?: string | null;
//   author: Author;
//   mediaFiles?: MediaFile[];
//   _count?: {
//     comments: number;
//     reactions: number;
//   };
// };

// export type Props = {
//   post: FeedPost;

//   onOpenPost?: (postId: string) => void;
//   onOpenAuthor?: (authorId: string) => void;
//   onOpenMedia?: (postId: string, startIndex?: number) => void;

//   onLike?: (postId: string) => void;
//   onOpenComments?: (postId: string) => void;
//   onMore?: (postId: string) => void;
// };


// export type CommentType = {
//   id: string;
//   postId: string;
//   profileId: string;
//   content: string;
//   parentId: string | null;
//   createdAt: string;
//   updatedAt: string;
//   author: {
//     id: string;
//     username: string | null;
//     firstName: string | null;
//     lastName: string | null;
//     avatarUrl: string | null;
//   };
//   _count?: { replies: number };
// };





export type CursorResponse<T> = {
  data: T[];
  nextCursor: string | null;
};

export type CommentAuthor = {
  id: string;
  username: string | null;
  firstName: string | null;
  lastName: string | null;
  avatarUrl: string | null;
};

export type PostComment = {
  id: string;
  postId: string;
  profileId: string;
  content: string;
  parentCommentId: string | null;
  created_at: string;
  updatedAt: string;
  author: CommentAuthor;
  likeCount:number;
  _count?: { replies: number };
};

export type ReplyingTo = { parentCommentId: string; name: string } | null;
// export type CommentItemTypes = {
//   comment: PostComment; // top-level
//   onReply: (parent: { id: string; name: string }) => void;
// };


// export type UiComment = DbComment & {
//   author?: CommentAuthor;
//   _count?: { replies: number };

//   created_at: string;
//   parentId: string | null;
// };



