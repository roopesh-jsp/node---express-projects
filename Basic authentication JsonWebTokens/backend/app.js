const express = require("express");
const connectDb = require("./connectDB");
const dotenv = require("dotenv").config();
const app = express();
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");

app.use(express.json());

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:5173");
//   res.setHeader(
//     "Access-Control-Allow-Methods",
//     "GET, POST, OPTIONS, PUT, DELETE"
//   );
//   res.setHeader("Access-Control-Allow-Headers", "Content-Type, Authorization");
//   next();
// });

app.use(cors({ origin: "http://localhost:5173", credentials: true }));

app.use(authRoutes);

app.use((err, req, res, nxt) => {
  const status = err.statusCode || 500;
  console.log(err);
  res.status(status).json({ message: err.message });
});
app.listen(process.env.PORT, () => {
  connectDb();
  console.log("app is running", process.env.PORT);
});
