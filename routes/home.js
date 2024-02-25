const express = require('express');
const path = require('path');
const cors = require('cors');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/home');


const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased payload limit (e.g., 50MB)
app.use(express.json({ limit: '50mb' }));

// Create a MySQL connection pool
const pool = mysql.createPool({
  connectionLimit: 10,
  host: 'localhost',
  user: 'Siddu',
  password: 'Sidd@2124',
  database: 'products'
});

// Define routes using router
const router = express.Router();

router.get('/api', (req, res) => {
  pool.query('SELECT * FROM data', (error, results, fields) => {
    if (error) {
      console.error('Error retrieving products: ' + error.message);
      return res.status(500).json({ error: 'Error retrieving products' });
    }
    res.json(results);
  });
});

router.post('/api', (req, res) => {
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

  pool.query(sql, values, (error, results, fields) => {
    if (error) {
      console.error('Error inserting product: ' + error.message);
      return res.status(500).json({ error: 'Error inserting product' });
    }
    console.log('Product added successfully');
    res.status(201).json({ message: 'Product added successfully', product: req.body });
  });
});

// Use the router for '/products' path
const productRoutes = require(path.join(__dirname, 'routes', 'home'));
app.use('/products', productRoutes);

// Global error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Start the server
const port = process.env.PORT || 3020;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
