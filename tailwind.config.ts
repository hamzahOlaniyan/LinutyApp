/** @type {import('tailwindcss').Config} */

module.exports = {
  darkMode: process.env.DARK_MODE ? process.env.DARK_MODE : "media",
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/core-components/**/**/*.{html,js,jsx,ts,tsx}",
    "./src/components/**/*.{html,js,jsx,ts,tsx,mdx}",
    "./src/hooks/**/*.{html,js,jsx,ts,tsx,mdx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        text: "#262626",
      },
      fontFamily: {
          Black: ["Black"],
          ExtraBold: ["ExtraBold"],
          Bold: ["Bold"],
          SemiBold: ["SemiBold"],
          Medium: ["Medium"],
          Regular: ["Regular"],
          Light:[ "Light"],
      },

      fontSize: {
        "2xs": "10px",
      },
    },
  },
  plugins: [],
};
