import "dotenv/config"

export default {
  expo: {
    description: "description",
    primaryColor: "#015EFF",
    privacy: "public",
    scheme: "wantedapp",
    name: "Wanted | Avis de recherche",
    slug: "WantedApp",
    version: "1.1.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#015EFF",
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    assetBundlePatterns: ["assets/**/*"],
    ios: {
      associatedDomains: ["applinks:abdedev.fr"],
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: "com.wantedapp",
      config: {
        branch: { apiKey: "key_live_pc6IfvSS138Ifiq5oMddkialFygK2suQ" },
      },
    },
    android: {
      package: "com.wantedapp",
      versionCode: 10,
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#FFFFFF",
      },
      intentFilters: [
        {
          autoVerify: true,
          action: "VIEW",
          data: [
            {
              scheme: "https",
              host: "abdedev.fr",
              pathPrefix: "/posts",
            },
          ],
          category: ["BROWSABLE", "DEFAULT"],
        },
      ],
      config: {
        branch: { apiKey: "key_live_pc6IfvSS138Ifiq5oMddkialFygK2suQ" },
      },
    },
    web: {
      favicon: "./assets/icon2.png",
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
