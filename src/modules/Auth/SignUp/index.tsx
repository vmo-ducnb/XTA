import { useState } from 'react';
import { AxiosError } from 'axios';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'next-i18next';
import { zodResolver } from '@hookform/resolvers/zod';

import { message } from 'utils';
import { ERROR, routes } from 'app-constants';
import authServices from 'src/services/auth.services';
import { ErrorResponseType } from 'types/common.types';
import { SignUpRequestType, signUpSchema } from 'types/auth.types';

import { SignUpForm } from './SignUpForm';
import { AuthenticationLayout } from '../components/AuthenticationLayout';
import { VerifyForm } from './VerifyForm';

export const SignUpModule = () => {
  const { t } = useTranslation('auth');
  const { t: trans } = useTranslation('validate-message');

  const [step, setStep] = useState<'register' | 'otp'>('register');
  const [loading, setLoading] = useState(false);

  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty, dirtyFields },
    setError,
    getValues,
    watch,
  } = useForm<SignUpRequestType>({
    mode: 'onChange',
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = handleSubmit(async data => {
    try {
      setLoading(true);
      await authServices.register({
        email: data.email,
        password: data.password,
        firstName: data.firstName,
        lastName: data.lastName,
        otp: data.otp,
      });
      message.success(trans('sign_up_success'));
      route.push(routes.LOGIN_PAGE);
      setLoading(false);
    } catch (error) {
      const errorObject = error as AxiosError<ErrorResponseType>;
      const otpIncorrect =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.OTP_INVALID.code;
      const otpExpired =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.OTP_EXPIRED.code;
      if (otpIncorrect) {
        setError('otp', { message: 'otp_incorrect' });
      }
      if (otpExpired) {
        setError('otp', { message: 'otp_expired' });
      }
      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      {step === 'register' && (
        <AuthenticationLayout title={t('sign_up')} content={t('sign_up_content')}>
          <SignUpForm
            register={register}
            errors={errors}
            setStep={setStep}
            isDirty={
              !!(
                dirtyFields.email &&
                dirtyFields.password &&
                dirtyFields.firstName &&
                dirtyFields.lastName &&
                dirtyFields.agree
              )
            }
            setError={setError}
            getValues={getValues}
            watch={watch}
          />
        </AuthenticationLayout>
      )}
      {step === 'otp' && (
        <VerifyForm
          getValues={getValues}
          register={register}
          isValid={isValid}
          errors={errors}
          setStep={setStep}
          isDirty={isDirty}
          loading={loading}
        />
      )}
    </form>
  );
};
