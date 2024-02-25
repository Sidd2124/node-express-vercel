

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');



const app = express();

// Enable CORS for all routes
app.use(cors());

// Parse JSON bodies with increased payload 
app.use(bodyParser.json({ limit: '1gb' }));


const products = [
  {
    id: "",
    Name: "Naresh",
    Number: "9666841615",
    ImageURL: "https://i.ibb.co/4dcxwgY/Screenshot-2024-02-23-174428.png",
    InsurenceDocument: "",
    InsurenceDate: "07/07/2023",
    AdharDocumentFront: "",
    AdharDocumentBack: "",
    InsurenceNo: "001",
    AavuFront: "",
    AavuBack: "",
    AavuRight: "",
    AavuLeft: ""
  },
];

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/products', (req, res) => {
  const { id, Name, Number, ImageURL, InsurenceDocument, InsurenceDate, AdharDocumentFront, AdharDocumentBack, InsurenceNo, AavuFront, AavuBack, AavuRight, AavuLeft } = req.body;

  const newProduct = { id, Name, Number, ImageURL, InsurenceDocument, InsurenceDate, AdharDocumentFront, AdharDocumentBack, InsurenceNo, AavuFront, AavuBack, AavuRight, AavuLeft };
  products.push(newProduct);

  res.status(201).json({ message: 'Product added successfully', product: newProduct });
});




const PORT = process.env.PORT || 3009;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

