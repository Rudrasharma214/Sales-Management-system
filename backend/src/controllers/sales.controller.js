import salesService from "../services/sales.service.js";
import { sendResponse } from "../utils/sendResponse.js";
import STATUS from '../utils/statusCode.js';


const normalizeParam = (param) => {
  if (Array.isArray(param)) {
    return param.map(p => p?.toString().trim()).filter(p => p);
  }
  return param?.toString().trim() || "";
};

const validateNumeric = (value, fieldName) => {
  if (!value) return null;
  const num = Number(value);
  if (isNaN(num)) {
    throw new Error(`${fieldName} must be a valid number`);
  }
  return num;
};


export default function getSales(req, res, next) {
  try {
    const search = normalizeParam(req.query.search);
    const region = normalizeParam(req.query.region);
    const gender = normalizeParam(req.query.gender);
    const category = normalizeParam(req.query.category);
    const tags = normalizeParam(req.query.tags);
    const payment = normalizeParam(req.query.payment);
    const dateFrom = normalizeParam(req.query.dateFrom);
    const dateTo = normalizeParam(req.query.dateTo);
    const sort = normalizeParam(req.query.sort);

    let page = 1;
    let ageFrom = null;
    let ageTo = null;

    try {
      page = parseInt(normalizeParam(req.query.page) || "1", 10);
      if (isNaN(page) || page < 1) {
        throw new Error("Page must be a positive integer");
      }
    } catch (err) {
      throw new Error(`Invalid page parameter: ${err.message}`);
    }

    try {
      if (req.query.ageFrom) {
        ageFrom = validateNumeric(req.query.ageFrom, "Age From");
      }
      if (req.query.ageTo) {
        ageTo = validateNumeric(req.query.ageTo, "Age To");
      }
      if (ageFrom && ageTo && ageFrom > ageTo) {
        throw new Error("Age From cannot be greater than Age To", STATUS.BAD_REQUEST);
      }
    } catch (err) {
      throw new Error(`Invalid age parameter: ${err.message}`);
    }

    const response = salesService({
      search,
      region,
      gender,
      ageFrom,
      ageTo,
      category,
      tags,
      payment,
      dateFrom,
      dateTo,
      sort,
      page,
    });

    sendResponse(res, STATUS.OK, "Sales fetched successfully", response);
  } catch (err) {
    next(err);
  }
}