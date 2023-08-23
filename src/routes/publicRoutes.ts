import { Router } from "express";
import { validateSchema } from "../lib/utils";
import { signUpBodySchema } from "../dtos/validation.schema";
import { signUpService } from "../services/signUpService";

export const publicRouter = Router();

// Sign Uo
publicRouter.post(
  "/sign-up",
  validateSchema(signUpBodySchema),
  signUpService()
);

// Sign In
