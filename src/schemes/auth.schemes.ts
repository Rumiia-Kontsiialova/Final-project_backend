import * as z from "zod";

import { emailRegexp, passwordRegexp, usernameRegexp, fullnameRegexp } from "../constants/auth.constants.js"

export const registerSchema = z.object({
    email: z.string().min(1).regex(emailRegexp, "Email must contain @ and not contain spaces"),
    fullname: z.string().min(4, "Fullname must contain at least 4 characters").regex(fullnameRegexp, "Full name may contain only letters and spaces"),
    username: z.string().min(4, "Username must contain at least 4 characters").regex(usernameRegexp, "Username may contain only letters (Latin or Cyrillic), numbers, hyphens and underscores"),
    password: z.string().min(8, "Password must have at least ").regex(passwordRegexp, "Password must gave at least 1 letter and 1 number"),
});

export type RegisterPayload = z.infer<typeof registerSchema>;

export const loginSchema = z.object({
    email: z.string().min(1).regex(emailRegexp, "Email must contain @ and not contain spaces"),
    password: z.string().min(8, "Password must have at least 8 characters").regex(passwordRegexp, "Password must gave at least 1 letter and 1 number"),
});

export type LoginPayload = z.infer<typeof loginSchema>;