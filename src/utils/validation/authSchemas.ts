import * as yup from "yup";

export const loginSchema = yup.object({
  email: yup.string().email("Invalid email").required("Email is required"),

  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
});

export type LoginSchema = yup.InferType<typeof loginSchema>;

export const registerSchema = yup.object({
  name: yup
    .string()
    .min(2, "Name must be at least 4 characters")
    .required("Name is required"),

  email: yup
    .string()
    .email("Enter a valid email address")
    .required("Email is required"),

  password: yup
    .string()
    .required(
      "Password must 6 characters and contain at least one uppercase letter, one number, and one special character",
    )
    .min(
      6,
      "Password must contain at least one uppercase letter, one number, and one special character",
    )
    .matches(
      /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&^#()_\-+=\[\]{};:'"\\|,.<>\/~`]).*$/,
      "Password must contain at least one uppercase letter, one number, and one special character",
    ),

  confirmPassword: yup
    .string()
    .required("Please confirm your password")
    .oneOf([yup.ref("password")], "Passwords do not match"),
});

export type RegisterSchema = yup.InferType<typeof registerSchema>;
