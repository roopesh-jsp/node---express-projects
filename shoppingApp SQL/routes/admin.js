const express = require("express");

const productsController = require("../controllers/products");

const router = express.Router();

router.get("/add-product", productsController.addProduct);
router.post("/add-product", productsController.postProduct);

router.get("/admin", productsController.getAdminData);
router.post("/admin/edit", productsController.getEdit);
router.post("/admin/edit/:prodId", productsController.postEdit);
router.post("/admin/delete", productsController.postDel);
module.exports = router;
