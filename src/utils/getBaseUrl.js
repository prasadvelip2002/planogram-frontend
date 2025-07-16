import Constants from "expo-constants";

const { API_BASE_URL, IMAGE_BASE_URL } = Constants.expoConfig.extra;

export const getBaseUrl = () => API_BASE_URL;
export const getImageBaseUrl = () => IMAGE_BASE_URL;
