import db from "#db/client";
import { createProduct } from "#db/queries/products";
import { createUser } from "#db/queries/users";
import { createOrder } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products";

await db.connect();
await seed();
await db.end();
console.log("🌱 Database seeded.");

async function seed() {
  const products = [];
  for (let i = 0; i < 10; i++) {
    const product = await createProduct(
      "Product " + i,
      "Description " + i,
      Math.random() * 100 + 1
    );
    products.push(product);
  }

  const user = await createUser("supershopper", "loves2shop");

  const order = await createOrder(user.id, "7777-07-07");

  for (let i = 0; i < 5; i++) {
    await createOrderProduct(order.id, products[i].id, i + 1);
  }
}
