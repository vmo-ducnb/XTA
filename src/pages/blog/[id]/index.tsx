import Link from 'next/link';
// import { GetStaticProps } from 'next';
// import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

import { routes } from 'app-constants';
import { Button, Container } from 'components/shared';
import { MainLayout } from 'components/layouts';

export default function BlogPage() {
  const linkToDetail = routes.BLOG_PAGE.replace('{id}', '2');

  return (
    <MainLayout>
      <div className="lg:bg-black">
        <Container className="flex flex-col items-center justify-center gap-6">
          <Link href="/">
            <Button variant="secondary">Home</Button>
          </Link>
          <Link href={`/${linkToDetail}`}>
            <Button variant="tertiary">Blog 2</Button>
          </Link>
          <h1>Button primary</h1>
          <Button variant="primary">Primary</Button>
          <Button variant="primary" loading>
            Primary loading
          </Button>
          <Button variant="primary" disabled>
            Primary disable
          </Button>

          <h1>Button Secondary</h1>
          <Button variant="secondary">Secondary</Button>
          <Button variant="secondary" loading>
            Secondary loading
          </Button>
          <Button variant="secondary" disabled>
            Secondary disable
          </Button>

          <h1>Button secondary</h1>
          <Button variant="tertiary">Tertiary</Button>
          <Button variant="tertiary" loading>
            Tertiary loading
          </Button>
          <Button variant="tertiary" disabled>
            Tertiary disable
          </Button>
        </Container>
      </div>
    </MainLayout>
  );
}

// export const getStaticProps: GetStaticProps = async ({ locale }) => ({
//   props: {
//     ...(await serverSideTranslations(locale ?? 'en')),
//   },
// });
