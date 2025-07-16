import axios from "./axiosInstance";

const actualShelfService = {
  submitShelfData: async (payload) => {
    const res = await axios.post("/shelf-submissions", payload); // ✅ match backend
    return res.data;
  },

  getAllShelves: async () => {
    const res = await axios.get("/shelf-submissions"); // ✅ match backend
    return res.data;
  },
};

export default actualShelfService;
