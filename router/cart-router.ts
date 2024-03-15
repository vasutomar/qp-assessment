import {
  health,
  add,
  remove,
  checkout,
} from "../controllers/cart-controller";
import express from "express";

export const cartRouter = express.Router();
cartRouter.get("/cart/health", health);
cartRouter.post("/cart/add", add);
cartRouter.post("/cart/remove", remove);
cartRouter.post("/cart/checkout", checkout);
