const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased payload limit (e.g., 50MB)
app.use(bodyParser.json({ limit: '50mb' }));

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
app.get('/api/products', (req, res) => { // Updated route to /api/products
  res.json(products);
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

// Export the app for serverless deployment
module.exports = app;
