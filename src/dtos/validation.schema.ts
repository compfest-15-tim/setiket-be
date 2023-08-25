import { z } from "zod";

// export const userRegistrationSchema = z.object({
//   fullName: z.string().min(3),
//   email: z.string().email(),
//   password: z.string().min(6),
//   role: z.enum([Role.CUSTOMER, Role.EVENT_ORGANIZER]),
// });

export const eventCreationSchema = z.object({
  title: z.string().min(1),
  description: z.string(),
  // is_verified: z.boolean(),
  date: z.string().datetime(),
  location: z.string().min(1),
  capacity: z.string().min(1),
  price: z.string().min(0),
});

export const createEventParamsSchema = z.object({
  eventData: eventCreationSchema,
  images: z.array(z.string()), // Assuming imageUrls is an array of strings
});

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
export type signInBodySchemaType = z.TypeOf<typeof signInBodySchema>;

