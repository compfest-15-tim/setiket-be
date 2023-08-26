import { supabase } from "../config/db";
import { Request, Response } from "express";
import { type signInBodySchemaType } from "../dtos/validation.schema";

export const signInService = async (req: Request, res: Response) => {
  // Get data
  const {
    body: { email, password },
  }: signInBodySchemaType = req;

  // Connect supabase auth
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email,
    password: password,
  });
  console.log(data);

  // If error
  if (error) {
    res.status(400).json({ message: error.message, session: null });
    return;
  }

  // Success
  // User data store in session variable
  res
    .cookie("accessToken", data.session!.access_token, {
      httpOnly: true,
      sameSite: "none",
      secure: true,
    })
    .status(200)
    .json({
      message: "Sign in success",
      session: data.user,
    });
};
