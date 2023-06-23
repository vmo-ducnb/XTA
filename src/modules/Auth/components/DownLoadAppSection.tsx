import { useTranslation } from 'next-i18next';

import { alice } from 'fonts';
import { classes } from 'utils';
import { AppleStoreButtonIcon, GooglePlayButtonIcon, IPhoneAppIcon } from 'components/icons';

export const DownLoadAppSection = () => {
  const { t } = useTranslation('auth');
  return (
    <div className="flex w-full max-w-[740px] items-center justify-center xl:justify-between">
      <div className="w-[322px]">
        <h2 className={classes(alice.className, 'text-4xl uppercase leading-[130%] text-white')}>
          {t('download')} <br />
          <span className="text-main-primary">{t('xtatuz_app')}</span>
        </h2>
        <p className="mt-12 text-lg font-medium leading-[24px] text-white">
          {t('download_description')}
        </p>
        <div className="mt-[122px] flex w-full items-center justify-between">
          <button type="button">
            <GooglePlayButtonIcon />
          </button>
          <button type="button">
            <AppleStoreButtonIcon />
          </button>
        </div>
      </div>
      <div className="hidden xl:block">
        <IPhoneAppIcon />
      </div>
    </div>
  );
};
