import { TypeOf, object, string } from "zod";

export const signupSchema = object({
  username: string({ required_error: "Username is required" }),
  phone: string({ required_error: "Phone is required" }),
  password: string({ required_error: "Password is required" })
});

export type SignUpFormInput = TypeOf<typeof signupSchema>;