export default function buildQuery(params) {
  let sql = "SELECT * FROM sales WHERE 1=1";
  const values = [];

  if (params.search) {
    sql += " AND (customer_name LIKE ? OR phone_number LIKE ?)";
    const q = `${params.search}%`;
    values.push(q, q);
  }

  if (params.region && params.region.length > 0) {
    const regionArray = Array.isArray(params.region) ? params.region : [params.region];
    const placeholders = regionArray.map(() => "?").join(",");
    sql += ` AND customer_region IN (${placeholders})`;
    values.push(...regionArray);
  }

  if (params.gender && params.gender.length > 0) {
    const genderArray = Array.isArray(params.gender) ? params.gender : [params.gender];
    const placeholders = genderArray.map(() => "?").join(",");
    sql += ` AND gender IN (${placeholders})`;
    values.push(...genderArray);
  }

  if (params.ageFrom) {
    sql += " AND age >= ?";
    values.push(Number(params.ageFrom));
  }

  if (params.ageTo) {
    sql += " AND age <= ?";
    values.push(Number(params.ageTo));
  }

  if (params.category && params.category.length > 0) {
    const categoryArray = Array.isArray(params.category) ? params.category : [params.category];
    const placeholders = categoryArray.map(() => "?").join(",");
    sql += ` AND product_category IN (${placeholders})`;
    values.push(...categoryArray);
  }

  if (params.tags && params.tags.length > 0) {
    const tagsArray = Array.isArray(params.tags) ? params.tags : [params.tags];
    const placeholders = tagsArray.map(() => "LOWER(tags) LIKE ?").join(" OR ");
    sql += ` AND (${placeholders})`;
    tagsArray.forEach(tag => {
      values.push(`%${tag.toLowerCase()}%`);
    });
  }

  if (params.payment && params.payment.length > 0) {
    const paymentArray = Array.isArray(params.payment) ? params.payment : [params.payment];
    const placeholders = paymentArray.map(() => "?").join(",");
    sql += ` AND payment_method IN (${placeholders})`;
    values.push(...paymentArray);
  }

  if (params.dateFrom) {
    sql += " AND date >= ?";
    values.push(params.dateFrom);
  }

  if (params.dateTo) {
    sql += " AND date <= ?";
    values.push(params.dateTo);
  }

  if (params.sort === "date") {
    sql += " ORDER BY date DESC";
  } else if (params.sort === "quantity") {
    sql += " ORDER BY quantity DESC";
  } else if (params.sort === "name") {
    sql += " ORDER BY customer_name ASC";
  }

  const pageSize = 10;
  const offset = (params.page - 1) * pageSize;

  sql += " LIMIT 10 OFFSET " + offset;

  return { sql, values };
}