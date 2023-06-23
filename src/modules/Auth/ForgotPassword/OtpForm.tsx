import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useState } from 'react';
import { UseFormRegister, FieldErrors, UseFormGetValues, UseFormWatch } from 'react-hook-form';

import { useCountdown } from 'hooks';
import { classes } from 'utils';
import { FormInput, Button, Trans } from 'components/shared';
import { ArrowRightIcon, LoadingIcon } from 'components/icons';
import authServices from 'src/services/auth.services';
import { ForgotPasswordType } from './forgotPassword.schema';

export const OtpForm = ({
  register,
  errors,
  setStep,
  getValues,
  isDirty,
  watch,
}: {
  register: UseFormRegister<ForgotPasswordType>;
  errors: FieldErrors<ForgotPasswordType>;
  setStep: Dispatch<SetStateAction<'email' | 'otp' | 'changePassword'>>;
  getValues: UseFormGetValues<ForgotPasswordType>;
  watch: UseFormWatch<ForgotPasswordType>;
  isDirty: boolean;
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
      await authServices.preForgotPassword({ email });
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
    <div>
      <div>
        <FormInput<ForgotPasswordType>
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
        type="button"
        variant="secondary"
        block
        className="mt-24 h-12"
        disabled={!(isDirty && !errors.otp) || watch('otp').length < 6}
        onClick={() => setStep('changePassword')}
        size="large"
        icon={<ArrowRightIcon />}
        gap="5px"
      >
        {t('next')}
      </Button>
    </div>
  );
};
