import type { NextFunction, Request, Response } from "express";
import type { AnyZodObject } from "zod";

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
