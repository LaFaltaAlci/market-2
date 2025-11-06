import express from "express";
const app = express();
export default app;

import getUserFromToken from "#middleware/getUserFromToken"
import userRouter from "#api/users"
import productRouter from "#api/products"
import orderRouter from "#api/orders"

app.use(express.json());
app.use(getUserFromToken);

app.use("/users", userRouter);
app.use("/products", productRouter);
app.use("/orders", ordersRouter)

app.use((err, req, res, next) => {
  switch (err.code) {
    // Invalid type
    case "22P02":
      return res.status(400).send(err.message);
    // Unique constraint violation
    case "23505":
    // Foreign key violation
    case "23503":
      return res.status(400).send(err.detail);
    default:
      next(err);
  }
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send("Sorry! Something went wrong.");
});