import { PostInput } from "@/lib/supabase/supabaseTypes";
import { useQueryClient } from "@tanstack/react-query";
import { useApiMutation } from "./useApi";

type CursorPage<T> = { data: T[]; nextCursor: string | null };
type Post = { id: string };

const qc = useQueryClient();

export const useCreatePost = () => {
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
