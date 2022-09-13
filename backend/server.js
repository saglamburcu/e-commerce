const app = require("./app");
const dotenv = require("dotenv");
const express = require("express");
const router = require("./routes/ProductRoute");
const connectDatabase = require("./db/Database");

// config
dotenv.config({
  path: "backend/config/.env"
});

// connect database
connectDatabase();

app.use(express.json())

app.use("/api", router)

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
});