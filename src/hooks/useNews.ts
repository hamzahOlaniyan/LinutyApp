import { useQuery } from "@tanstack/react-query";
import { fetchNews } from "../lib/api";

export function useNews() {
   return useQuery({
      queryKey: ["news"], // ✅ unique per query/country
      queryFn: () => fetchNews(),
   });
}
