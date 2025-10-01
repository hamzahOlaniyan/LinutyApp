export async function fetchNews() {
   const url = "https://newsdata.io/api/1/latest?apikey=pub_de7765bb83e347169f3daaff819a3049&q=somalia";

   const res = await fetch(url);
   if (!res.ok) {
      throw new Error(`Failed to fetch news: ${res.status}`);
   }

   return res.json();
}
