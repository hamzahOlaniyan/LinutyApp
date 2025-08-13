/** @type {import('tailwindcss').Config} */
module.exports = {
   // NOTE: Update this to include the paths to all files that contain Nativewind classes.
   content: [
      "./src/**/*.{js,jsx,ts,tsx}",
      "./src/core-components/**/**/*.{html,js,jsx,ts,tsx}",
      "./src/components/**/*.{html,js,jsx,ts,tsx,mdx}",
      "./src/hooks/**/*.{html,js,jsx,ts,tsx,mdx}",
   ],
   presets: [require("nativewind/preset")],
   theme: {
      extend: {},
   },
   plugins: [],
};
