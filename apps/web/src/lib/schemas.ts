import { z } from "zod";
// import { object, string } from "zod";

export const signupFormSchema = z
  .object({
    name: z.string().min(2).max(50),
    email: z.string().email(),
    password: z.string().min(8),
    passwordConfirmation: z.string().min(8),
  })
  .refine((data) => data.password === data.passwordConfirmation, {
    message: "Passwords don't match",
    path: ["passwordConfirmation"],
  });

// export const signinFormSchema = object({
//   email: string({ required_error: "Email is required" })
//     .min(1, "Email is required")
//     .email("Invalid email"),
//   password: string({ required_error: "Password is required" })
//     .min(1, "Password is required")
//     .min(6, "Password must be more than 6 characters")
//     .max(32, "Password must be less than 32 characters"),
// });

export const signinFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});
