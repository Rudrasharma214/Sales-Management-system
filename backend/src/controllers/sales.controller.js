import salesService from "../services/sales.service.js";
import { sendResponse } from "../utils/sendResponse.js";
import STATUS from '../utils/statusCode.js';

export default function getSales(req, res, next) {
  try {
    const response = salesService({
      search: req.query.search || "",
      region: req.query.region || "",
      gender: req.query.gender || "",
      ageFrom: req.query.ageFrom || "",
      ageTo: req.query.ageTo || "",
      category: req.query.category || "",
      tags: req.query.tags || "",
      payment: req.query.payment || "",
      dateFrom: req.query.dateFrom || "",
      dateTo: req.query.dateTo || "",
      sort: req.query.sort || "",
      page: parseInt(req.query.page || 1)
    });

    sendResponse(res, STATUS.OK, "Sales fetched successfully", response);
  } catch (err) {
    next(err);
  }
}