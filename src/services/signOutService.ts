import { supabase } from "../config/db";
import { Request, Response } from "express";
import { getClientDomain } from "../lib/utils";

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
    .cookie("accessToken", undefined, {
      maxAge: 0,
      sameSite: "none",
      secure: true,
      // domain: getClientDomain(),
      path: "/",
    })
    .status(200)
    .json({ message: "Sign out success" });
};
