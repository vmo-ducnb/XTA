import { ReactNode } from 'react';
import { NextSeoProps } from 'next-seo';

import { SEO } from 'components/shared';

interface AuthLayoutProps {
  children: ReactNode;
  seo?: NextSeoProps;
}

export const AuthLayout = ({ children, seo }: AuthLayoutProps) => {
  return (
    <>
      <SEO {...seo} />
      <main className="bg-[#FEFEFE]">{children}</main>
    </>
  );
};
