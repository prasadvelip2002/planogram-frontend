import axios from "./axiosInstance";

const planogramService = {
  getPlanogram: async () => {
    const res = await axios.get("/planogram-layout"); // 🔥 must match your backend
    return res.data;
  },
};

export default planogramService;
