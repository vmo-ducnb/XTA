import { memo, useRef, useState } from 'react';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';
import { AnimatePresence, motion } from 'framer-motion';

import { useOnClickOutside, useToggle } from 'hooks';
import { classes } from 'utils';
import { GlobalIcon } from 'components/icons';

export const LanguageSwitcher = memo(() => {
  const [open, toggle, setOpen] = useToggle();
  const { i18n } = useTranslation();
  const { language: currentLanguage } = i18n;
  const router = useRouter();
  const locales = router.locales ?? [currentLanguage];
  const menuRef = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(i18n.language);

  useOnClickOutside(menuRef, () => {
    setOpen(false);
  });

  const switchToLocale = (locale: string) => {
    const path = router.asPath;
    return router.push(path, path, { locale });
  };

  const languageChanged = async (option: string) => {
    setValue(option);
    setOpen(false);
    await switchToLocale(option);
  };

  return (
    <div className="h-full w-[5rem]">
      <div className="relative h-full" ref={menuRef}>
        <button
          type="button"
          className={classes(
            'focus-visible:border-primary-500 relative flex h-full w-full cursor-pointer items-center justify-center text-left text-base text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm',
            open ? 'bg-white/10 text-gold backdrop-blur-md' : '',
          )}
          onClick={toggle}
        >
          <GlobalIcon />
        </button>
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
              {locales.map(locale => {
                const option = {
                  value: locale,
                  label: locale === 'en' ? 'English' : 'Thai',
                };
                return (
                  <motion.li
                    key={locale}
                    className={classes(
                      'relative cursor-pointer select-none rounded-lg p-2 ',
                      value === option.value ? 'text-gold' : 'text-white',
                    )}
                    onClick={() => languageChanged(option.value)}
                  >
                    <span className="block truncate text-base !font-medium normal-case hover:!font-semibold hover:text-gold">
                      {option.label}
                    </span>
                  </motion.li>
                );
              })}
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
});
