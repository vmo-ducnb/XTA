import { useTranslation } from 'next-i18next';
import { LoginForm } from './LoginForm';
import { AuthenticationLayout } from '../components/AuthenticationLayout';

export const LoginModule = () => {
  const { t } = useTranslation('auth');

  return (
    <AuthenticationLayout
      title={t('login')}
      // content={
      //   <span className="text-lg leading-[144%] text-[#0D1A27]">
      //     {t('login_content_1')} <span className="text-main-400">VIP</span> {t('login_content_2')}
      //   </span>
      // }
    >
      <LoginForm />
    </AuthenticationLayout>
  );
};
