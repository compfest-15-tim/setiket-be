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

      const { data: role, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id);

      if (!role) return res.status(404).json("User not found");

      const userRole = role.map((r) => {
        return r.role as string;
      });
      
      if (!userRole) {
        return res.status(403).json({ message: "insufficient role" });
      }

      if (!requiredRoles.includes(userRole[0])) {
        return res.status(403).json({ message: "Forbidden" });
      }

      req.body.userId = data.user?.id;
      next();
    } catch (error) {
      return res.status(500).json({ message: "Internal server error" });
    }
  };
};
