const express = require('express');
const router = express.Router();

let products = [
  {
    id: "1",
    name: "NaresH",
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

// GET all products
router.get('/products', (req, res) => {
  res.json(products);
});

// POST a new product
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

module.exports = router;
