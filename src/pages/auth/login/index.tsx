import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { AuthLayout } from 'components/layouts';
import { LoginModule } from 'modules/Auth/Login';

export default function LoginPage() {
  return (
    <AuthLayout>
      <LoginModule />
    </AuthLayout>
  );
}
export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
