import { supabase } from "../lib/supabase";

//
export async function uploadMediaSmart(
   userId: string,
   files: {
      uri?: string;
      url?: string;
      mimeType?: string;
      height?: string | number;
      width?: string | number;
      duration?: string;
      fileName?: string;
      size?: string | number;
      type: "image" | "video";
   }[],
   folder: string
) {
   if (!files?.length) return [];

   const uploadedUrls: {
      type: "image" | "video";
      url: string;
      height?: string | number;
      width?: string | number;
      duration?: string;
      fileName?: string;
      mimeType?: string;
      size?: string | number;
   }[] = [];

   for (const file of files) {
      try {
         const uri = file?.uri || file?.url;
         if (!uri) continue;

         // If the file already has a public URL (no need to re-upload)
         if (uri.startsWith("http")) {
            uploadedUrls.push({
               type: file?.type || "image",
               url: uri,
               height: file?.height,
               width: file?.width,
               duration: file?.duration,
               fileName: file?.fileName,
               mimeType: file?.mimeType,
               size: file?.size,
            });
            continue;
         }

         // Extract extension
         const ext = (file?.fileName?.split(".").pop() || uri.split(".").pop() || "jpeg").toLowerCase();
         const isVideo = ["mp4", "mov", "mkv", "avi"].includes(ext);
         const contentType = file?.mimeType || (isVideo ? "video/mp4" : "image/jpeg");
         const fileName = `${userId}-${Date.now()}.${ext}`;
         const fullPath = `${folder}/${userId}/${fileName}`;

         // Upload logic
         if (isVideo) {
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
            const arrayBuffer = await fetch(uri).then((res) => res.arrayBuffer());
            const { error } = await supabase.storage.from(folder).upload(fullPath, arrayBuffer, {
               contentType,
               upsert: true,
            });

            if (error) throw error;
         }

         // Get public URL
         const { data: publicUrlData } = supabase.storage.from(folder).getPublicUrl(fullPath);

         uploadedUrls.push({
            type: isVideo ? "video" : "image",
            url: publicUrlData.publicUrl,
            height: file?.height,
            width: file?.width,
            duration: file?.duration,
            fileName,
            mimeType: file?.mimeType,
            size: file?.size,
         });
      } catch (err) {
         console.error("Upload failed:", err);
         // continue instead of throwing — prevents breaking batch upload
         continue;
      }
   }

   return uploadedUrls;
}
