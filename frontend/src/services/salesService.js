import axios from "axios";


export const getSales = async (query) => {
  return axios.get("https://sales-management-system-7hsb.onrender.com/api/sales", {
    params: query,
  });
};

