import axios from "axios";

function cleanParams(obj) {
  const cleaned = {};

  for (const key in obj) {
    const v = obj[key];

    if (v === "" || v === null || v === undefined) continue;

    if (Array.isArray(v) && v.length === 0) continue;

    cleaned[key] = v;
  }

  return cleaned;
}

export const getSales = async (query) => {
  return axios.get("http://localhost:3000/api/sales", {
    params: cleanParams(query),
  });
};
