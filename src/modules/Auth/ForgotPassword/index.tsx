import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { AxiosError } from 'axios';

import { ERROR, routes } from 'app-constants';
import authServices from 'src/services/auth.services';
import { message } from 'utils';
import { ErrorResponseType } from 'types/common.types';
import { ForgotPasswordType, forgotPasswordSchema } from './forgotPassword.schema';
import { EmailForm } from './EmailForm';
import { OtpForm } from './OtpForm';
import { ChangePasswordForm } from './ChangePasswordForm';
import { AuthenticationLayout } from '../components/AuthenticationLayout';

export function ForgotPasswordModule() {
  const { t } = useTranslation('auth');
  const { t: trans } = useTranslation('validate-message');
  const route = useRouter();
  const [loading, setLoading] = useState(false);
  const [step, setStep] = useState<'email' | 'otp' | 'changePassword'>('email');
  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty, dirtyFields },
    setError,
    getValues,
    watch,
    trigger,
  } = useForm<ForgotPasswordType>({
    mode: 'onChange',
    resolver: zodResolver(forgotPasswordSchema),
  });

  const description = {
    email: 'enter_email',
    otp: 'otp_step',
    changePassword: 'password_step',
  };

  const onSubmit = handleSubmit(async data => {
    try {
      setLoading(true);
      await authServices.resetPassword({
        email: data.email,
        otp: data.otp,
        password: data.password,
      });
      message.success(trans('change_password_success'));
      route.push(routes.LOGIN_PAGE);
      setLoading(false);
    } catch (error) {
      const errorObject = error as AxiosError<ErrorResponseType>;
      const otpIncorrect =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.OTP_INVALID.code;
      const newPasswordSameOld =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.DUPLICATE_PASSWORD.code;
      const otpExpired =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.OTP_EXPIRED.code;
      if (otpIncorrect) {
        setStep('otp');
        setError('otp', { message: 'otp_incorrect' });
      }
      if (otpExpired) {
        setStep('otp');
        setError('otp', { message: 'otp_expired' });
      }
      if (newPasswordSameOld) {
        setError('password', { message: 'new_password_same_old' });
      }
      setLoading(false);
    }
  });

  const handleGoBack = () => {
    if (step === 'otp' || step === 'changePassword') {
      setStep(step === 'otp' ? 'email' : 'otp');
      return;
    }
    route.push(routes.LOGIN_PAGE);
  };

  return (
    <AuthenticationLayout
      title={t('forgot_your_password')}
      content={t(description[step])}
      onGoBack={handleGoBack}
      showDownLoadApp={step === 'otp'}
    >
      <div className="mt-[55px]">
        <form onSubmit={onSubmit}>
          {step === 'email' && (
            <EmailForm
              register={register}
              errors={errors}
              setStep={setStep}
              isDirty={!!dirtyFields.email}
              setError={setError}
              getValues={getValues}
            />
          )}
          {step === 'otp' && (
            <OtpForm
              register={register}
              errors={errors}
              setStep={setStep}
              isDirty={!!dirtyFields.otp}
              getValues={getValues}
              watch={watch}
            />
          )}
          {step === 'changePassword' && (
            <ChangePasswordForm
              register={register}
              isValid={isValid}
              errors={errors}
              isDirty={isDirty}
              loading={loading}
              watch={watch}
              trigger={trigger}
              isConfirmDirty={!!dirtyFields.confirm}
            />
          )}
        </form>
      </div>
    </AuthenticationLayout>
  );
}
