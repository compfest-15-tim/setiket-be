import { supabase } from "../config/db";
import { Request, Response } from "express";
import { type signInBodySchemaType } from "../dtos/validation.schema";

export const signInService = async (req: Request, res: Response) => {
  // Get data
  const {
    body: { email, password },
  }: signInBodySchemaType = req;

  try {
    // Connect supabase auth
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });
    if (error) throw new Error(error.message);

    // Add additional user data to table
  } catch (e) {
    // Errors
    const error = e as Error;
    res.status(400).json({ message: error.message });
  }

  res.status(200).json({ message: "Sign in success" });
};
