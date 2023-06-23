import 'styles/globals.css';

import type { AppProps } from 'next/app';
import { Work_Sans } from 'next/font/google';
import { appWithTranslation } from 'next-i18next';
import { ToastContainer } from 'react-toastify';

import { useAppLoading } from 'hooks';
import { classes } from 'utils';
// eslint-disable-next-line import/extensions
import nextI18NextConfig from '../../next-i18next.config.js';

const customFont = Work_Sans({ subsets: ['latin'], variable: '--font-custom' });

function App({ Component, pageProps, router }: AppProps) {
  useAppLoading(router);
  return (
    <div className={classes(customFont.variable, 'font-sans')}>
      <Component {...pageProps} key={router.asPath} />
      <ToastContainer />
    </div>
  );
}
export default appWithTranslation(App, nextI18NextConfig);
