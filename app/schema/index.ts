import { z } from "zod";

export const UserSchema = z.object({
  firstName: z.string().min(3, { message: "First Name is required" }),
  lastName: z.string().min(3, { message: "Last Name is required" }),
  age: z.string(),
});
