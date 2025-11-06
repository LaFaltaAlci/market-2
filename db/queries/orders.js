import db from "#db/client";

export async function createOrder(userId, date, note) {
  const sql = `
    INSERT INTO orders
    (date, note, user_id)
    VALUES
    ($1, $2, $3)
    RETURNING *
     `;
  const {
    rows: [order],
  } = await db.query(sql, [date, note, userId]);
  return order;
}

export async function getOrdersByUserAndProduct(userId, productId) {
  const sql = `
    SELECT orders.*
    FROM
    JOIN orders_products ON orders_products.order_id = orders.id
    WHERE
    orders.user_id = $1
    AND orders_products.product_id = $2
     `;
  const { rows: orders } = await db.query(sql, [userId, productId]);
  return orders;
}

export async function getOrdersByUser(userId) {
  const sql = `
  SELECT * FROM orders
  WHERE user_id = $1
  `;
  const { rows: orders} = await db.query(sql, [userId]);
  return orders;
}

export async function getOrderById(id) {
    const sql = `
    SELECT *
    FROM
    orders
    WHERE id = $1
    `;
  const {
    rows: [orders],
  } = await db.query(sql, [id]);
  return orders;
}