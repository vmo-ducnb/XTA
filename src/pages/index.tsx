import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { MainLayout } from 'components/layouts';
import { MainPage } from 'modules/Main';

export default function Home() {
  return (
    <MainLayout>
      <MainPage />
    </MainLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale ?? 'en')),
  },
});
