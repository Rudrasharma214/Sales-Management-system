import express from "express";
import cors from "cors";
import salesRouter from "./routes/sales.routes.js";
import errorHandler from "./middleware/error.middleware.js";
import { createIndexes } from "./config/indexes.js";
import { sendResponse } from "./utils/sendResponse.js";
import STATUS from "./utils/statusCode.js";
import dotenv from "dotenv";
dotenv.config({quiet: true});

const port = process.env.PORT || 3000;

createIndexes();
const app = express();

const allowedOrigins = process.env.FRONTEND_URL ? [process.env.FRONTEND_URL] : [];

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
  sendResponse(res, STATUS.OK, "API is healthy", { status: "OK" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

app.use(errorHandler);
