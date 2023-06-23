import { useTranslation } from 'next-i18next';
import { motion } from 'framer-motion';
import { useMediaQuery } from 'hooks';

export const MenuToggle = ({ open, toggle }: { open: boolean; toggle: () => void }) => {
  const { t } = useTranslation('common');
  const isSupperSmallScreen = useMediaQuery('(max-width: 320px)');

  return (
    <motion.div initial={false} className="flex items-center" animate={open ? 'open' : 'closed'}>
      <button
        data-collapse-toggle="navbar-sticky"
        type="button"
        className="inline-flex items-center rounded-lg p-2 text-base text-gold focus:outline-none lg:hidden"
        aria-controls="navbar-sticky"
        aria-expanded="false"
        onClick={toggle}
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          className="flex h-5 w-5 items-center justify-center text-current"
        >
          <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            variants={{
              closed: { d: 'M 2 2.5 L 20 2.5' },
              open: { d: 'M 3 16.5 L 17 2.5' },
            }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            d="M 2 9.423 L 20 9.423"
            variants={{
              closed: { opacity: 1 },
              open: { opacity: 0 },
            }}
            transition={{ duration: 0.1 }}
          />
          <motion.path
            fill="transparent"
            strokeWidth="2"
            stroke="currentColor"
            strokeLinecap="round"
            variants={{
              closed: { d: 'M 2 16.346 L 20 16.346' },
              open: { d: 'M 3 2.5 L 17 16.346' },
            }}
          />
        </svg>
        {!isSupperSmallScreen && <span className="ml-2">{t('menu')}</span>}
      </button>
    </motion.div>
  );
};
