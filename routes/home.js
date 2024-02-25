const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const serverless = require('serverless-http');
const router = express.Router(); // Creating a router instance
const app = express(); // Creating an Express app instance

// Enable CORS for all routes
app.use(cors()); // Apply CORS to the Express app

// Parse JSON bodies with increased payload limit (e.g., 50MB)
app.use(bodyParser.json({ limit: '50mb' })); // Apply body parser to the Express app

// Rest of the code...

// Rest of the code...

let products = [
  {
    id: "1",
    name: "Naresh",
    number: "9666841615",
    imageURL: "https://i.ibb.co/4dcxwgY/Screenshot-2024-02-23-174428.png",
    insuranceDocument: "",
    insuranceDate: "07/07/2023",
    adharDocumentFront: "",
    adharDocumentBack: "",
    insuranceNo: "001",
    aavuFront: "",
    aavuBack: "",
    aavuRight: "",
    aavuLeft: ""
  },
];

// Define routes
router.get('/products', (req, res) => {
  res.json(products);
});

router.post('/products', (req, res) => {
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

  const newProduct = {
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
  };
  products.push(newProduct);

  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});

// Mount router
app.use('/products', router);

// Wrap the app with serverless handler
module.exports.handler = serverless(app);
