import { ReactNode, useEffect } from 'react';
import { NextSeoProps } from 'next-seo';
import { useAnimationControls, useScroll } from 'framer-motion';

import { SEO } from 'components/shared';
import { Header } from './Header';
import { Footer } from './Footer';
import { ScrollToTopButton } from './ScrollToTopButton';

interface MainLayoutProps {
  children: ReactNode;
  seo?: NextSeoProps;
}

export const MainLayout = ({ children, seo }: MainLayoutProps) => {
  const { scrollYProgress } = useScroll();
  const controls = useAnimationControls();

  useEffect(() => {
    scrollYProgress.on('change', latestValue => {
      if (latestValue > 0.125) {
        controls.start('show');
      } else {
        controls.start('hide');
      }
    });
    return () => {
      scrollYProgress.destroy();
    };
  });

  return (
    <>
      <SEO {...seo} />
      <div className="relative w-full">
        <Header controls={controls} />
        <main>{children}</main>
        <ScrollToTopButton controls={controls} />
        <Footer />
      </div>
    </>
  );
};
