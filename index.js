const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/home'); // Path to your routes file

const app = express();

app.use(bodyParser.json());
app.use('/products', productRoutes); // Mount the product routes under '/.netlify/functions/api/products'

const port = process.env.PORT || 3005;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
  
});
