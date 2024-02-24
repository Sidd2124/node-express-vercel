const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser'); // Import bodyParser
const app = express();
const homeRouter = require("./routes/home");

// Middlewares
app.use(cors());app.use(bodyParser.json({ limit: '9144mb' })); // 6GB in megabytes

app.use(express.json());

// Routes
app.use("/", homeRouter);

// connection
const port = process.env.PORT || 3004;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
