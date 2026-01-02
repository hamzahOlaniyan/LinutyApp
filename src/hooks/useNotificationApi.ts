import { Author, PostShortInfo } from "@/components/Post/type";
import { useAuthStore } from "@/store/useAuthStore";
import { useApiQuery } from "./useApi";

export type NotificationEnvelope = {
  data: NotificationWithRelations[];
};



export type NotificationWithRelations = Notification & {
  sender: Author | null;
  post: PostShortInfo | null;
  comment: PostShortInfo | null;
  message: string | null;
  isRead?:boolean;
  created_at: Date,
  type?: string,
  postId?:string,
  commentId?:string
};

export const NotificationApi = {

     getNotificationCount(profileId:string){
        const { session } = useAuthStore();
        const accessToken = session?.access_token; 
        const {data} = useApiQuery('/notifications/count', undefined,{enabled:!!accessToken && !!profileId})
        return {data}
    },

     getMyNotifications(profileId:string){
        const { session } = useAuthStore();
        const accessToken = session?.access_token; 
        const {data} = useApiQuery<NotificationEnvelope>('/notifications', undefined,{enabled:!!accessToken && !!profileId})
        return {data}
    }

}as const