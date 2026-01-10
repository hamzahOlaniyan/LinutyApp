  export type NewResponse = {

      article_id:string
       link:string
       title:string
       description:string
       content:string
       keywords:string[],
       creator: string[],
       language:string[],
       country:string[],
       category: string[] ,
       datatype:string
       pubDate:string
       pubDateTZ:string
       image_url:string
       video_url: null,
       source_id:string
       source_name:string
       source_priority: number,
       source_url:string
       source_icon:string
       sentiment:string,
       sentiment_statsNS:string,
       ai_tag:string
       ai_region:string
       ai_org:string
       ai_summary:string
       duplicate: number
  }
 