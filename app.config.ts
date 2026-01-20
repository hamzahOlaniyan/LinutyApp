// import "dotenv/config";
// import { ConfigContext, ExpoConfig } from "expo/config";



// export default ({ config }: ConfigContext): ExpoConfig => {
//   const ids = {
//     development: { android: "com.hamzaholaniyan.linutydev", ios: "com.hamzaholaniyan.linutydev" },
//     preview: { android: "com.hamzaholaniyan.linutypreview", ios: "com.hamzaholaniyan.linutypreview" },
//     production: { android: "com.hamzaholaniyan.linuty", ios: "com.hamzaholaniyan.linuty" },
//   } as const;

//   const variant = process.env.APP_VARIANT || "development";

//   const baseConfig = {
//     ...config,
//     name: "LinutyApp",
//     slug: "LinutyApp",
//     version: "1.3.0",
//     orientation: "portrait",
//     icon: "./src/assets/images/icon.png",
//     scheme: "linutyapp",
//     userInterfaceStyle: "automatic",
//     newArchEnabled: true,
//     splash: {
//       image: "./src/assets/images/logo.png",
//       resizeMode: "contain",
//       backgroundColor: "#ffffff",
//     },

//     ios: {
//       supportsTablet: true,
//       bundleIdentifier: "com.hamzaholaniyan.linuttydev",
//     },
//     android: {
//       adaptiveIcon: {
//         backgroundImage: "./src/assets/images/adaptive-icon.png",
//       },
//       edgeToEdgeEnabled: true,
//       softwareKeyboardLayoutMode: "pan",
//       versionCode: 41,
//       package: ids[variant].android
      
//     },
//     web: {
//       bundler: "metro",
//       output: "static",
//     },
//     plugins: ["expo-router"],
//     experiments: {
//       typedRoutes: true,
//     },
//     extra: {
//       EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_PROD_API_URL,
//       eas: {
//         projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
//       },
//     },
//     owner: "hamzaholaniyan",

//     runtimeVersion: "1.0.0",

//     updates: {
//       url: "https://u.expo.dev/9ba15d7e-509f-4f7c-ae54-827330c67015",
//     },
//   };

//   if (variant === "development") {
//     return {
//       ...baseConfig,
//       name: "Linuty Dev",
//       extra: {
//         EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_ENDPOINT_URL,
//         eas: {
//           projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
//       },
//     },
//       android: {
//         ...baseConfig.android,
//         package: "com.hamzaholaniyan.linuttydev",
//         versionCode: 15, // increment this only when updating dev build
//       },
//       ios: { "bundleIdentifier": "com.hamzaholaniyan.linuttydev" }
//     } as ExpoConfig;
//   }

//   if (variant === "preview") {
//     return {
//       ...baseConfig,
//       name: "Linuty Preview",
//        extra: {
//         EXPO_PUBLIC_ENDPOINT_URL: process.env.EXPO_PUBLIC_PROD_API_URL,
//         eas: {
//           projectId: "9ba15d7e-509f-4f7c-ae54-827330c67015",
//         },
//     },
//       android: {
//         ...baseConfig.android,
//         package: "com.hamzaholaniyan.linuttypreview", // unique package name
//         versionCode: 20, // increment this only when updating preview build
//       },
//       ios: { "bundleIdentifier": "com.hamzaholaniyan.linuttypreview" }

//     } as ExpoConfig;
//   }

//   return baseConfig as ExpoConfig;
// };

// app.config.ts
import "dotenv/config";
import type { ConfigContext, ExpoConfig } from "expo/config";

type Variant = "development" | "preview" | "production";

const PROJECT_ID = "9ba15d7e-509f-4f7c-ae54-827330c67015";
const OWNER = "hamzaholaniyan";

const IDS: Record<Variant, { androidPackage: string; iosBundleId: string; displayName: string }> =
  {
    development: {
      androidPackage: "com.hamzaholaniyan.linuttydev",
      iosBundleId: "com.hamzaholaniyan.linuttydev",
      displayName: "Linuty Dev",
    },
    preview: {
      androidPackage: "com.hamzaholaniyan.linuttypreview",
      iosBundleId: "com.hamzaholaniyan.linuttypreview",
      displayName: "Linuty Preview",
    },
    production: {
      androidPackage: "com.hamzaholaniyan.linutty",
      iosBundleId: "com.hamzaholaniyan.linutty",
      displayName: "Linuty",
    },
  };

function getVariant(): Variant {
  const v = (process.env.APP_VARIANT || "development") as Variant;
  if (!["development", "preview", "production"].includes(v)) return "development";
  return v;
}

function pickEndpoint(variant: Variant) {
  if (variant === "development") return process.env.EXPO_PUBLIC_ENDPOINT_URL; 
  if (variant === "preview") return  process.env.EXPO_PUBLIC_PROD_API_URL; 
  if (variant === "production") return process.env.EXPO_PUBLIC_PROD_API_URL; 
  return process.env.EXPO_PUBLIC_PROD_API_URL; 
}

export default ({ config }: ConfigContext): ExpoConfig => {
  const variant = getVariant();
  const ids = IDS[variant];

  const endpoint = pickEndpoint(variant);

  if (!endpoint) {
    // Fail fast so EAS doesn’t silently build “dev” config or ship wrong endpoints.
    throw new Error(
      `Missing API env var for ${variant}. Set EXPO_PUBLIC_ENDPOINT_URL (dev), EXPO_PUBLIC_PREVIEW_API_URL (preview) and/or EXPO_PUBLIC_PROD_API_URL (prod).`
    );
  }

  const base: ExpoConfig = {
    ...config,
    name: ids.displayName,
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
      bundleIdentifier: ids.iosBundleId,
    },

    android: {
      adaptiveIcon: {
        backgroundImage: "./src/assets/images/adaptive-icon.png",
      },
      edgeToEdgeEnabled: true,
      softwareKeyboardLayoutMode: "pan",
      // Keep your versionCode logic in EAS autoIncrement, but leaving this here is fine too.
      // versionCode: 41,
      package: ids.androidPackage,
    },

    web: {
      bundler: "metro",
      output: "static",
    },

    plugins: ["expo-router"],
    experiments: { typedRoutes: true },

    owner: OWNER,

    extra: {
      appVariant: variant,
      EXPO_PUBLIC_ENDPOINT_URL: endpoint,
      eas: { projectId: PROJECT_ID },
    },

    runtimeVersion: "1.0.0",
    updates: { url: `https://u.expo.dev/${PROJECT_ID}` },
  };

  return base;
};
