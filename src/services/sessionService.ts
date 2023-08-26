import { supabase } from "../config/db";
import { Request, Response } from "express";

export const sessionService = async (req: Request, res: Response) => {
  // Get token data
  const bearerHeader = req.headers["authorization"];
  const token = bearerHeader?.split(" ")[1];

  // No token provided
  if (!token || !bearerHeader) {
    res.status(400).json({ message: "No token provided" });
    return;
  }

  // Get user session
  const { data, error } = await supabase.auth.getUser(token);
  console.log(data);

  // Error getting current session, force logout
  if (error) {
    res
      .cookie("accessToken", undefined, {
        maxAge: 0,
        sameSite: "none",
        secure: true,
      })
      .status(400)
      .json({ message: error.message });
    return;
  }

  // Success getting session, session still valid
  res.status(200).json({ message: "Token valid", session: data.user });
};
