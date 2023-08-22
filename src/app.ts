import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { errorMiddleware } from "./middleware/errorMiddleware";
import router from "./routes/publicRoutes";

const app = express();
const port = process.env.PORT || 8000;

dotenv.config();
app.use(cors());

app.use(errorMiddleware)

app.use("/api", router);

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default app;
