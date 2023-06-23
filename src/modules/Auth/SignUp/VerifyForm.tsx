import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormGetValues } from 'react-hook-form';

import { classes } from 'utils';
import { useCountdown } from 'hooks';
import { LoadingIcon } from 'components/icons';
import { FormInput, Button, Trans } from 'components/shared';
import authServices from 'src/services/auth.services';
import { SignUpRequestType } from 'types/auth.types';
import { AuthenticationLayout } from '../components/AuthenticationLayout';

export const VerifyForm = ({
  register,
  errors,
  setStep,
  getValues,
  isDirty,
  isValid,
  loading,
}: {
  getValues: UseFormGetValues<SignUpRequestType>;
  register: UseFormRegister<SignUpRequestType>;
  isValid: boolean;
  errors: FieldErrors<SignUpRequestType>;
  setStep: Dispatch<SetStateAction<'register' | 'otp'>>;
  isDirty: boolean;
  loading: boolean;
}) => {
  const { t } = useTranslation('auth');
  const [resending, setResending] = useState(false);
  const [count, { startCountdown, resetCountdown }] = useCountdown({
    countStart: 60,
    intervalMs: 1000,
  });

  const handleResend = async () => {
    try {
      setResending(true);
      const email = getValues('email');
      await authServices.preRegister({ email });
      resetCountdown();
      startCountdown();
      setTimeout(() => {
        setResending(false);
      }, 1000);
    } catch (error) {
      resetCountdown();
      setResending(false);
    }
  };

  return (
    <AuthenticationLayout
      title={t('enter_otp')}
      content={t('otp_description')}
      onGoBack={() => setStep('register')}
      showDownLoadApp
    >
      <div className="mt-[55px]">
        <div>
          <FormInput<SignUpRequestType>
            id="otp"
            name="otp"
            label={t('otp_code')}
            placeholder={t('placeholder_otp')}
            register={register}
            errors={errors}
            required
            maxLength={6}
          />
        </div>

        <div className="mt-6 flex justify-end">
          <button
            type="button"
            disabled={(count < 60 && count > 0) || resending}
            onClick={handleResend}
            className="flex items-center text-lg font-medium leading-[20px] text-main-primary"
          >
            <LoadingIcon className={classes('mr-2', resending ? 'animate-spin' : '')} />
            <Trans nameSpace="auth" word="re_send" />{' '}
            <span className="ml-2 text-[#737373]">
              {count < 60 && count > 0 ? `00:${`0${count}`.slice(-2)}` : null}
            </span>
          </button>
        </div>
        <Button
          type="submit"
          variant="secondary"
          block
          className="mt-24 h-12"
          disabled={!isDirty || !isValid}
          size="large"
          loading={loading}
        >
          {t('submit')}
        </Button>
      </div>
    </AuthenticationLayout>
  );
};
