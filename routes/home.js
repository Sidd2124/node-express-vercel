const express = require('express');
const router = express.Router();
const mysql = require('mysql');

// Create MySQL connection
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'Siddu',
  password: 'Sidd@2124',
  database: 'my_node_app_db'
});

// Connect to MySQL
connection.connect();

// GET all products
router.get('/products', (req, res) => {
  connection.query('SELECT * FROM products', (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.json(results);
    }
  });
});

// POST a new product
router.post('/products', (req, res) => {
  const newProduct = req.body;

  connection.query('INSERT INTO products SET ?', newProduct, (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    } else {
      res.status(201).json({ message: 'Product added successfully', product: newProduct });
    }
  });
});

module.exports = router;
