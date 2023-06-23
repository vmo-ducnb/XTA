import { z } from 'zod';

export const PASSWORD_VALIDATE = {
  uppercase: { regex: /[A-Z]/, description: 'mixture' },
  lowercase: { regex: /[a-z]/, description: 'mixture' },
  digit: { regex: /[0-9]/, description: 'mixture' },
};

export const loginSchema = z.object({
  email: z.string().min(1, 'required').email({ message: 'email_incorrect' }),
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
});

export type LoginRequestType = z.infer<typeof loginSchema>;

export interface ILoginAndRefreshResponse {
  data: {
    accessToken: string;
    refreshToken: string;
    expires_in: number;
    accessTokenExpire: number;
    refreshTokenExpiry: number;
  };
}

export interface IRefreshToken {
  refreshToken: string;
}

export const signUpSchema = z.object({
  email: z.string().min(1, 'required').max(255).email({ message: 'email_incorrect' }),
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
  firstName: z.string().min(1, 'required').max(50),
  lastName: z.string().min(1, 'required').max(50),
  agree: z.boolean().refine(value => !!value),
  otp: z.string().min(1, 'required'),
});

export type SignUpRequestType = z.infer<typeof signUpSchema>;
export interface ISignUpRequest {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  otp: string;
}

export interface IRegisterResponse {
  success: boolean;
}
export type PreSignUpRequestType = {
  email: string;
};

export interface IPreRegisterResponse {
  data: {
    isSignUp: boolean;
  };
}

export type ResetPasswordRequestType = {
  email: string;
  password: string;
  otp: string;
};
