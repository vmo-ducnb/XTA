import { z } from 'zod';

import { PASSWORD_VALIDATE } from 'types/auth.types';

export const forgotPasswordSchema = z
  .object({
    email: z.string().min(1, 'required').email({ message: 'email_incorrect' }),
    otp: z.string().min(1, 'required'),
    password: z
      .string()
      .min(1, 'required')
      .max(255)
      .refine(value => {
        return PASSWORD_VALIDATE.uppercase.regex.test(value);
      }, PASSWORD_VALIDATE.uppercase.description)
      .refine(value => {
        return PASSWORD_VALIDATE.lowercase.regex.test(value);
      }, PASSWORD_VALIDATE.lowercase.description)
      .refine(value => {
        return PASSWORD_VALIDATE.digit.regex.test(value);
      }, PASSWORD_VALIDATE.digit.description)
      .refine(value => {
        return value.length >= 8;
      }, 'min_8'),
    confirm: z.string().min(1, 'required'),
  })
  .refine(data => data.password === data.confirm, {
    message: 'confirm_password_incorrect',
    path: ['confirm'],
  });

export type ForgotPasswordType = z.infer<typeof forgotPasswordSchema>;
