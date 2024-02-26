const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased payload limit (e.g., 1GB)
app.use(bodyParser.json({ limit: '5gb' }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/products', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Define Product schema
const productSchema = new mongoose.Schema({
  id: String,
  Name: String,
  Number: String,
  ImageURL: String,
  InsurenceDocument: String,
  InsurenceDate: String,
  AdharDocumentFront: String,
  AdharDocumentBack: String,
  InsurenceNo: String,
  AavuFront: String,
  AavuBack: String,
  AavuRight: String,
  AavuLeft: String
});

const Product = mongoose.model('Product', productSchema);

app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/products', async (req, res) => {
  try {
    const newProduct = await Product.create(req.body);
    res.status(201).json({ message: 'Product added successfully', product: newProduct });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start the server
const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
