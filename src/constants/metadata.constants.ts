import { Metadata } from 'next';

export const DEFAULT_METADATA: Metadata = {
  title: 'XTATUZ',
  description:
    'Enjoy luxurious property, high class health service, and VIP class entertainment services.',
  keywords: 'XTATUZ, Healthcare, Property, Entertainment, Concierge, Tradable, Community',
  robots: 'index,follow',
  classification: 'Business',
  openGraph: {
    title: 'Welcome to the World of XTATUZ',
    type: 'website',
    url: 'https://app.xtatuz.com',
    images: 'https://www.xtatuz.com/images/og_image.png',
    siteName: 'XTATUZ',
    description:
      'Enjoy luxurious property, high class health service, and VIP class entertainment services.',
  },
  twitter: {
    title: 'Welcome to the World of XTATUZ',
    card: 'summary',
    images: 'https://www.xtatuz.com/images/og_image.png',
    description:
      'Enjoy luxurious property, high class health service, and VIP class entertainment services.',
  },
};

export const ACCESS_TOKEN = 'ACCESS_TOKEN';
export const REFRESH_TOKEN = 'REFRESH_TOKEN';
export const I18N = 'i18next';
