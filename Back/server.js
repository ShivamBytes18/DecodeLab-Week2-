const express = require("express");
const cors = require("cors");


require("dotenv").config();

console.log("EMAIL =", process.env.EMAIL);
console.log("APP_PASSWORD =", process.env.APP_PASSWORD);
const contactRoutes = require("./routes/contactRoutes");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/contact", contactRoutes);

const PORT = 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});