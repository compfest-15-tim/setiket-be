import { z } from "zod";
import { Role } from "../types/db.schema";

export const userRegistrationSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(6),
  role: z.enum([Role.CUSTOMER, Role.EVENT_ORGANIZER])
});