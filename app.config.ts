import "dotenv/config";
import { ConfigContext, ExpoConfig } from "expo/config";

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = process.env.APP_VARIANT || "development";

  const baseConfig = {
    ...config,
    name: "LinutyApp",
    slug: "LinutyApp",
    version: "1.3.0",
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
    extra: {
      EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_PROD_API_URL,
      eas: {
        projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
      },
    },
    owner: "hamzaholaniyan",

    runtimeVersion: "1.0.0",

    updates: {
      url: "https://u.expo.dev/9ba15d7e-509f-4f7c-ae54-827330c67015",
    },
  };

  if (variant === "development") {
    return {
      ...baseConfig,
      name: "Linuty Dev",
      extra: {
        EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_ENDPOINT_URL,
        eas: {
          projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
      },
    },
      android: {
        ...baseConfig.android,
        package: "com.hamzaholaniyan.linuttydev",
        versionCode: 15, // increment this only when updating dev build
      },
      ios: { "bundleIdentifier": "com.hamzaholaniyan.linuttydev" }
    } as ExpoConfig;
  }

  if (variant === "preview") {
    return {
      ...baseConfig,
      name: "Linuty Preview",
       extra: {
        EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_PROD_API_URL,
        eas: {
          projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
        },
    },
      android: {
        ...baseConfig.android,
        package: "com.hamzaholaniyan.linuttypreview", // unique package name
        versionCode: 20, // increment this only when updating preview build
      },
      ios: { "bundleIdentifier": "com.hamzaholaniyan.linuttypreview" }

    } as ExpoConfig;
  }

  return baseConfig as ExpoConfig;
};
