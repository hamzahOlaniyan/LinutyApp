import { supabase } from "../lib/supabase";

export async function uploadAvatar(userId: string, imageUri: string) {
   try {
      const arraybuffer = await fetch(imageUri).then((res) => res.arrayBuffer());
      const fileExt = imageUri.split(".").pop()?.toLowerCase() ?? "jpeg";

      if (!userId) throw new Error("User not logged in.");

      const filename = `${userId}-${Date.now()}.${fileExt}`;
      const fullPath = `users/${userId}/avatars/${userId}/${filename}`;

      //    const { data, error: uploadError } = await supabase.storage.from("avatars").upload(fullPath, arraybuffer, {
      //       contentType: image.mimeType ?? "image/jpeg",
      //       upsert: true,
      //    });

      //   if (uploadError) throw uploadError;

      const {
         data: { publicUrl },
      } = supabase.storage.from("avatars").getPublicUrl(fullPath);

      console.log("PUBLIC URL FROM UPLOAD_AVATAR", publicUrl);

      // 4. Save to profile
      //   const { error: updateError } = await supabase.from("profiles").update({ avatar_url: publicUrl }).eq("id", userId);

      //   if (updateError) throw updateError;

      return publicUrl;
   } catch (err) {
      console.error("Avatar upload failed", err);
      throw err;
   }
}
