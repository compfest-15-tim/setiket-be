import { Router } from "express";
import { validateSchema } from "../lib/utils";
import { signInBodySchema, signUpBodySchema } from "../dtos/validation.schema";
import { signUpService } from "../services/signUpService";
import { signInService } from "../services/signInService";
import { sessionService } from "../services/sessionService";
import { signOutService } from "../services/signOutService";

export const publicRouter = Router();

// Sign Up
publicRouter.post("/sign-up", validateSchema(signUpBodySchema), signUpService);

// Sign In
publicRouter.post("/sign-in", validateSchema(signInBodySchema), signInService);

// Sign Out
publicRouter.get("/sign-out", signOutService);

// Check Session
publicRouter.get("/session", sessionService);
