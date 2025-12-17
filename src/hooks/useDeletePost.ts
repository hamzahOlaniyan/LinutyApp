import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "./useApi";

export const useDeletePost= (postId: string) => {

type CursorPage<T> = { data: T[]; nextCursor: string | null };
type Post = { id: string };


  const qc = useQueryClient();

  return useApiMutation<{ message: string }, void>(
    "delete",
    `/post/${postId}`,
    {
      onSuccess: () => {
        qc.setQueryData<CursorPage<Post>>(["/feed"], (old) => {
          if (!old?.data) return old;
          return { ...old, data: old.data.filter((p: any) => p.id !== postId) };
        });

        qc.invalidateQueries({ queryKey: ["/feed"] });
      }
    }
  );
};
