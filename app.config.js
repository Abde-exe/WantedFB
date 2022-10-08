import 'dotenv/config';

export default {
  expo: {
    description: 'description',
    primaryColor: '#015EFF',
    privacy: 'public',
    scheme: 'wantedapp',
    name: 'Wanted | Avis de recherche',
    slug: 'WantedApp',
    version: '1.3.7',
    orientation: 'portrait',
    icon: './assets/icon2.png',
    splash: {
      image: './assets/splash.png',
      resizeMode: 'contain',
      backgroundColor: '#FFFFFF',
    },
    updates: {
      fallbackToCacheTimeout: 0,
    },
    plugins: [
      [
        'expo-media-library',
        {
          photosPermission:
            'Allow accessing media library to add details to your post with a picture',
          savePhotosPermission:
            'Allow saving your post as an image to media library',
          isAccessMediaLocationEnabled: 'true',
        },
      ],
    ],
    assetBundlePatterns: ['assets/**/*'],
    ios: {
      associatedDomains: ['applinks:wantedapp.page.link'],
      usesAppleSignIn: true,
      supportsTablet: true,
      bundleIdentifier: 'com.wantedapp',
      config: {
        branch: { apiKey: 'key_live_pc6IfvSS138Ifiq5oMddkialFygK2suQ' },
      },
      infoPlist: {
        NSPhotoLibraryUsageDescription:
          'Allow accessing media library to add details to your post with a picture',
      },
    },
    android: {
      //googleServicesFile: "./google-services.json",
      package: 'com.wantedapp',
      versionCode: 25,
      adaptiveIcon: {
        foregroundImage: './assets/icon2.png',
        backgroundColor: '#FFFFFF',
      },
      intentFilters: [
        {
          autoVerify: true,
          action: 'VIEW',
          data: [
            {
              scheme: 'https',
              host: 'wanted-316010.web.app',
              pathPrefix: '/posts',
            },
          ],
          category: ['BROWSABLE', 'DEFAULT'],
        },
      ],
      config: {
        branch: { apiKey: 'key_live_pc6IfvSS138Ifiq5oMddkialFygK2suQ' },
      },
    },
    web: {
      favicon: './assets/icon2.png',
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
};
