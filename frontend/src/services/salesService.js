import axios from "axios";
const SERVER_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getSales = async (query) => {
  return axios.get(`${SERVER_URL}/api/sales`, {
    params: query,
  });
};