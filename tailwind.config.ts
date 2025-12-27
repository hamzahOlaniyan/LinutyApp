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
          primary: "#1e9187",
          text: "#000000",
          secondary: "#2C3437",
          error: "#b22323",
          white: "#fff",
          background: "#e1e7e5",
          grey: "#ccc",
          dark_whitesmoke: "#f1f1f1",
          whitesmoke: "#f5f5f5",
          offWhite: "#f7f7f7",
          placeholder: "#767f86",
          // icon: "#505050",
          icon: "#677179",
          border: "#ccc",
          bordersLight: "#e8edeb",

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
        "xsmall": ["8px", "16px"],
        "small": ["12px", "24px"],
      },
    },
  },
  plugins: [],
};
