const express = require('express');
const cors = require('cors');
const mysql = require('mysql');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased payload limit (e.g., 50MB)
app.use(express.json({ limit: '50mb' }));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Siddu',
  password: 'Sidd@2124',
  database: 'products'
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL database as id ' + connection.threadId);
});

// Define routes
app.get('/api', (req, res) => {
  connection.query('SELECT * FROM data', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving products: ' + error.message);
      return res.status(500).json({ error: 'Error retrieving products' });
    }
    res.json(results);
  });
});

app.post('/api', (req, res) => {
  const {
    id,
    name,
    number,
    imageURL,
    insuranceDocument,
    insuranceDate,
    adharDocumentFront,
    adharDocumentBack,
    insuranceNo,
    aavuFront,
    aavuBack,
    aavuRight,
    aavuLeft
  } = req.body;

  const sql = 'INSERT INTO data (id, name, number, imageURL, insuranceDocument, insuranceDate, adharDocumentFront, adharDocumentBack, insuranceNo, aavuFront, aavuBack, aavuRight, aavuLeft) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id, name, number, imageURL, insuranceDocument, insuranceDate, adharDocumentFront, adharDocumentBack, insuranceNo, aavuFront, aavuBack, aavuRight, aavuLeft];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting product: ' + error.message);
      return res.status(500).json({ error: 'Error inserting product' });
    }
    console.log('Product added successfully');
    res.status(201).json({ message: 'Product added successfully', product: req.body });
  });
});

// Export the app for serverless deployment
module.exports = app;
