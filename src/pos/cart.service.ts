import express from "express";
import { syncSale } from "../sync/inventory.sync";

export const cartRouter = express.Router();

let cart: any[] = [];

cartRouter.post("/checkout", async (req, res) => {
  const sale = {
    items: cart,
    timestamp: new Date()
  };

  await syncSale(sale);

  cart = [];
  res.json({ status: "COMPLETED" });
});
