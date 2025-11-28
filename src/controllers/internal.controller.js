import db from "../db.js";

export const getCatalogItemsPlants = (req, res) => {
  db.all("SELECT * FROM plantas ORDER BY id DESC LIMIT 10", (err, rows) => {
    if (err) {
      res.status(500).json({ error: "Failed to retrieve catalog items" });
    } else {
      res.json(rows);
    }
  });
};

export const createCatalogItemPlants = (req, res) => {
  const { name, description } = req.body;
  db.run("INSERT INTO plantas (name, description) VALUES (?, ?)", [name, description], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to create catalog item" });
    } else {
      res.status(201).json({ id: this.lastID, name, description });
    }
  });
};

export const deleteCatalogItemPlants = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM plantas WHERE id = ?", [id], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to delete catalog item" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Catalog item not found" });
    } else {
      res.status(200).json({ message: "Catalog item deleted successfully" });
    }
  });
};

export const updateCatalogItemPlants = (req, res) => {
  const { id } = req.params;
  const { name, description } = req.body;
  db.run("UPDATE plantas SET name = ?, description = ? WHERE id = ?", [name, description, id], function (err) {
    if (err) {
      res.status(500).json({ error: "Failed to update catalog item" });
    } else if (this.changes === 0) {
      res.status(404).json({ error: "Catalog item not found" });
    } else {
      res.status(200).json({ id, name, description });
    }
  });
};
