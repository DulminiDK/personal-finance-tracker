const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");

const {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
} = require("../controllers/transactionController");

router.post("/", protect, createTransaction);
router.get("/", protect, getTransactions);
router.delete("/:id", protect, deleteTransaction);
router.put("/:id", protect, updateTransaction);

module.exports = router;
