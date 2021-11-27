import "dotenv/config"

export default {
  expo: {
    scheme: "wantedapp",
    name: "WantedApp",
    slug: "WantedApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["**/*"],
    ios: {
      associatedDomains: ["applinks:www.abdedev.fr", "applinks:abdedev.fr"],
      //schema: "wantedapp",
      supportsTablet: true,
      bundleIdentifier: "fr.wantedapp",
    },
    android: {
      package: "fr.wantedapp",
      versionCode: 1,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      intentFilters: [
        {
          action: "VIEW",
          data: [
            {
              scheme: "http",
              host: "*.abdedev.fr/",
              pathPrefix: "/Feed",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    extra: {
      apiKey: process.env.API_KEY,
      authDomain: process.env.AUTH_DOMAIN,
      projectId: process.env.PROJECT_ID,
      storageBucket: process.env.STORAGE_BUCKET,
      messagingSenderId: process.env.MESSAGING_SENDER_ID,
      appId: process.env.APP_ID,
    },
  },
}
