import { z } from 'zod';

// =========================================================================
// SHARED VALIDATION CONSTANTS
// =========================================================================

/**
 * Standard email validation constant.
 * Ensures the value is not empty and conforms to a standard email format.
 */
export const emailValidation = z
  .string()
  .min(1, 'Email is required')
  .email('Invalid email address');

/**
 * Base password validation constant.
 * Standard check for login password constraints (minimum 6 characters).
 */
export const basePasswordValidation = z
  .string()
  .min(6, 'Password must be at least 6 characters');

/**
 * Strong password validation constant.
 * Requires at least 8 characters, one uppercase letter, one number, and one special character.
 */
export const strongPasswordValidation = z
  .string()
  .min(8, 'Password must be at least 8 characters')
  .refine((val) => /[A-Z]/.test(val), {
    message: 'Password must contain at least one uppercase letter',
  })
  .refine((val) => /[0-9]/.test(val), {
    message: 'Password must contain at least one number',
  })
  .refine((val) => /[!@#$%^&*(),.?":{}|<>]/.test(val), {
    message: 'Password must contain at least one special character',
  });

// =========================================================================
// SHARED VALIDATION CUSTOM FUNCTIONS
// =========================================================================

/**
 * A highly reusable superRefine builder to assert that multiple fields in an object match a primary field.
 * Useful for matching password confirmation fields (e.g. matching password with confirmPassword, confirmPassword2, etc.).
 *
 * @param primaryField The target field to compare against (e.g. 'password')
 * @param comparisonFields Array of fields that must equal the primary field
 * @param errorMessage Custom error message to show for mismatching fields (defaults to 'Passwords do not match')
 * @returns SuperRefinement function for use in Zod schemas (.superRefine)
 *
 * @example
 * const schema = z.object({
 *   password: z.string(),
 *   confirmPassword1: z.string(),
 *   confirmPassword2: z.string()
 * }).superRefine(matchFieldsRefinement('password', ['confirmPassword1', 'confirmPassword2']))
 */
export function matchFieldsRefinement<T extends Record<string, unknown>>(
  primaryField: keyof T,
  comparisonFields: (keyof T)[],
  errorMessage = 'Passwords do not match'
) {
  return (data: T, ctx: z.RefinementCtx) => {
    const primaryValue = data[primaryField];
    
    comparisonFields.forEach((field) => {
      if (data[field] !== primaryValue) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: errorMessage,
          path: [field as string],
        });
      }
    });
  };
}
