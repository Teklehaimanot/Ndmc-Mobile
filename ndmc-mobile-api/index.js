const express = require("express");
const app = express();
require("dotenv").config();

app.use(express.json());
app.get("/", (req, res) => {
  res.send("we are on home page");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server is running on port ${port}`));
