const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const {
  createBudget,
  getBudgets,
  updateBudget,
} = require("../controllers/budgetController");

router.post("/", protect, createBudget);
router.get("/", protect, getBudgets);
router.put("/:id", protect, updateBudget);

module.exports = router;
