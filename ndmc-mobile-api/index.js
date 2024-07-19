const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

// app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

const corsOptions = {
  origin: "http://localhost:3000",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
  credentials: true,
  allowedHeaders: ["Content-Type", "Authorization"], // add any other headers your client sends
};

// Apply CORS middleware globally
app.use(cors(corsOptions));

// Handle preflight requests for all routes
app.options("*", cors(corsOptions));

app.get("/", (req, res) => {
  res.send("We are on the home page");
});

app.use("/api/v1/user", require("./routes/userRoutes"));
app.use("/api/v1/news", require("./routes/newsRoutes"));
app.use("/api/v1/evidenceBrief", require("./routes/evidenceBriefRoute"));
app.use("/api/v1/aboutNdmc", require("./routes/aboutNdmcRoute"));
app.use("/api/v1/collaborator", require("./routes/collaboratorRoute"));
app.use("/api/v1/researches", require("./routes/pubMedRoute"));

mongoose.connect(process.env.DB_CONNECTION, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to MongoDB");
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
