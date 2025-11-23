import { supabase } from "../../lib/supabase";

const cache = new Map();

export const downloadImage = async (bucket: string, path: string): Promise<string> => {
   const key = `${bucket}/${path}`;
   if (cache.has(key)) return cache.get(key);

   const { data, error } = await supabase.storage.from(bucket).download(path);
   if (error) {
      console.error("Download error:", error);
      throw error;
   }

   const fr = new FileReader();
   return new Promise((resolve, reject) => {
      fr.readAsDataURL(data);
      fr.onload = () => {
         const result = fr.result as string;
         cache.set(key, result);
         resolve(result);
      };
      fr.onerror = reject;
   });
};
