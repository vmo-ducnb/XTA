import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import Link from 'next/link';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { AxiosError } from 'axios';
import { useTranslation } from 'next-i18next';

import { LoginRequestType, loginSchema } from 'types/auth.types';
import { Button, FormInput, Trans } from 'components/shared';
import authServices from 'src/services/auth.services';
import { ACCESS_TOKEN, ERROR, REFRESH_TOKEN, routes } from 'app-constants';
import { message } from 'utils';
import { ErrorResponseType } from 'types/common.types';
import { ArrowTopRightIcon } from 'components/icons';

export const LoginForm = () => {
  const { t } = useTranslation('auth');
  const { t: trans } = useTranslation('validate-message');
  const [loading, setLoading] = useState(false);
  const route = useRouter();

  const {
    register,
    handleSubmit,
    formState: { isValid, errors, isDirty },
    setError,
  } = useForm<LoginRequestType>({
    mode: 'onChange',
    resolver: zodResolver(loginSchema),
  });
  const onSubmit = handleSubmit(async data => {
    try {
      setLoading(true);
      const res = await authServices.login(data);
      setCookie(ACCESS_TOKEN, res.data.accessToken, {
        expires: new Date(Date.now() + res.data.accessTokenExpire * 1000),
      });
      setCookie(REFRESH_TOKEN, res.data.refreshToken, {
        expires: new Date(Date.now() + res.data.refreshTokenExpiry * 1000),
      });
      message.success(trans('login_success'));
      route.push('/');
      setLoading(false);
    } catch (error) {
      const errorObject = error as AxiosError<ErrorResponseType>;
      const userNotfound =
        errorObject?.response?.data?.errors?.[0]?.code === ERROR.USER.NOT_FOUND.code;
      const wrongPassword =
        errorObject?.response?.data?.errors?.[0]?.code ===
        ERROR.USER.INCORRECT_EMAIL_OR_PASSWORD.code;

      if (wrongPassword) {
        setError('password', { message: t('email_password_incorrect') });
        setError('email', { message: t('email_password_incorrect') });
      }
      if (userNotfound) {
        setError('email', { message: t('email_not_exited') });
      }

      setLoading(false);
    }
  });

  return (
    <form onSubmit={onSubmit}>
      <FormInput<LoginRequestType>
        id="email"
        name="email"
        label={t('email')}
        placeholder={t('placeholder_email')}
        register={register}
        errors={errors}
        required
        maxLength={255}
        className="mt-[67px]"
      />
      <FormInput<LoginRequestType>
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
      />
      <div className="mt-4 flex justify-end">
        <Link
          href={routes.FORGOT_PASSWORD_PAGE}
          className="text-lg font-medium leading-[20px] text-[#7E7E7E] underline"
        >
          <Trans nameSpace="auth" word="forgot_password" />
        </Link>
      </div>
      <Button
        type="submit"
        variant="secondary"
        block
        className="mt-56 h-12"
        size="large"
        loading={loading}
        disabled={!isDirty || !isValid}
        icon={<ArrowTopRightIcon />}
      >
        <Trans nameSpace="auth" word="login" />
      </Button>
      <div className="mt-5 flex flex-wrap items-center justify-center leading-[150%] text-[#2B2B2B] sm:flex-nowrap">
        <Trans nameSpace="auth" word="no_account" />
        <Link
          href={routes.SIGN_UP_PAGE}
          className="ml-2 font-medium leading-[150%] text-main-400 underline"
        >
          <Trans nameSpace="auth" word="sign_up_here" />
        </Link>
      </div>
    </form>
  );
};
