import { z } from "zod";

export const schema = z.object({
  fullname: z.string().nonempty({ message: "Fullname is required" }),
  email: z
    .string()
    .email({ message: "Email is invalid" })
    .nonempty({ message: "Email is required" }),
});
