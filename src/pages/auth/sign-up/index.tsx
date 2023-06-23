import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { AuthLayout } from 'components/layouts';
import { SignUpModule } from 'modules/Auth/SignUp';

export default function SignUpPage() {
  return (
    <AuthLayout>
      <SignUpModule />
    </AuthLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
