import { CommentAuthor, PostComment } from "@/components/Post/type";
import { Comment } from "./supabaseTypes";

export function mapCommentToPostComment(
  comment: Comment,
  author: CommentAuthor
): PostComment {
  return {
    id: comment.id,
    postId: comment.postId,
    profileId: comment.profileId,
    content: comment.content,
    parentId: comment.parentCommentId,
    created_at: comment.createdAt,
    updatedAt: comment.updatedAt,
    author,
  };
}