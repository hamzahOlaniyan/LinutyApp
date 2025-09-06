import { supabase } from "../lib/supabase";

export async function UploadImage(userId: string, imageUri: string, folder: string) {
   if (!imageUri.length) return;
   const uploadedPaths: string[] = [];

   for (const img of imageUri) {
      try {
         const arraybuffer = await fetch(img).then((res) => res.arrayBuffer());
         const fileExt = img.split(".").pop()?.toLowerCase() ?? "jpeg";

         if (!userId) throw new Error("User not logged in.");

         const filename = `${userId}-${Date.now()}.${fileExt}`;
         const fullPath = `users/${userId}/${filename}`;

         const { data, error: uploadError } = await supabase.storage.from(folder).upload(fullPath, arraybuffer, {
            contentType: "image/jpeg",
            upsert: true,
         });

         if (uploadError) {
            throw uploadError;
         }

         const {
            data: { publicUrl },
         } = supabase.storage.from(folder).getPublicUrl(fullPath);

         uploadedPaths.push(publicUrl);
      } catch (err) {
         console.error("Avatar upload failed", err);
         throw err;
      }
   }
   return uploadedPaths;
}
