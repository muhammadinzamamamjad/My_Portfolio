const express = require('express');
const app = express();
const cors= require('cors');
require('dotenv').config();
const dbConfig = require('./config/dbConfig');
const port = process.env.PORT || 5000;
const portfolioRoutes = require('./routes/portfolioRoute');

const authRoutes = require("./routes/authRoutes");
app.use(cors());
app.use(express.json());


app.use("/api/auth", authRoutes);
app.use('/api/portfolio', portfolioRoutes);
app.listen(5000, () => {
  console.log('Server is running on port 5000');
});