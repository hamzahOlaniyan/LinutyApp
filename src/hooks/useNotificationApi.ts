import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";

export const NotificationApi = {

     getNotificationCount(profileId:string){
        const { session } = useAuthStore();
        const accessToken = session?.access_token; 
        const {data} = useApiQuery('/notifications/count', undefined,{enabled:!!accessToken && !!profileId})
        return {data}
    }

}as const