import { UseFormRegister, FieldErrors, UseFormSetError, UseFormGetValues } from 'react-hook-form';
import { Dispatch, SetStateAction, useState } from 'react';
import { useTranslation } from 'next-i18next';
import { AxiosError } from 'axios';

import { ERROR } from 'app-constants';
import authServices from 'src/services/auth.services';
import { ArrowRightIcon } from 'components/icons';
import { FormInput, Button } from 'components/shared';
import { ErrorResponseType } from 'types/common.types';
import { ForgotPasswordType } from './forgotPassword.schema';

export const EmailForm = ({
  register,
  errors,
  setStep,
  setError,
  getValues,
  isDirty,
}: {
  register: UseFormRegister<ForgotPasswordType>;
  errors: FieldErrors<ForgotPasswordType>;
  setStep: Dispatch<SetStateAction<'email' | 'otp' | 'changePassword'>>;
  setError: UseFormSetError<ForgotPasswordType>;
  getValues: UseFormGetValues<ForgotPasswordType>;
  isDirty: boolean;
}) => {
  const { t } = useTranslation('auth');
  const [loading, setLoading] = useState(false);

  const handleForgotPassword = async () => {
    try {
      setLoading(true);
      const email = getValues('email');
      await authServices.preForgotPassword({ email });
      setStep('otp');
      setLoading(false);
    } catch (error) {
      const errorObject = error as AxiosError<ErrorResponseType>;
      const accountExited =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.NOT_FOUND.code;
      if (accountExited) {
        setError('email', { message: t('email_not_exited') });
      }
      setLoading(false);
    }
  };

  return (
    <div>
      <div>
        <FormInput<ForgotPasswordType>
          id="email"
          name="email"
          label={t('email')}
          placeholder={t('placeholder_email')}
          register={register}
          errors={errors}
          required
          maxLength={255}
        />
      </div>

      <Button
        type="button"
        variant="secondary"
        block
        className="mt-[96px] h-12"
        disabled={!(isDirty && !errors.email) || loading}
        size="large"
        loading={loading}
        onClick={handleForgotPassword}
        icon={<ArrowRightIcon />}
        gap="5px"
      >
        {t('next')}
      </Button>
    </div>
  );
};
