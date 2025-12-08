import express from "express";
import cors from "cors";
import salesRouter from "./routes/sales.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import { createIndexes } from "./config/indexes.js";

createIndexes();
const app = express();

const allowedOrigins = [
  "http://localhost:5173"
];

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use("/api/sales", salesRouter);

app.get("/api/health", (req, res) => {
  res.json({ status: "Server running" });
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});

app.use(errorHandler);
