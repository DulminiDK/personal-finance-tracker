const db = require("../config/db");

const createTransaction = (req, res) => {
  try {
    const userId = req.user.id;

    const { title, amount, category, type, transaction_date, note } = req.body;

    if (!title || !amount || !category || !type || !transaction_date) {
      return res.status(400).json({
        message: "Please fill all required fields",
      });
    }

    const query = `
      INSERT INTO transactions
      (user_id, title, amount, category, type, transaction_date, note)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
      query,
      [userId, title, amount, category, type, transaction_date, note],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "Transaction created successfully",
        });
      },
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

const getTransactions = (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT *
      FROM transactions
      WHERE user_id = ?
      ORDER BY transaction_date DESC
    `;

    db.query(query, [userId], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json(results);
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTransaction = (req, res) => {
  try {
    const userId = req.user.id;

    const transactionId = req.params.id;

    const query = `
      DELETE FROM transactions
      WHERE id = ? AND user_id = ?
    `;

    db.query(query, [transactionId, userId], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Transaction deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const updateTransaction = (req, res) => {
  try {
    const userId = req.user.id;

    const transactionId = req.params.id;

    const { title, amount, category, type, transaction_date, note } = req.body;

    const query = `
      UPDATE transactions
      SET
        title = ?,
        amount = ?,
        category = ?,
        type = ?,
        transaction_date = ?,
        note = ?
      WHERE id = ? AND user_id = ?
    `;

    db.query(
      query,
      [
        title,
        amount,
        category,
        type,
        transaction_date,
        note,
        transactionId,
        userId,
      ],
      (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(200).json({
          message: "Transaction updated successfully",
        });
      },
    );
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createTransaction,
  getTransactions,
  deleteTransaction,
  updateTransaction,
};
