import { z } from "zod";

export const schema = z.object({
  fullname: z.string().min(3, { message: "Fullname is required" }),
  email: z.string().email({ message: "Email is invalid" }).endsWith(".com"),
});
