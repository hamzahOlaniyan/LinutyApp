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


export class PostApi {

  static useGetPostById = (postId: string) => {
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<PostResponse>(`/post/${postId}`,{enabled: !!accessToken}
    );
    return { isLoading, data, error, isFetching, refetch, };
  };


  static useCreatePost =  () => {
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
  };

  // static usePostUpdate =  (postId: string) => {
  //   const qc = useQueryClient();
  //     return useApiMutation< PostInput>("patch", `/post/${postId}`, {
  //       onSuccess: () => {
  //         qc.setQueryData<CursorPage<Post>>(["/feed", `/post/${postId}`], old => {
  //           if (!old?.data) return old;
  //           return { ...old, data: old.data.filter(p => p.id !== postId) };
  //         });

  //         qc.invalidateQueries({ queryKey: ["/feed", `/post/${postId}`] });
  //       }
  //     });
  // };

  // 1) PATCH content
  static useUpdatePostContent = (postId: string) =>
    useApiMutation<PostResponse, { content: string | null }>(
      "patch",
      `/post/${postId}`
    );

// 2) POST media (add new images after upload)
  static useAddPostMedia = (postId: string) =>
    useApiMutation<MediaFile[], AddMediaPayload>(
      "post",
      `/post/${postId}/media`
    );

  // 3) DELETE media
  // static useDeleteMedia = () => {
  //   useApiMutation<void, { mediaId: string }>(
  //     "delete",
  //     ({ mediaId }) => `/media/${mediaId}` // if your mutation supports route as fn
  //   );
  // }
  

  static useDeletePost =  (postId: string) => {
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
  };

  static useMyPostReactionQuery =  (postId: string) => {
    return useApiQuery<MyReactionResponse>(`/post/${postId}/reactions/me`);
  };

  static usePostReactionMutation =  (postId: string) => {
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
  };

  static useGetMediaByPostId = (postId:string)=>{
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 
    const { data, isLoading,  refetch, error , isFetching}= useApiQuery<MediaFile[]>(`/post/${postId}/media`,undefined,{enabled:!!accessToken && !!postId});
    return{data,isLoading, refetch, error, isFetching}
  }
}
 