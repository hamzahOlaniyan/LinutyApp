// import { supabase } from "../lib/supabase";

// export async function UploadImage(userId: string, imageUri: string, folder: string) {
//    if (!imageUri.length) return;
//    const uploadedPaths: string[] = [];

//    for (const img of imageUri) {
//       try {
//          const arraybuffer = await fetch(img).then((res) => res.arrayBuffer());
//          const fileExt = img.split(".").pop()?.toLowerCase() ?? "jpeg";

//          if (!userId) throw new Error("User not logged in.");

//          const filename = `${userId}-${Date.now()}.${fileExt}`;
//          const fullPath = `users/${userId}/${filename}`;

//          const { data, error: uploadError } = await supabase.storage.from(folder).upload(fullPath, arraybuffer, {
//             contentType: "image/jpeg",
//             upsert: true,
//          });

//          if (uploadError) {
//             throw uploadError;
//          }

//          const {
//             data: { publicUrl },
//          } = supabase.storage.from(folder).getPublicUrl(fullPath);

//          uploadedPaths.push(publicUrl);
//       } catch (err) {
//          console.error("Avatar upload failed", err);
//          throw err;
//       }
//    }
//    return uploadedPaths;
// }

import { supabase } from "../lib/supabase";

export async function uploadMediaSmart(userId: string, uris: string[]) {
   if (!uris.length) return [];

   const uploadedUrls: { type: "image" | "video"; url: string }[] = [];

   for (const uri of uris) {
      try {
         // detect file extension and type
         const ext = uri.split(".").pop()?.toLowerCase() ?? "jpeg";
         const isVideo = ["mp4", "mov", "mkv", "avi"].includes(ext);
         const folder = isVideo ? "videos" : "media";
         const contentType = isVideo ? "video/mp4" : "image/jpeg";
         const fileName = `${userId}-${Date.now()}.${ext}`;
         const fullPath = `${folder}/${userId}/${fileName}`;

         if (isVideo) {
            // ✅ For large files: upload using signed URL (streamed upload)
            const { data: signedUrlData, error: signedErr } = await supabase.storage
               .from(folder)
               .createSignedUploadUrl(fullPath);

            if (signedErr) throw signedErr;

            const fileResponse = await fetch(uri);
            const blob = await fileResponse.blob();

            const uploadResponse = await fetch(signedUrlData.signedUrl, {
               method: "PUT",
               headers: { "Content-Type": contentType },
               body: blob,
            });

            if (!uploadResponse.ok) {
               throw new Error(`Failed to upload video: ${uploadResponse.statusText}`);
            }
         } else {
            // 🖼 For images: simple upload is fine
            const arrayBuffer = await fetch(uri).then((res) => res.arrayBuffer());
            const { error } = await supabase.storage.from(folder).upload(fullPath, arrayBuffer, {
               contentType,
               upsert: true,
            });

            if (error) throw error;
         }

         // get public URL after upload
         const { data: publicUrlData } = supabase.storage.from(folder).getPublicUrl(fullPath);

         uploadedUrls.push({
            type: isVideo ? "video" : "image",
            url: publicUrlData.publicUrl,
         });
      } catch (err) {
         console.error("Upload failed:", err);
         throw err;
      }
   }

   return uploadedUrls;
}
