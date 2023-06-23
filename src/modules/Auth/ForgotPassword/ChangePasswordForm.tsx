import { useEffect, useMemo } from 'react';
import { useTranslation } from 'next-i18next';
import { UseFormRegister, FieldErrors, UseFormWatch, UseFormTrigger } from 'react-hook-form';

import { classes } from 'utils';
import { CheckIcon } from 'components/icons';
import { FormInput, Button } from 'components/shared';
import { PASSWORD_VALIDATE } from 'types/auth.types';
import { ForgotPasswordType } from './forgotPassword.schema';

export const ChangePasswordForm = ({
  register,
  isValid,
  isDirty,
  errors,
  loading,
  isConfirmDirty,
  watch,
  trigger,
}: {
  register: UseFormRegister<ForgotPasswordType>;
  errors: FieldErrors<ForgotPasswordType>;
  watch: UseFormWatch<ForgotPasswordType>;
  trigger: UseFormTrigger<ForgotPasswordType>;
  isValid: boolean;
  isDirty: boolean;
  loading: boolean;
  isConfirmDirty: boolean;
}) => {
  const { t } = useTranslation('auth');
  const { t: trans } = useTranslation('validate-message');

  const password = watch('password');
  const validate = useMemo(() => {
    if (!password)
      return {
        mixture: false,
        min: false,
      };
    const isMixture =
      PASSWORD_VALIDATE.uppercase.regex.test(password) &&
      PASSWORD_VALIDATE.lowercase.regex.test(password) &&
      PASSWORD_VALIDATE.digit.regex.test(password);
    const isMin = password.length >= 8;
    return {
      mixture: isMixture,
      min: isMin,
    };
  }, [password]);

  useEffect(() => {
    if (isConfirmDirty && password && validate.min && validate.mixture) trigger('confirm');
  }, [trigger, password, validate.min, validate.mixture, isConfirmDirty]);

  return (
    <div>
      <div>
        <FormInput<ForgotPasswordType>
          id="password"
          name="password"
          label={t('new_password')}
          placeholder={t('placeholder_new_password')}
          register={register}
          type="password"
          errors={errors}
          required
          maxLength={255}
          showErrorMessage={false}
        />

        <FormInput<ForgotPasswordType>
          id="confirm"
          name="confirm"
          label={t('confirm_password')}
          placeholder={t('placeholder_confirm_password')}
          register={register}
          type="password"
          errors={errors}
          required
          maxLength={255}
          className="mt-7"
          showErrorMessage
        />

        <div className="mt-3 text-lg text-[#B7B7B7]">
          <ul>
            <li
              className={classes(
                'flex items-center',
                validate.min ? 'text-[#5DC887]' : 'text-[#B7B7B7]',
              )}
            >
              <CheckIcon width={14} className="mr-1" />
              {trans('min_8')}.
            </li>
            <li
              className={classes(
                'flex items-center',
                validate.mixture ? 'text-[#5DC887]' : 'text-[#B7B7B7]',
              )}
            >
              <CheckIcon width={14} className="mr-1" />
              {trans('mixture')}.
            </li>
          </ul>
        </div>
      </div>

      <Button
        variant="secondary"
        type="submit"
        block
        className="mt-24 h-12"
        disabled={!isDirty || !isValid}
        size="large"
        loading={loading}
      >
        {t('submit')}
      </Button>
    </div>
  );
};
