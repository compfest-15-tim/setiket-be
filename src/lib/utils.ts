import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";
import dotenv from "dotenv";

dotenv.config();

export const validateSchema =
  (schema: AnyZodObject) =>
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      // Parse
      await schema.parseAsync({
        body: req.body,
        query: req.query,
        params: req.params,
      });
      return next();
    } catch (e) {
      // Error
      return res.status(400).json({ message: "Invalid data input!" });
    }
  };

export const getClientDomain = () => {
  // Development
  if (process.env.NODE_ENV == "development") return "localhost";

  // Production
  const clientUrl = process.env.CLIENT_URL + "";
  return clientUrl.replace(/^https?:\/\//, "");
};
