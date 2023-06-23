import { memo, useRef } from 'react';
import { Variants, motion, AnimationControls } from 'framer-motion';

import { ChevronDownIcon } from 'components/icons';

const ScrollToTopContainerVariants: Variants = {
  hide: { opacity: 0 },
  show: { opacity: 1 },
};

export interface ScrollToTopButtonProps {
  controls: AnimationControls;
}

export const ScrollToTopButton = memo(({ controls }: ScrollToTopButtonProps) => {
  const button = useRef<HTMLButtonElement>(null);

  const scrollToTop = () => {
    window?.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <motion.button
      className="fixed bottom-8 right-8 flex h-10 w-10 items-center justify-center rounded-full bg-[rgba(19,_20,_21,_0.6)] text-gold backdrop-blur-md"
      variants={ScrollToTopContainerVariants}
      initial="hide"
      animate={controls}
      onClick={scrollToTop}
      ref={button}
      aria-label="Scroll To Top"
      transition={{ type: 'spring', duration: 0.25 }}
    >
      <ChevronDownIcon className="rotate-180" />
    </motion.button>
  );
});
