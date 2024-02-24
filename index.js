const express = require("express");
const homeRouter = require("./routes/home");

// Middlewares
const app = express();
app.use(express.json());

// Routes
app.use("/", homeRouter);

// connection
const port = process.env.PORT || 4001;
app.listen(port, () => console.log(`Listening to port ${port}`));
