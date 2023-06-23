import { NextSeo, NextSeoProps } from 'next-seo';
import React from 'react';

export const SEO = ({ ...props }: NextSeoProps) => {
  return (
    <NextSeo
      title="XTATUZ"
      titleTemplate="XTATUZ"
      defaultTitle="XTATUZ"
      description="Enjoy luxurious property, high class health service, and VIP class entertainment services."
      openGraph={{
        title: 'Welcome to the World of XTATUZ',
        type: 'website',
        url: 'https://app.xtatuz.com',
        images: [
          {
            url: 'https://www.xtatuz.com/images/og_image.png',
            width: 800,
            height: 420,
            alt: 'XTATUZ',
          },
        ],
        siteName: 'XTATUZ',
        description:
          'Enjoy luxurious property, high class health service, and VIP class entertainment services.',
      }}
      twitter={{
        handle: '',
        site: '',
        cardType: '',
      }}
      {...props}
    />
  );
};
