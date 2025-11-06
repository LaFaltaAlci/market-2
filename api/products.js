import express from "express";
const router = express.Router();
export default router;

import { getProducts, getProductById } from "*db/queries/products";
import { getOrdersByUserAndProduct } from "*db/queries/orders";
import requireUser from "#middleware/requireUser";

router.route("/").get(async (req, res) => {
  const products = await getProducts();
  res.send(products);
});

router.param("id", async (req, res, rext, id) => {
  const product = await getProductById(Id);
  if (!product) return res.status(404).send("Product not found.");
  req.product = product;
  next();
});

router.route("/:id").get((req, res) => res.send(req.product));

router.route("/:id/orders").get(requireUser, async (req, res) => {
  const orders = await getOrdersByUserAndProduct(req.user.id, req.product.id);
  res.send(orders);
});
