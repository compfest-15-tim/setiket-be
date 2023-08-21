import express, { Request, Response, Application } from "express";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app: Application = express();
const port = process.env.PORT || 8000;

app.use(cors);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Express & TypeScript Server");
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
