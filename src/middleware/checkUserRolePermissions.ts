import { supabase } from "../config/db";
import { Request, Response, NextFunction } from "express";

export const checkUserRolePermissions = (requiredRoles: string[]) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const bearerHeader = req.headers["authorization"];
    const token = bearerHeader?.split(" ")[1];

    if (!token || !bearerHeader) {
      return res.status(400).json({ message: "No token provided" });
    }

    try {
      const { data, error } = await supabase.auth.getUser(token);

      if (error) {
        return res
          .cookie("accessToken", undefined, { maxAge: 0 })
          .status(400)
          .json({ message: error.message });
      }

      const { data: user, error: userError } = await supabase
        .from("users")
        .select("*")
        .eq("id", data.user.id)
        .single();

      if (!user) return res.status(404).json("User not found");

      const userRole = user.role;

      if (!userRole) {
        return res.status(403).json({ message: "insufficient role" });
      }
      
      if (!requiredRoles.includes(userRole)) {
        return res.status(403).json({ message: "Forbidden" });
      }
      
      if (req.method !== "GET" ) req.body.userId = data.user?.id;
      next();
    } catch (error) {
      console.log(error)
      return res.status(500).json({ message: `Internal server error` });
    }
  };
};
