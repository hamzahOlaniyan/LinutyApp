// import { useQueryClient } from "@tanstack/react-query";
// import { useApiMutation } from "./useApi";

// export const usePostUpdate= (postId: string) => {

// type CursorPage<T> = { data: T[]; nextCursor: string | null };
// type Post = { id: string };


//   const qc = useQueryClient();

//   return useApiMutation<{ postId: string }, void>(
//     "patch",
//     `/post/${postId}`,
//     {
//       onSuccess: () => {
//         qc.setQueryData<CursorPage<Post>>(["/feed"], (old) => {
//           if (!old?.data) return old;
//           return { ...old, data: old.data.filter((p) => p.id !== postId) };
//         });

//         qc.invalidateQueries({ queryKey: ["/feed", `/post/${postId}`] });

//       }
//     }
//   );
// };
