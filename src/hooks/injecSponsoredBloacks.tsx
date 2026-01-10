// export function injectSponsoredBlocks(
//   posts: Post,
//   products: any[],
//   interval = 5,
// ) {
//   if (!products?.length) return posts?.map((p) => ({ ...p, type: "post" }));

//   const merged: any[] = [];
//   let productIndex = 0;

//   posts?.forEach((post, index) => {
//     merged.push({ ...post, type: "post" });

//     if ((index + 1) % interval === 0) {
//       // pick a random block type
//       const blockType = ["product-single", "product-group", "info"][
//         Math.floor(Math.random() * 3)
//       ];

//       if (blockType === "product-single") {
//         merged.push({
//           type: "product-single",
//           item: products[productIndex],
//         });
//         productIndex = (productIndex + 1) % products?.length;
//       }

//       if (blockType === "product-group") {
//         const group: any[] = [];
//         for (let i = 0; i < 3; i++) {
//           group.push(products[productIndex]);
//           productIndex = (productIndex + 1) % products?.length;
//         }
//         merged.push({ type: "product-group", items: group });
//       }

//       if (blockType === "info") {
//         merged.push({
//           type: "info",
//           title: "Sponsored Info",
//           description: "This is an informational sponsored block.",
//         });
//       }
//     }
//   });

//   return merged;
// }
