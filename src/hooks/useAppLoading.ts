import { useEffect } from 'react';
import NProgress from 'nprogress';
import { Router } from 'next/router';

export const useAppLoading = (router: Router) => {
  useEffect(() => {
    const handleRouteStart = () => NProgress.start();
    const handleRouteDone = () => NProgress.done();
    NProgress.configure({ showSpinner: false });

    router.events.on('routeChangeStart', handleRouteStart);
    router.events.on('routeChangeComplete', handleRouteDone);
    router.events.on('routeChangeError', handleRouteDone);

    return () => {
      router.events.off('routeChangeStart', handleRouteStart);
      router.events.off('routeChangeComplete', handleRouteDone);
      router.events.off('routeChangeError', handleRouteDone);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
