export default function buildQuery(params) {
  let sql = "SELECT * FROM sales WHERE 1=1";
  const values = [];

  if (params.search) {
    sql += " AND (LOWER(customer_name) LIKE ? OR phone_number LIKE ?)";
    const q = `%${params.search.toLowerCase()}%`;
    values.push(q, q);
  }

  if (params.region) {
    sql += " AND customer_region = ?";
    values.push(params.region);
  }

  if (params.gender) {
    sql += " AND gender = ?";
    values.push(params.gender);
  }

  if (params.ageFrom) {
    sql += " AND age >= ?";
    values.push(Number(params.ageFrom));
  }

  if (params.ageTo) {
    sql += " AND age <= ?";
    values.push(Number(params.ageTo));
  }

  if (params.category) {
    sql += " AND product_category = ?";
    values.push(params.category);
  }

  if (params.tags) {
    sql += " AND LOWER(tags) LIKE ?";
    values.push(`%${params.tags.toLowerCase()}%`);
  }

  if (params.payment) {
    sql += " AND payment_method = ?";
    values.push(params.payment);
  }

  if (params.dateFrom) {
    sql += " AND date >= ?";
    values.push(params.dateFrom);
  }

  if (params.dateTo) {
    sql += " AND date <= ?";
    values.push(params.dateTo);
  }

  // Sorting
  if (params.sort === "date") {
    sql += " ORDER BY date DESC";
  } else if (params.sort === "quantity") {
    sql += " ORDER BY quantity DESC";
  } else if (params.sort === "name") {
    sql += " ORDER BY customer_name ASC";
  }

  // Pagination
  const pageSize = 10;
  const offset = (params.page - 1) * pageSize;

  sql += " LIMIT 10 OFFSET " + offset;

  return { sql, values };
}