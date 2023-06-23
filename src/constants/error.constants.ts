export const ERROR = {
  USER: {
    NOT_FOUND: {
      code: 'us_0001',
      message: 'User not found.',
    },
    INCORRECT_EMAIL_OR_PASSWORD: {
      code: 'us_0002',
      message: 'Incorrect email or password.',
    },
    EXISTS_EMAIL: {
      code: 'us_0003',
      message: 'This email is already in use.',
    },
    NOT_DELETED: {
      code: 'us_0004',
      message: 'Not delete user joined the conference.',
    },
    OTP_INVALID: {
      code: 'us_0005',
      message: 'OTP code is incorrect',
    },
    OTP_LENGTH: {
      code: 'us_0006',
      message: `OTP must have 6 characters`,
    },
    DUPLICATE_PASSWORD: {
      code: 'us_0007',
      message: 'The new password is duplicated with the current password',
    },
    FORMAT_PASSWORD: {
      code: 'us_0008',
      message: `Password must have at least 8 number, uppercase letter, and lowercase letter`,
    },
    OTP_EXPIRED: {
      code: 'us_0009',
      message: 'The OTP is expired',
    },
  },
};
