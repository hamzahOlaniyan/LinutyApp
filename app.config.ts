import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = process.env.APP_VARIANT || "development";

    const baseExtra = {
    EXPO_PUBLIC_SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL,
    EXPO_PUBLIC_SUPABASE_ANON_KEY: process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY,
    EXPO_PUBLIC_PROD_API_URL: process.env.EXPO_PUBLIC_PROD_API_URL,
    EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_ENDPOINT_URL,
    eas: { projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015" },
  };

  const baseConfig = {
    ...config,
    name: "LinutyApp",
    slug: "LinutyApp",
    version: "2.0.0",
    orientation: "portrait",
    icon: "./src/assets/images/icon.png",
    scheme: "linutyapp",
    userInterfaceStyle: "automatic",
    newArchEnabled: true,
    splash: {
      image: "./src/assets/images/logo.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },

    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.hamzaholaniyan.linuttydev",
    },
    android: {
      adaptiveIcon: {
        backgroundImage: "./src/assets/images/adaptive-icon.png",
      },
      edgeToEdgeEnabled: true,
      softwareKeyboardLayoutMode: "pan",
      versionCode: 41,
    },
    web: {
      bundler: "metro",
      output: "static",
    },
    plugins: ["expo-router"],
    experiments: {
      typedRoutes: true,
    },
    extra: baseExtra,
    runtimeVersion: {
      policy: "appVersion"
    },

    owner: "hamzaholaniyan",
    updates: {
      url: "https://u.expo.dev/9ba15d7e-509f-4f7c-ae54-827330c67015",
    },
  };

  if (variant === "development") {
    return {
      ...baseConfig,
      name: "Linuty Dev",
      android: {
        ...baseConfig.android,
        package: "com.hamzaholaniyan.linutydev", 
        versionCode: 15, 
      },
      ios: { "bundleIdentifier": "com.hamzaholaniyan.linutydev" }
    } as ExpoConfig;
  }

  if (variant === "preview") {
    return {
      ...baseConfig,
      name: "Linuty Preview",
      android: {
        ...baseConfig.android,
        package: "com.hamzaholaniyan.linuttypreview", 
        versionCode: 20, 
      },
      ios: { "bundleIdentifier": "com.hamzaholaniyan.linutypreview" },
      extra: {
        ...baseExtra, 
      },
    } as ExpoConfig;
  }

  return baseConfig as ExpoConfig;
};
