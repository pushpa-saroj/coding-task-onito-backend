const express = require("express");
const mysql = require("mysql");
const bodyParser = require("body-parser");

const app = express();

// Parse incoming request bodies in a middleware before handlers
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Create MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "userRegistration",
});

// Connect to MySQL database
connection.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL database: " + err.stack);
    return;
  }
  console.log("Connected to MySQL database with id: " + connection.threadId);
});

// Define API endpoints
app.post("/api/data", (req, res) => {
  const {
    name,
    dob,
    sex,
    mobile,
    govt_id_type,
    govt_id_no,
    guardian_type,
    guardian_name,
    email,
    emergency_contact_no,
    address,
    state,
    city,
    country,
    pincode,
    occupation,
    religion,
    marital_status,
    blood_group,
  } = req.body;

  const data = {
    name,
    dob,
    sex,
    mobile,
    govt_id_type,
    govt_id_no,
    guardian_type,
    guardian_name,
    email,
    emergency_contact_no,
    address,
    state,
    city,
    country,
    pincode,
    occupation,
    religion,
    marital_status,
    blood_group,
  };

  const query = "INSERT INTO mytable SET ?";

  connection.query(query, data, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.status(200).json({ message: "Data saved successfully" });
  });
});

app.get("/api/data", (req, res) => {
  const query = "SELECT * FROM mytable";

  connection.query(query, (err, results) => {
    if (err) {
      console.error("Error executing MySQL query: " + err.stack);
      res.status(500).json({ message: "Internal server error" });
      return;
    }
    res.status(200).json(results);
  });
});

// Start the server
const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
