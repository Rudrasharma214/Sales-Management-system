import db from "./db.js";

export function createIndexes() {
  db.exec(`
    CREATE INDEX IF NOT EXISTS idx_sales_date ON sales(date);
    CREATE INDEX IF NOT EXISTS idx_sales_customer_name ON sales(customer_name);
    CREATE INDEX IF NOT EXISTS idx_sales_phone ON sales(phone_number);
    CREATE INDEX IF NOT EXISTS idx_sales_region ON sales(customer_region);
    CREATE INDEX IF NOT EXISTS idx_sales_gender ON sales(gender);
    CREATE INDEX IF NOT EXISTS idx_sales_age ON sales(age);
    CREATE INDEX IF NOT EXISTS idx_sales_category ON sales(product_category);
    CREATE INDEX IF NOT EXISTS idx_sales_payment ON sales(payment_method);
    CREATE INDEX IF NOT EXISTS idx_sales_quantity ON sales(quantity);
  `);
}