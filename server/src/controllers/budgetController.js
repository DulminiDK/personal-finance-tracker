const db = require("../config/db");

const createBudget = (req, res) => {
  try {
    const userId = req.user.id;

    const { category, amount, month, year } = req.body;

    if (!category || !amount || !month || !year) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const checkQuery = `
      SELECT *
      FROM budgets
      WHERE user_id = ?
      AND category = ?
      AND month = ?
      AND year = ?
    `;

    db.query(checkQuery, [userId, category, month, year], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "Budget already exists for this category and month",
        });
      }

      const insertQuery = `
          INSERT INTO budgets
          (user_id, category, amount, month, year)
          VALUES (?, ?, ?, ?, ?)
        `;

      db.query(
        insertQuery,
        [userId, category, amount, month, year],
        (err, result) => {
          if (err) {
            return res.status(500).json(err);
          }

          res.status(201).json({
            message: "Budget created successfully",
          });
        },
      );
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getBudgets = (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT *
      FROM budgets
      WHERE user_id = ?
      ORDER BY created_at DESC
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

const updateBudget = (req, res) => {
  try {
    const userId = req.user.id;

    const budgetId = req.params.id;

    const { amount, month, year } = req.body;

    const query = `
      UPDATE budgets
      SET
        amount = ?,
        month = ?,
        year = ?
      WHERE id = ? AND user_id = ?
    `;

    db.query(query, [amount, month, year, budgetId, userId], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Budget updated successfully",
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createBudget,
  getBudgets,
  updateBudget,
};
