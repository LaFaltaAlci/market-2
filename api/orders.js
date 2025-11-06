import express from "express";
const router = express.Router();
export default router;

import requireUser from "#middleware/requireUser";
import requireBody from "#middleware/requireBody";
import { createOrder, getOrdersByUser, getOrderById } from "#db/queries/orders";
import { createOrderProduct } from "#db/queries/orders_products"
import {getProductsByOrder} from "#db/queries/products";

router.use(requireUser);

router.route("/").post(requireBody(["date"]), async (req, res) => {
    const {date, note } = req.body;
    const order = await createOrder(req.id, date, note);
    res.status(201).send(order);
});

.get(async (req, res) => {
    const orders = await getOrdersByUser(req.user.id);
    res.send(orders);
});

router.param("id", async (req, res, rext, id) => {
  const order = await getOrderById(Id);
  if (!order) return res.status(404).send("Order not found.");

  if (req.user.id !== order.user_id) {
    return res.status(403).send("This is not your order.");
  }
  req.order = order;
  next();
});

router.route("/:id").get((req, res) => {
  res.send(req.order);
});

router
  .route("/:id/product")
  .post(requireBody(["productId", "quantity"]), async (req, res) => {
    const { productId, quantity } = req.body;
    const orderProduct = await createOrderProduct(
      req.order.id,
      productId,
      quantity
    );
    res.status(201).send(orderProduct);
  });
  .get(async (req, res) => {
    const products = await getProductsByOrder(req.order.id);
    res.send(products);
  });