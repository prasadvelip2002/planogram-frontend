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
      url: "https://u.expo.dev/f58ce436-2a6a-4801-a49b-e06f5ef40168",
    },
    runtimeVersion: "1.0.0", // ✅ SET MANUALLY here
    android: {
      package: "com.prasadvelip.planogramapp",
      versionCode: 5,
      runtimeVersion: "1.0.0", // ✅ SET manually here too
    },
    ios: {
      runtimeVersion: "1.0.0", // ✅ For iOS
    },
    extra: {
      API_BASE_URL: process.env.API_BASE_URL,
      IMAGE_BASE_URL: process.env.IMAGE_BASE_URL,
      eas: {
        projectId: "f58ce436-2a6a-4801-a49b-e06f5ef40168",
      },
    },
  },
};
