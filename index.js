const express = require('express');
const bodyParser = require('body-parser');
const productRoutes = require('./routes/home'); // Path to your routes file

const app = express();

app.use(bodyParser.json());
app.use('/api', productRoutes); // Mount the product routes under '/api'

const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
