import db from "../config/db.js";
import buildQuery from "../utils/buildQuery.js";
import STATUS from "../utils/statusCode.js";
import AppError from "../utils/AppError.js";

export default function salesService(params) {
  try {
    if (isNaN(params.page) || params.page < 1) {
      throw new AppError("Invalid page number", STATUS.BAD_REQUEST);
    }

    const { sql, values } = buildQuery(params);

    const countSql = `
      SELECT COUNT(*) as total
      FROM (${sql.replace(/LIMIT\s+\d+\s+OFFSET\s+\d+/i, "")}) AS countTable
    `;

    const countStmt = db.prepare(countSql);
    const totalResult = countStmt.get(...values);
    const total = totalResult.total;

    const stmt = db.prepare(sql);
    const rows = stmt.all(...values);

    const pageSize = 10;
    const totalPages = Math.ceil(total / pageSize);

    return {
      pagination: {
        page: params.page,
        pageSize,
        total,
        totalPages,
        hasNext: params.page < totalPages,
      },
      data: rows,
    };
  } catch (err) {
    if (err instanceof AppError) {
      throw err;
    }

    throw new AppError(
      err.message || "Database operation failed",
      STATUS.INTERNAL_ERROR
    );
  }
}
