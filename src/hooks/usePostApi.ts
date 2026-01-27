import { reactionsItem } from "@/components/Post/type";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { MediaFile, PostInput, PostResponse } from "../../types/supabaseTypes";
import { useApiMutation, useApiQuery } from "./useApi";
import { FeedEnvelope } from "./useFeedQuery";


type CursorPage<T> = { data: T[]; nextCursor: string | null };

export type Post = { 
  id: string, 
  likeCount: number;
  viewerHasLiked?: boolean };

export type ReactionType = "LIKE" | "LOVE" | "LAUGH" | "ANGRY" | "SAD" | null;

type ReactToPostParams = {
  type?: ReactionType; // default server-side is LIKE
};

type FeedWithPosts = {
  posts: Post[];
};

export type MyReactionResponse = {
  liked: boolean;
  type: ReactionType | null;
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

type ReactionCtx = {
  prevFeed?: unknown;
  prevPost?: unknown;
};



export const PostApi =  {

  useGetPostById (postId: string){
    const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<PostResponse>(`/post/${postId}`,{enabled: !!accessToken}
    );
    return { isLoading, data, error, isFetching, refetch, };
  },

  getPostCreator(postId:string){
     const { session } = useAuthStore();
    const accessToken = session?.access_token; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<{profileId:string}>(`/post/${postId}/creatorId`,{enabled: !!accessToken}
    );
    return { isLoading, data, error, isFetching, refetch, };
  },

  createPost(){
    const qc = useQueryClient();
      return useApiMutation<PostInput>("post", "/post", {
        onSuccess: res => {
          const newPost = res;
          // Put it at the top of the feed immediately
          qc.setQueryData(["/feed"], (old:FeedEnvelope) => {
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

  getReactions(postId: string){
    return useApiQuery<reactionsItem[]>(`/post/${postId}/reaction`);
  },

  getMyReaction(postId: string){
    return useApiQuery<MyReactionResponse>(`/post/${postId}/reactions/me`);
  },

  addReaction(postId: string) {
    const qc = useQueryClient();
    return useApiMutation<ReactToPostResponse, ReactToPostParams, ReactionCtx>(
      "post",
      `/post/${postId}/reactions`,
      {
        onMutate: async () => {
          // 1) stop outgoing fetches so we don't overwrite our optimistic update
          await qc.cancelQueries({ queryKey: ["/feed"] });
          await qc.cancelQueries({ queryKey: [`/post/${postId}`] });

          // 2) snapshot previous values (for rollback)
          const prevFeed = qc.getQueryData<FeedEnvelope>(["/feed"]);
          const prevPost = qc.getQueryData<FeedEnvelope>([`/post/${postId}`]);

          // 3) optimistic update: toggle likeCount
          const applyToggle = (p: Post |undefined):Post|undefined => {
            if (!p) return p;

            // assume your API toggles LIKE
            const alreadyLiked = !!p.viewerHasLiked; // add this field if you can
            const nextLiked = !alreadyLiked;

            return {
              ...p,
              viewerHasLiked: nextLiked,
              likeCount: Math.max(0, (p.likeCount ?? 0) + (nextLiked ? 1 : -1)),
            };
          };

          qc.setQueryData<Post>([`/post/${postId}`], (old) => applyToggle(old));

          qc.setQueryData(["/feed"], (old:FeedWithPosts) => {
            if (!old) return old;

            if (Array.isArray(old?.posts)) {
              return {
                ...old,
                posts: old.posts.map((p) => (p.id === postId ? applyToggle(p) : p)),
              };
            }

            // if (Array.isArray(old?.pages)) {
            //   return {
            //     ...old,
            //     pages: old.pages.map((page: any) => ({
            //       ...page,
            //       posts: (page.posts ?? []).map((p: any) => (p.id === postId ? applyToggle(p) : p)),
            //     })),
            //   };
            // }

            return old;
          });

          return { prevFeed, prevPost };
        },

        onError: (_err, _vars, ctx) => {
          // rollback on failure
          if (ctx?.prevFeed) qc.setQueryData(["/feed"], ctx.prevFeed);
          if (ctx?.prevPost) qc.setQueryData([`/post/${postId}`], ctx.prevPost);
        },

        onSettled: () => {
          // re-sync with server truth
          qc.invalidateQueries({ queryKey: ["/feed"] });
          qc.invalidateQueries({ queryKey: [`/post/${postId}`] });
          qc.invalidateQueries({ queryKey: [`/post/${postId}/reactions`] });
        },
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
 