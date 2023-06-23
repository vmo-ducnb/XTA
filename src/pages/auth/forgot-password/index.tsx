import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AuthLayout } from 'components/layouts';
import { ForgotPasswordModule } from 'modules/Auth/ForgotPassword';

export default function ForgotPasswordPage() {
  return (
    <AuthLayout>
      <ForgotPasswordModule />
    </AuthLayout>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
