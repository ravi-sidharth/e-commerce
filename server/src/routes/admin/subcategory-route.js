const express =require('express')
const {
  addSubCategory,
  deleteSubCategory,
  getSubCategory,
  updateSubCategory,
} = require("../../controllers/admin/subCategory-controller.js");

const router=express.Router();

router.post("/add", addSubCategory);
router.put("/update/:id", updateSubCategory);
router.delete("/delete/:id", deleteSubCategory);
router.get("/list", getSubCategory);

module.exports = router
