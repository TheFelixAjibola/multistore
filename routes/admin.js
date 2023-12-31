const adminController = require("../controllers/admin");
const express = require("express");
const router = express.Router();

// admin add product => GET
router.get("/admin/add", adminController.getAddProduct);

// admin product list => GET
router.get("/admin/list", adminController.getList);

// admin add product => POST
router.post("/admin/add", adminController.postAddProduct);

// admin edit product => GET
router.get("/admin/edit/:id", adminController.getEditProduct);

// admin update product => POST
router.post("/admin/edit", adminController.postEditProduct);

// admin delete product => POST
router.post("/admin/delete", adminController.postDeleteProduct);

module.exports = router;
