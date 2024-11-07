// validationSchema.js
import { z } from "zod";

export const nameSchema = z
  .string()
  .min(2, { message: "Name must be at least 2 characters long" })
  .max(30, { message: "Name cannot exceed 30 characters" });

export const emailSchema = z
  .string()
  .email({ message: "Please enter a valid email" });

export const passwordSchema = z
  .string()
  .min(8, { message: "Password must be at least 8 characters long" })
  .regex(/[A-Z]/, {
    message: "Password must contain at least one uppercase letter",
  })
  .regex(/[0-9]/, { message: "Password must contain at least one number" });

export const formSchema = z.object({
  name: nameSchema,
  email: emailSchema,
  password: passwordSchema,
});
