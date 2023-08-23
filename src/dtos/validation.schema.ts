import { z } from "zod";

export const signUpBodySchema = z.object({
  body: z.object({
    email: z.string().email(),
    fullName: z.string(),
    password: z.string().min(8),
    role: z.enum(["CUSTOMER", "EVENT_ORGANIZER"]),
  }),
});
export type signUpBodySchemaType = z.TypeOf<typeof signUpBodySchema>;

export const signInBodySchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export type signInBodySchemaType = z.TypeOf<typeof signUpBodySchema>;
