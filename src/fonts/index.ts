import { Alice, Work_Sans } from 'next/font/google';

export const alice = Alice({ weight: '400', subsets: ['latin'], variable: '--font-alice' });
export const workSans = Work_Sans({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin'],
  variable: '--font-worksans',
});
