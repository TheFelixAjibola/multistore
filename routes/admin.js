const adminController = require("../controllers/admin");
const express = require("express");
const router = express.Router();

// admin add product => GET
router.get("/admin/add", adminController.getAddProduct);
router.get("/admin/list", adminController.getList);

// admin add product => POST
router.post("/admin/add", adminController.postAddProduct);

module.exports = router;
