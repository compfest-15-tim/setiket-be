import { supabase } from "../config/db";
import { Request, Response } from "express";

export const signOutService = async (req: Request, res: Response) => {
  // Connect supabase auth
  const { error } = await supabase.auth.signOut();

  // Error
  if (error) {
    res.status(400).json({ message: error.message });
    return;
  }

  // Success
  res
    .cookie("accessToken", undefined, { maxAge: 0 })
    .status(200)
    .json({ message: "Sign out success" });
};
