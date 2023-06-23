import Link from 'next/link';
import { useRouter } from 'next/router';
import { motion, Variants, AnimationControls } from 'framer-motion';
import { v4 as uuidv4 } from 'uuid';
import { deleteCookie, getCookie } from 'cookies-next';
import { useTranslation } from 'next-i18next';

import { Logo, ArrowRightIcon } from 'components/icons';
import { Container, Button } from 'components/shared';

import { useMediaQuery, useToggle } from 'hooks';
import { Drawer } from 'components/shared/Drawer';
import { ACCESS_TOKEN, REFRESH_TOKEN, routes } from 'app-constants';

import { classes } from 'utils';

import { alice } from 'fonts';
import { navbar } from './Header.constants';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MenuDropDown } from './MenuDropDown';
import { MenuToggle } from './MenuToggle';

const navbarVariants: Variants = {
  hide: {
    paddingTop: '15px',
    paddingBottom: '15px',
    background: 'none',
    backdropFilter: 'none',
  },
  show: {
    paddingTop: '0px',
    paddingBottom: '0px',
    background: 'rgba(19, 20, 21, 0.6)',
    backdropFilter: 'blur(10px)',
  },
};

export interface HeaderProps {
  controls: AnimationControls;
}

export const Header = ({ controls }: HeaderProps) => {
  const router = useRouter();
  const { t } = useTranslation('home');
  const { t: trans } = useTranslation('common');
  const [open, toggle, setOpen] = useToggle();
  const accessToken = getCookie(ACCESS_TOKEN);

  const isSmallScreen = useMediaQuery('(max-width: 420px)');
  const isSupperSmallScreen = useMediaQuery('(max-width: 320px)');

  const closeAside = () => setOpen(false);

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
    <>
      <motion.header
        className={classes('fixed z-50 w-screen')}
        variants={navbarVariants}
        initial="hide"
        animate={controls}
        transition={{ type: 'spring', duration: 0.25 }}
      >
        <Container className="relative flex h-[52px] w-full items-center justify-between px-4">
          <Link href="/">
            <Logo width={isSmallScreen ? 120 : 185} />
          </Link>
          <div className="flex h-full items-center justify-center">
            <div
              className="hidden h-full w-full items-center justify-between lg:order-1 lg:flex lg:w-auto"
              id="navbar-sticky"
            >
              <ul className="flex h-full flex-col border border-gray-100 lg:mt-0 lg:flex-row lg:border-0 lg:text-sm lg:font-medium">
                {navbar.map((item, i) => {
                  const isActive = router.pathname === item.path;
                  return (
                    <li key={i} className="h-full">
                      <Link
                        href={item.path}
                        className={classes(
                          'flex h-full items-center py-2 text-base',
                          alice.className,
                          isActive
                            ? 'bg-gold text-white lg:bg-transparent lg:text-gold'
                            : 'text-white hover:bg-gray-100 lg:hover:bg-transparent lg:hover:text-gold',
                        )}
                      >
                        <span className={classes('border-r border-white px-8')}>
                          {t(item.name)}
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex h-full items-center justify-between lg:order-2">
              <div className="hidden px-8 sm:flex">
                <Link href="/" className="text-base font-medium leading-7 text-gold">
                  {t('download_app')}
                </Link>
                <ArrowRightIcon className="text-gold" />
              </div>
              {!accessToken ? (
                <Link className="hidden lg:block" href={routes.LOGIN_PAGE}>
                  <Button className="h-8 w-[96px] border-gold text-gold hover:border-gold hover:text-gold focus:border-gold">
                    {trans('log_in')}
                  </Button>
                </Link>
              ) : (
                <MenuDropDown />
              )}
              <MenuToggle open={open} toggle={toggle} />
              <LanguageSwitcher />
            </div>
          </div>
        </Container>
      </motion.header>

      <Drawer isOpen={open} toggle={toggle}>
        <div className="flex justify-between">
          <Link href="/" onClick={closeAside}>
            <Logo width={isSmallScreen ? 120 : 185} className="ml-[20px] lg:ml-[15px] xl:ml-0" />
          </Link>
          {isSupperSmallScreen && <MenuToggle open={open} toggle={toggle} />}
        </div>
        <ul className="!mt-0 p-2">
          {navbar.map(item => (
            <li
              key={uuidv4()}
              className={classes(
                router.pathname === item.path ? 'text-gold' : 'text-white',
                'block rounded py-2 pl-3 pr-4 lg:p-0',
              )}
            >
              <Link href={item.path} onClick={closeAside}>
                {t(item.name)}
              </Link>
            </li>
          ))}
          {!accessToken ? (
            <li className={classes('flex rounded py-2 pl-3 pr-4 lg:p-0')}>
              <Link href={routes.LOGIN_PAGE}>
                <span className="text-base leading-7 text-white">{trans('log_in')}</span>
              </Link>
            </li>
          ) : (
            <>
              <li className={classes('flex rounded py-2 pl-3 pr-4 lg:p-0')}>
                <span className="text-base leading-7 text-white">{trans('profile')}</span>
              </li>
              <li
                className={classes('flex rounded py-2 pl-3 pr-4 lg:p-0')}
                onClick={handleLogout}
                aria-hidden
              >
                <span className="text-base leading-7 text-white">{trans('log_out')}</span>
              </li>
            </>
          )}
          <li className="flex rounded py-2 pl-3 pr-4 sm:hidden lg:p-0">
            <Link
              href="/"
              className={classes('text-base font-medium leading-7 text-gold', alice.className)}
              onClick={closeAside}
            >
              {t('download_app')}
            </Link>
            <ArrowRightIcon />
          </li>
        </ul>
      </Drawer>
    </>
  );
};
