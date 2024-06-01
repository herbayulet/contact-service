import { z } from "zod";

const MAX_FILE_SIZE = 5000000;
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];

export const UserSchema = z.object({
  firstName: z
    .string({ required_error: "first name is required" })
    .min(1, "mohon di isi first name nya"),
  lastName: z
    .string({ required_error: "last name is required" })
    .min(1, "mohon di isi last name nya"),
  age: z.coerce
    .number({ invalid_type_error: "make sure age is valid" })
    .gt(0, "mohon di isi umur nya"),
});

export type SchemaUser = z.infer<typeof UserSchema>;
