import { FeedProduct } from "@/components/Feed/types";
import { useAuthStore } from "@/store/useAuthStore";
import { useQueryClient } from "@tanstack/react-query";
import { Product, ProductInput } from "../../types/supabaseTypes";
import { useApiMutation, useApiQuery } from "./useApi";


type FeedEnvelope = {
  data: FeedProduct;
  nextCursor: string | null;
};

type CursorPage<T> = { data: T[]; nextCursor: string | null };

export class ProductApi {

  static useGetProductById = (productId: string|null) => {
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 
    const { data, isLoading, error, isFetching, refetch, }= useApiQuery<FeedEnvelope>(`/product/${productId}`,{enabled: !!accessToken}
    );
    return { isLoading, data, error, isFetching, refetch, };
  };

  static useCreateProduct =  () => {
    const qc = useQueryClient();
      return useApiMutation<ProductInput>('post', "/product", {
        onSuccess: res => {
          const newProduct = res;
          qc.setQueryData<CursorPage<ProductInput>>(["/feed"], old => {
            if (!old) return { data: [newProduct], nextCursor: null };
            return {
              ...old,
              data: [newProduct, ...(old.data ?? [])]
            };
          });
          qc.invalidateQueries({ queryKey: ["/feed"] });
        }
      });
  };

  static useGetProductFeed = ()=>{
    const { session } = useAuthStore();
    const accessToken = session?.accessToken; 

     const { data, isLoading, error, isFetching, refetch, } = useApiQuery<FeedEnvelope>(
        '/product/feed',
      undefined,
        {
          enabled: !!accessToken,
        }
      );
      return{data,isLoading,error,isFetching,refetch}
  }

  static useDeleteProduct=  (productId: string|null) => {
    const qc = useQueryClient();
      return useApiMutation<{ message: string }, void>(
        "delete",
        `/product/${productId}`,
        {
          onSuccess: () => {
            qc.setQueryData<CursorPage<Product>>(["/feed"], old => {
              if (!old?.data) return old;
              return { ...old, data: old.data.filter(p => p.id !== productId) };
            });

            qc.invalidateQueries({ queryKey: ["/feed"] });
          }
        }
      );
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
  // static useUpdatePostContent = (postId: string) =>
  //   useApiMutation<PostResponse, { content: string | null }>(
  //     "patch",
  //     `/post/${postId}`
  //   );

// 2) POST media (add new images after upload)
  // static useAddPostMedia = (postId: string) =>
  //   useApiMutation<MediaFile[], AddMediaPayload>(
  //     "post",
  //     `/post/${postId}/media`
  //   );

  // 3) DELETE media
  // static useDeleteMedia = () => {
  //   useApiMutation<void, { mediaId: string }>(
  //     "delete",
  //     ({ mediaId }) => `/media/${mediaId}` // if your mutation supports route as fn
  //   );
  // }
  

//   static useDeletePost =  (postId: string) => {
//     const qc = useQueryClient();
//       return useApiMutation<{ message: string }, void>(
//         "delete",
//         `/post/${postId}`,
//         {
//           onSuccess: () => {
//             qc.setQueryData<CursorPage<Post>>(["/feed"], old => {
//               if (!old?.data) return old;
//               return { ...old, data: old.data.filter(p => p.id !== postId) };
//             });

//             qc.invalidateQueries({ queryKey: ["/feed"] });
//           }
//         }
//       );
//   };

//   static useMyPostReactionQuery =  (postId: string) => {
//     return useApiQuery<MyReactionResponse>(`/post/${postId}/reactions/me`);
//   };

//   static usePostReactionMutation =  (postId: string) => {
//     return useApiMutation<ReactToPostResponse, ReactToPostParams>(
//       "post",
//       `/post/${postId}/reactions`,
//       {
//         invalidateKeys: [
//           "/post/feed", // if your feed shows counts
//           `/post/${postId}`, // post details screen
//           `/post/${postId}/reactions` // if you have a "who reacted" list
//         ]
//       }
//     );
//   };

//   static useGetMediaByPostId = (postId:string)=>{
//     const { session } = useAuthStore();
//     const accessToken = session?.accessToken; 
//     const { data, isLoading,  refetch, error , isFetching}= useApiQuery<MediaFile[]>(`/post/${postId}/media`,undefined,{enabled:!!accessToken && !!postId});
//     return{data,isLoading, refetch, error, isFetching}
//   }
}
 