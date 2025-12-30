import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { MediaFile, PostInput, PostResponse } from "../../types/supabaseTypes";
import { useApiMutation, useApiQuery } from "./useApi";


type CursorPage<T> = { data: T[]; nextCursor: string | null };
type Post = { id: string };

export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "ANGRY" | "SAD" | null;

type ReactToPostParams = {
  type?: ReactionType; // default server-side is LIKE
};

export type MyReactionResponse = {
  liked: boolean;
  type: ReactionType;
};

type ReactToPostResponse =
  | { message: string; reacted: true; reaction: { type: ReactionType } }
  | { message: string; reacted: false };

  type AddMediaPayload = {
  images: Array<{
    url: string;
    mimeType?: string;
    sizeBytes?: number;
    width?: number | null;
    height?: number | null;
  }>;
};


export const PostApi =  {
  

  useGetPostById (postId: string){
    const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<PostResponse>(`/post/${postId}`,{enabled: !!accessToken}
    );
    return { isLoading, data, error, isFetching, refetch, };
  },


  createPost(){
    const qc = useQueryClient();
      return useApiMutation<PostInput>("post", "/post", {
        onSuccess: res => {
          const newPost = res;
          // Put it at the top of the feed immediately
          qc.setQueryData<CursorPage<Post>>(["/feed"], old => {
            if (!old) return { data: [newPost], nextCursor: null };
            return {
              ...old,
              data: [newPost, ...(old.data ?? [])]
            };
          });
          // Still refetch in background to sync counts/cursors
          qc.invalidateQueries({ queryKey: ["/feed"] });
        }
      });
  },


  updatePostContent(postId: string){
    return useApiMutation<PostResponse, { content: string | null }>(
       "patch",
       `/post/${postId}`
     )
  },

  addPostMedia(postId: string){
     return useApiMutation<MediaFile[], AddMediaPayload>(
       "post",
       `/post/${postId}/media`
     )
  },

  deletePost(postId: string){
    const qc = useQueryClient();
      return useApiMutation<{ message: string }, void>(
        "delete",
        `/post/${postId}`,
        {
          onSuccess: () => {
            qc.setQueryData<CursorPage<Post>>(["/feed"], old => {
              if (!old?.data) return old;
              return { ...old, data: old.data.filter(p => p.id !== postId) };
            });

            qc.invalidateQueries({ queryKey: ["/feed"] });
          }
        }
      );
  },

  getMyReaction(postId: string){
    return useApiQuery<MyReactionResponse>(`/post/${postId}/reactions/me`);
  },

  addReaction(postId: string){
    return useApiMutation<ReactToPostResponse, ReactToPostParams>(
      "post",
      `/post/${postId}/reactions`,
      {
        invalidateKeys: [
          "/post/feed", // if your feed shows counts
          `/post/${postId}`, // post details screen
          `/post/${postId}/reactions` // if you have a "who reacted" list
        ]
      }
    );
  },

   getPostMedia(postId:string){
    const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading,  refetch, error , isFetching}= useApiQuery<MediaFile[]>(`/post/${postId}/media`,undefined,{enabled:!!accessToken && !!postId});
    return{data,isLoading, refetch, error, isFetching}
  }
} as const
 