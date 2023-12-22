const path = require("path");
const express = require("express");
const router = express.Router();

const shopController = require("../controllers/shop");

router.get("/", shopController.getIndex);

router.get("/list", shopController.getProducts);

router.get("/list/:id", shopController.getProductDetails);

router.get("/cart", shopController.getCart);

router.post("/cart", shopController.postCart);

router.post("/cart-delete-item", shopController.postCartDeleteProduct);

router.post("/createOrder", shopController.postOrder);

router.get("/orders", shopController.getOrders);

module.exports = router;
