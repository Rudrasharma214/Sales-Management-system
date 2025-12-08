import salesService from "../services/sales.service.js";
import { sendResponse } from "../utils/sendResponse.js";
import STATUS from '../utils/statusCode.js';

export default function getSales(req, res, next) {
  try {

    const getParam = (param) => {
      if (Array.isArray(param)) {
        return param[0] || "";
      }
      return param || "";
    };

    const response = salesService({
      search: getParam(req.query.search),
      region: getParam(req.query.region),
      gender: getParam(req.query.gender),
      ageFrom: getParam(req.query.ageFrom),
      ageTo: getParam(req.query.ageTo),
      category: getParam(req.query.category),
      tags: getParam(req.query.tags),
      payment: getParam(req.query.payment),
      dateFrom: getParam(req.query.dateFrom),
      dateTo: getParam(req.query.dateTo),
      sort: getParam(req.query.sort),
      page: parseInt(getParam(req.query.page) || 1)
    });

    sendResponse(res, STATUS.OK, "Sales fetched successfully", response);
  } catch (err) {
    next(err);
  }
}