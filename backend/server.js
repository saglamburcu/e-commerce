const app = require("./app");
const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const connectDatabase = require("./db/Database");
const errorMiddleware = require("./middleware/error");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down this server for handling uncaught exception`);
})

// config
dotenv.config({
  path: "backend/config/.env"
});

// connect database
connectDatabase();

app.use(express.json());
app.use(cookieParser())

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);

app.use(errorMiddleware);

// create server
const server = app.listen(process.env.PORT, () => {
  console.log(`Server is working on http://localhost:${process.env.PORT}`)
});

// unhandled promise rejection
process.on("unhandledRejection", (err) => {
  console.log(`Shutting down this server for ${err.message}`);
  console.log(`Shutting down this server due to unhandled promise rejection`);
  server.close(() => {
    process.exit(1)
  });
});