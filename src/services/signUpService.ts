import { supabase } from "../config/db";
import { Request, Response } from "express";
import { type signUpBodySchemaType } from "../dtos/validation.schema";

export const signUpService = () => async (req: Request, res: Response) => {
  // Get data
  const {
    body: { fullName, email, password, role },
  }: signUpBodySchemaType = req;

  try {
    // Connect supabase auth
    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });
    if (error) throw new Error(error.message);

    // Add additional user data to table
    const status = role === "CUSTOMER" ? "VERIFIED" : "PENDING";
    await supabase.from("users").insert({
      email: email,
      full_name: fullName,
      role: role,
      status: status,
      id: data.user?.id!,
    });
  } catch (e) {
    // Errors
    const error = e as Error;
    res.status(400).json({ message: error.message });
  }

  res.status(200).json({ message: "Sign up success" });
};
