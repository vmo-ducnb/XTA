import { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { Logo, ArrowLeftIcon } from 'components/icons';
import { classes } from 'utils';
import { alice } from 'fonts';
import { useWindowSize } from 'hooks';
import { DownLoadAppSection } from './DownLoadAppSection';

export const AuthenticationLayout = ({
  children,
  title,
  content,
  onGoBack,
  showDownLoadApp,
}: {
  children: ReactNode;
  title: string;
  content?: ReactNode;
  onGoBack?: () => void;
  showDownLoadApp?: boolean;
}) => {
  const { width } = useWindowSize();

  return (
    <div className="flex min-h-screen w-full flex-wrap">
      <div className="relative hidden w-1/2 md:block xl:w-3/5">
        <div className="overflow-hidden">
          <Image
            src="/auth/login-bg.png"
            className="min-h-screen w-full object-cover"
            fill
            alt="Login"
            priority
          />
        </div>
        <div className="z-1 absolute top-0 flex h-full w-full items-center justify-center">
          {!showDownLoadApp ? (
            <Link href="/">
              <Logo width={224} textColor="#fff" logoColor="#fff" />
            </Link>
          ) : (
            <DownLoadAppSection />
          )}
        </div>
      </div>
      <div
        className={classes(
          'flex w-full flex-col justify-center px-6 md:w-1/2 lg:px-10 xl:w-2/5 xl:px-20',
          width < 1920 ? 'py-10' : '',
          onGoBack ? 'justify-start pt-16' : '',
        )}
      >
        <div className="mx-auto w-full">
          {!!onGoBack && (
            <button type="button" className="mb-12 text-[#0D1A27]" onClick={onGoBack}>
              <ArrowLeftIcon />
            </button>
          )}
          <h2 className={classes('mb-4 text-3xl font-bold', alice.className)}>{title}</h2>
          {!!content && <p>{content}</p>}
          {children}
        </div>
      </div>
    </div>
  );
};
