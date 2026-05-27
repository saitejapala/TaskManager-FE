import { z } from 'zod';
import {
  emailValidation,
  basePasswordValidation,
  strongPasswordValidation,
  matchFieldsRefinement,
} from '@shared/validations';

// ==========================================
// SCHEMAS COMPOSED FROM SHARED VALIDATIONS
// ==========================================

export const signInSchema = z.object({
  email: emailValidation,
  password: basePasswordValidation,
});

export const signUpSchema = z
  .object({
    fullName: z
      .string()
      .min(2, 'Name must be at least 2 characters')
      .max(50, 'Name must be under 50 characters'),
    email: emailValidation,
    password: strongPasswordValidation,
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  // Use our new reusable multi-field validation refinement helper
  .superRefine(matchFieldsRefinement('password', ['confirmPassword']));

export const otpSchema = z.object({
  otp: z
    .string()
    .length(6, 'OTP must be exactly 6 digits')
    .regex(/^\d+$/, 'OTP must be numeric'),
});

export type SignInInput = z.infer<typeof signInSchema>;
export type SignUpInput = z.infer<typeof signUpSchema>;
export type OtpInput = z.infer<typeof otpSchema>;
export type OtpFormInput = z.infer<typeof otpSchema>;
