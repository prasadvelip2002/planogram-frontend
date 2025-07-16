import axios from "axios";
import { getBaseUrl } from "../utils/getBaseUrl";

const axiosInstance = axios.create({
  baseURL: getBaseUrl(),
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
