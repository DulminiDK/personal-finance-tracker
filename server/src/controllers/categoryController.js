const db = require("../config/db");

const createCategory = (req, res) => {
  try {
    const userId = req.user.id;

    const { name, type } = req.body;

    if (!name || !type) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const checkQuery = `
      SELECT *
      FROM categories
      WHERE user_id = ?
      AND name = ?
      AND type = ?
    `;

    db.query(checkQuery, [userId, name, type], (err, results) => {
      if (err) {
        return res.status(500).json(err);
      }

      if (results.length > 0) {
        return res.status(400).json({
          message: "Category already exists",
        });
      }

      const insertQuery = `
          INSERT INTO categories
          (user_id, name, type)
          VALUES (?, ?, ?)
        `;

      db.query(insertQuery, [userId, name, type], (err, result) => {
        if (err) {
          return res.status(500).json(err);
        }

        res.status(201).json({
          message: "Category created successfully",
        });
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const getCategories = (req, res) => {
  try {
    const userId = req.user.id;

    const query = `
      SELECT *
      FROM categories
      WHERE user_id = ?
      ORDER BY type, name
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

const updateCategory = (req, res) => {
  try {
    const userId = req.user.id;

    const categoryId = req.params.id;

    const { name } = req.body;

    const query = `
      UPDATE categories
      SET name = ?
      WHERE id = ? AND user_id = ?
    `;

    db.query(query, [name, categoryId, userId], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Category updated successfully",
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteCategory = (req, res) => {
  try {
    const userId = req.user.id;

    const categoryId = req.params.id;

    const query = `
      DELETE FROM categories
      WHERE id = ? AND user_id = ?
    `;

    db.query(query, [categoryId, userId], (err, result) => {
      if (err) {
        return res.status(500).json(err);
      }

      res.status(200).json({
        message: "Category deleted successfully",
      });
    });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
};
