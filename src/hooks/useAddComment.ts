// import { useApiMutation } from "./useApi";

// export const useAddComment = (postId: string) => {
//   return useApiMutation<{ content: string; parentId?: string }>(
//     "post",
//     `/post/${postId}/comment`,
//     {
//       invalidateKeys: [`/post/${postId}/comment`, `/post/${postId}`] // adjust to your invalidation logic
//     }
//   );
// };
