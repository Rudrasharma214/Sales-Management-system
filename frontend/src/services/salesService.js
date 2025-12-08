import axios from "axios";


export const getSales = async (query) => {
  return axios.get("http://localhost:3000/api/sales", {
    params: query,
  });
};