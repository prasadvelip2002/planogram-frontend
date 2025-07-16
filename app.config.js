import "dotenv/config";

export default {
  expo: {
    name: "PlanogramApp",
    slug: "PlanogramApp",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      image: "./assets/splash.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    updates: {
      url: "https://u.expo.dev/f58ce436-2a6a-4801-a49b-e06f5ef40168", // ✅ Add this
    },
    runtimeVersion: {
      policy: "appVersion", // ✅ Required for EAS Update
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      IMAGE_BASE_URL: process.env.IMAGE_BASE_URL,
      eas: {
        projectId: "f58ce436-2a6a-4801-a49b-e06f5ef40168",
      },
    },
    android: {
      package: "com.prasadvelip.planogramapp",
    },
    ios: {
      bundleIdentifier: "com.prasadvelip.planogramapp",
    },
  },
};
