import Link from 'next/link';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useMemo, useState } from 'react';
import {
  UseFormRegister,
  FieldErrors,
  UseFormSetError,
  UseFormGetValues,
  UseFormWatch,
} from 'react-hook-form';

import { PASSWORD_VALIDATE, SignUpRequestType } from 'types/auth.types';
import { Button, FormInput, Trans } from 'components/shared';
import authServices from 'src/services/auth.services';
import { FormCheckBox } from 'components/shared/Form/FormCheckBox';
import { ERROR, routes } from 'app-constants';
import { ErrorResponseType } from 'types/common.types';
import { ArrowRightIcon, CheckIcon } from 'components/icons';
import { classes } from 'utils';

export const SignUpForm = ({
  register,
  errors,
  setStep,
  setError,
  getValues,
  isDirty,
  watch,
}: {
  register: UseFormRegister<SignUpRequestType>;
  errors: FieldErrors<SignUpRequestType>;
  setStep: Dispatch<SetStateAction<'register' | 'otp'>>;
  setError: UseFormSetError<SignUpRequestType>;
  getValues: UseFormGetValues<SignUpRequestType>;
  watch: UseFormWatch<SignUpRequestType>;
  isDirty: boolean;
}) => {
  const { t } = useTranslation('auth');
  const { t: trans } = useTranslation('validate-message');

  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    try {
      setLoading(true);
      const email = getValues('email');
      await authServices.preRegister({ email });
      setStep('otp');
      setLoading(false);
    } catch (error) {
      const errorObject = error as AxiosError<ErrorResponseType>;
      const accountExited =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.EXISTS_EMAIL.code;
      if (accountExited) {
        setError('email', { message: 'email_exited' });
      }
      setLoading(false);
    }
  };

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

  return (
    <div className="mt-[55px]">
      <div className="grid grid-cols-2 gap-4">
        <FormInput<SignUpRequestType>
          id="firstName"
          name="firstName"
          label={t('first_name')}
          placeholder={t('placeholder_first_name')}
          register={register}
          errors={errors}
          required
          maxLength={50}
        />
        <FormInput<SignUpRequestType>
          id="lastName"
          name="lastName"
          label={t('last_name')}
          placeholder={t('placeholder_last_name')}
          register={register}
          errors={errors}
          required
          maxLength={50}
        />
      </div>
      <FormInput<SignUpRequestType>
        id="email"
        name="email"
        label={t('email')}
        placeholder={t('placeholder_email')}
        register={register}
        errors={errors}
        required
        maxLength={255}
        className="mt-7"
      />
      <FormInput<SignUpRequestType>
        id="password"
        name="password"
        label={t('password')}
        placeholder={t('placeholder_password')}
        register={register}
        errors={errors}
        type="password"
        required
        maxLength={255}
        className="mt-7"
        showErrorMessage={false}
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
      <FormCheckBox<SignUpRequestType>
        id="agree"
        name="agree"
        label={t('agree')}
        register={register}
        errors={{}}
        required
        className="mt-7"
        labelItem={
          <label
            htmlFor="agree"
            className="ml-2 mt-[2px] block select-none text-lg font-medium leading-[150%] text-[#2B2B2B]"
          >
            {t('agree')}
            <Link href="/" className="ml-1 text-main-primary">
              {t('terms_and_conditions')}
            </Link>
          </label>
        }
      />
      <Button
        type="button"
        variant="secondary"
        block
        className="mt-[136px] h-12"
        size="large"
        loading={loading}
        disabled={
          !(
            isDirty &&
            !(
              errors.email ||
              errors.password ||
              errors.firstName ||
              errors.lastName ||
              errors.agree
            )
          ) || loading
        }
        onClick={onSubmit}
        icon={<ArrowRightIcon />}
        gap="5px"
      >
        <Trans nameSpace="auth" word="next" />
      </Button>
      <div className="mt-5 flex flex-wrap items-center justify-center leading-[150%] text-[#2B2B2B] sm:flex-nowrap">
        <Trans nameSpace="auth" word="have_account" />
        <Link
          href={routes.LOGIN_PAGE}
          className="ml-2 font-medium leading-[150%] text-main-400 underline"
        >
          <Trans nameSpace="auth" word="login_here" />
        </Link>
      </div>
    </div>
  );
};
