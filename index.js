const express = require("express");
const homeRouter = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/products", homeRouter);

// connection
const port = process.env.PORT || 9007;
app.listen(port, () => console.log(`Listening to port ${port}`));
