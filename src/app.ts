import cors from "cors";
import dotenv from "dotenv";
import express from "express";
// import { errorMiddleware } from "./middleware/errorMiddleware";
import { publicRouter } from "./routes/publicRoutes";
import bodyParser from "body-parser";
import multer from "multer";

const app = express();
const upload = multer();
dotenv.config();
const port = process.env.PORT || 8000;

// Cors
// IMPORTANT TO WRITE COOKIE IN CLIENT SIDE WITH FETCH!
// ALSO USE CREDENTIALS: "include" IN FETCH!
const corsOptions = {
  origin: process.env.CLIENT_URL,
  credentials: true,
};
app.use(cors(corsOptions));

// Parse FormData in body request
app.use(upload.none());

// Public router
app.use("/api", publicRouter);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
