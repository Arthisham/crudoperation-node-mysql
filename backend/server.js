const express = require("express");
const mysql = require("mysql");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "crud_db",
  port: "3377",
});

db.connect(err => {
  if (err) {
    console.log("Error connecting to the database:", err);
  } else {
    console.log("MySQL connected...");
  }
});

// CREATE operation 
app.post("/api/create", (req, res) => {
  const { name, email, age } = req.body;
  const sqlInsert = "INSERT INTO users (name, email, age) VALUES (?, ?, ?)";
  db.query(sqlInsert, [name, email, age], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("User added successfully");
  });
});

// READ operation
app.get("/api/users", (req, res) => {
  const sqlSelect = "SELECT * FROM users";
  db.query(sqlSelect, (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send(result);
  });
});

// UPDATE operation 
app.put("/api/update/:id", (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  const sqlUpdate = "UPDATE users SET name = ?, email = ?, age = ? WHERE id = ?";
  db.query(sqlUpdate, [name, email, age, id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("User updated successfully");
  });
});

// DELETE operation 
app.delete("/api/delete/:id", (req, res) => {
  const { id } = req.params;
  const sqlDelete = "DELETE FROM users WHERE id = ?";
  db.query(sqlDelete, [id], (err, result) => {
    if (err) {
      return res.status(500).send(err);
    }
    res.send("User deleted successfully");
  });
});


app.listen(8050, () => {
  console.log("Server running on port 8050");
});
