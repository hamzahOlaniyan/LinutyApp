import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
   const variant = process.env.APP_VARIANT || "development";

   const baseConfig = {
      ...config,
      name: "LinutyApp",
      slug: "LinutyApp",
      version: "1.0.6",
      orientation: "portrait",
      icon: "./assets/images/icon.png",
      scheme: "linutyapp",
      userInterfaceStyle: "automatic",
      newArchEnabled: true,

      ios: {
         supportsTablet: true,
      },
      android: {
         adaptiveIcon: {
            backgroundImage: "./assets/images/adaptive-icon.png",
         },
         edgeToEdgeEnabled: true,
      },
      web: {
         bundler: "metro",
         output: "static",
      },
      plugins: [
         "expo-router",
         [
            "expo-splash-screen",
            {
               backgroundColor: "#ffffff",
               image: "./assets/images/white.png",
            },
         ],
      ],
      experiments: {
         typedRoutes: true,
      },
      extra: {
         supabaseUrl: process.env.EXPO_PUBLIC_SUPABASE_URL,
         supabaseAnonKey: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
         router: {},
         eas: {
            projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
         },
      },
      owner: "hamzaholaniyan",
      runtimeVersion: {
         policy: "appVersion" as const,
      },
      updates: {
         url: "https://u.expo.dev/9ba15d7e-509f-4f7c-ae54-827330c67015",
      },
   };

   // Apply variant-specific settings
   if (variant === "development") {
      return {
         ...baseConfig,
         name: "Linuty Dev",
         android: {
            ...baseConfig.android,
            package: "com.hamzaholaniyan.linuttydev", // unique package name
            versionCode: 15, // increment this only when updating dev build
         },
      } as ExpoConfig;
   }

   if (variant === "preview") {
      return {
         ...baseConfig,
         name: "Linuty Preview",
         android: {
            ...baseConfig.android,
            package: "com.hamzaholaniyan.linuttypreview", // unique package name
            versionCode: 20, // increment this only when updating preview build
         },
      } as ExpoConfig;
   }

   return baseConfig as ExpoConfig;
};
