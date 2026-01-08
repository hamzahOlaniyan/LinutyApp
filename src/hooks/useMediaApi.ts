import { MediaFile } from "../../types/supabaseTypes";
import { useApiQuery } from "./useApi";

export class MediaApi  {

    static getMedia(profileId:string){
      const {data} =   useApiQuery<MediaFile[]>(`/media/${profileId}`, undefined,{enabled:!!profileId})
      return data
    }
}