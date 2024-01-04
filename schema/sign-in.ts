import { TypeOf, object, string } from "zod";

export const singinSchema = object({
  phone: string({ required_error: "Phone is required" }),
  password: string({ required_error: "Password is required" })
});

export type SignInFormInput = TypeOf<typeof singinSchema>;