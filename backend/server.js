const app = require("./app");
const express = require("express");
const cookieParser = require("cookie-parser");
const product = require("./routes/ProductRoute");
const user = require("./routes/UserRoute");
const order = require("./routes/OrderRoute");
const payment = require("./routes/PaymentRoute");
const connectDatabase = require("./db/Database");
const errorMiddleware = require("./middleware/error");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");
const bodyParser = require("body-parser");
const path = require("path");

// handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`);
  console.log(`Shutting down this server for handling uncaught exception`);
})

// config
if (process.env.NODE_ENV !== "PRODUCTION") {
  require("dotenv").config({
    path: "backend/config/.env"
  })
}

// connect database
connectDatabase();

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true,
}));
app.use(express.json({ extended: false, limit: '50mb' }));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.urlencoded({ limit: '50mb', extended: false, parameterLimit: 50000 }));

app.use("/api", product);
app.use("/api", user);
app.use("/api", order);
app.use("/api", payment);

app.use("/api", createProxyMiddleware({
  target: "http://localhost:3000/",
  changeOrigin: true,
  onProxyRes: function (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
  }
}))

app.use(errorMiddleware);

// const __dirname = path.resolve();
// app.use(express.static(path.join(__dirname, '/frontend/build')));
// app.get('*', (req, res) =>
//   res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// );

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