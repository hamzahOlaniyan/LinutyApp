import { useEffect, useState } from "react";

export default function useFetchNews({ url }: { url: string }) {
   const [data, setData] = useState([]);
   const [loading, setLoading] = useState(false);
   const [error, serError] = useState([]);

   useEffect(() => {
      async function getNews() {
         try {
            const res = await fetch(url);
            const news = res.json();
            setData(await news);
         } catch (error) {
            console.log("comething went swrong fetching news");
         }
      }

      getNews();
   }, []);

   return { data, error, loading };
}
