const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mysql = require('mysql');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased payload limit (e.g., 50MB)
app.use(bodyParser.json({ limit: '50mb' }));

// Create a MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Siddu',
  password: 'Sidd@2124',
  database: 'products.products',
  authPlugins: {
    mysql_clear_password: () => () => Buffer.from('Sidd@2124')
  }
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
app.get('/api/products', (req, res) => { // Updated route to /api/products
  connection.query('SELECT * FROM products', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving products: ' + error.message);
      res.status(500).json({ error: 'Error retrieving products' });
      return;
    }
    res.json(results);
  });
});

app.post('/api/products', (req, res) => { // Updated route to /api/products
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

  const sql = 'INSERT INTO products (id, name, number, imageURL, insuranceDocument, insuranceDate, adharDocumentFront, adharDocumentBack, insuranceNo, aavuFront, aavuBack, aavuRight, aavuLeft) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)';
  const values = [id, name, number, imageURL, insuranceDocument, insuranceDate, adharDocumentFront, adharDocumentBack, insuranceNo, aavuFront, aavuBack, aavuRight, aavuLeft];

  connection.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting product: ' + error.message);
      res.status(500).json({ error: 'Error inserting product' });
      return;
    }
    console.log('Product added successfully');
    res.status(201).json({ message: 'Product added successfully', product: req.body });
  });
});

// Export the app for serverless deployment
module.exports = app;
