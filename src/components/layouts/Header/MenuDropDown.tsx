import { useRef } from 'react';
import { deleteCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/router';

import { useOnClickOutside, useToggle } from 'hooks';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'app-constants';
import { classes } from 'utils';

export const MenuDropDown = () => {
  const { t } = useTranslation('common');
  const [open, toggle, setOpen] = useToggle();
  const menuRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useOnClickOutside(menuRef, () => {
    setOpen(false);
  });

  const handleLogout = async () => {
    try {
      deleteCookie(ACCESS_TOKEN);
      deleteCookie(REFRESH_TOKEN);
      router.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="hidden h-full w-[6rem] lg:block">
      <div className="relative h-full" ref={menuRef}>
        <motion.div
          initial={false}
          className={classes(
            'flex h-full items-center',
            open ? 'bg-white/10 text-white backdrop-blur-md' : '',
          )}
          animate={open ? 'open' : 'closed'}
        >
          <button
            data-collapse-toggle="navbar-sticky"
            type="button"
            className="mx-auto inline-flex items-center rounded-lg p-2 text-base text-gold focus:outline-none"
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
            <span className="ml-2">{t('menu')}</span>
          </button>
        </motion.div>
        <AnimatePresence>
          {open && (
            <motion.ul
              initial={{ opacity: 0, y: -10 }}
              animate={{
                opacity: 1,
                y: 0,
              }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ type: 'spring', bounce: 0.4, duration: 0.5 }}
              className="absolute w-full bg-[rgba(19,_20,_21,_0.6)] text-white shadow backdrop-blur-md"
            >
              <motion.li className={classes('relative cursor-pointer select-none rounded-lg p-2 ')}>
                <span className="block truncate text-base !font-medium normal-case hover:!font-semibold hover:text-gold">
                  {t('profile')}
                </span>
              </motion.li>
              <motion.li
                className={classes('relative cursor-pointer select-none rounded-lg p-2 ')}
                onClick={handleLogout}
              >
                <span className="block truncate text-base !font-medium normal-case hover:!font-semibold hover:text-gold">
                  {t('log_out')}
                </span>
              </motion.li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};
