import Link from 'next/link';
import FacebookIcon from 'components/icons/FacebookIcon';

import LocationIcon from 'components/icons/LocationIcon';
import { MailIcon } from 'components/icons/MailIcon';

import InstagramIcon from 'components/icons/InstagramIcon';
import { Logo } from 'components/icons';
import YoutubeIcon from 'components/icons/YoutubeIcon';

import TwitterIcon from 'components/icons/TwitterIcon';
import { useTranslation } from 'next-i18next';
import { aboutUs, securedRentalService, service } from './Footer.constants';

export const Footer = () => {
  const { t } = useTranslation('footer');

  return (
    <div className=" bg-[#2B2B2B] text-white">
      <div className="mx-auto my-0 lg:px-[20px] xl:w-[1184px]">
        <div className="flex flex-wrap justify-between px-5 py-16 lg:px-0">
          <div className="w-[182px]">
            <h5 className="pb-[25px] text-xl font-bold">{t('service')}</h5>
            <ul>
              {service.map((item, i) => (
                <li key={i} className="mb-[8px] leading-[26px] text-[#aaaaaa] ">
                  <Link href={item.path}> {t(`${item.name}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[240px]">
            <h5 className="pb-[25px] text-xl font-bold">{t('secured_rental_service')}</h5>
            <ul>
              {securedRentalService.map((item, i) => (
                <li key={i} className="mb-[8px] leading-[26px] text-[#aaaaaa]">
                  <Link href={item.path}> {t(`${item.name}`)}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="w-[182px]">
            <h5 className="pb-[25px] text-xl font-bold">{t('about_us')}</h5>
            <ul>
              {aboutUs.map((item, i) => (
                <li key={i} className="mb-[8px] leading-[26px] text-[#aaaaaa]">
                  <Link href={item.path}> {t(`${item.name}`)}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="order-first max-w-[445px] lg:order-last ">
            <Logo className="mb-[20px] h-[48px] w-[300px] sm:ml-[20px] sm:w-[260px]" />
            <div className="mb-[20px] ml-[20px]">
              <div className="sm:ml-[0px] xl:ml-0">
                <h5 className="mb-[8px] text-xl font-bold">{t('top_notch_office_service')}</h5>
                <p className="mb-[16px] break-words text-[#aaaaaa]">{t('descript')}</p>
                <ul>
                  <li className="mb-[16px] flex">
                    <LocationIcon className="mr-[14px] items-center justify-center" />
                    <p>{t('address')}</p>
                  </li>
                  <li className="flex">
                    <MailIcon className="mr-[14px]" />
                    <p>{t('email')}</p>
                  </li>
                </ul>
                <div className="mt-[30px] flex">
                  <FacebookIcon className="mr-6" />
                  <InstagramIcon className="mr-6 w-[24px]" />
                  <TwitterIcon className="mr-6" />
                  <YoutubeIcon className="mr-6" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center border-t-2 bg-white pb-[34px] pt-8 text-current">
        <p className="text-[14px] font-normal leading-[20px] text-black">
          ©{new Date().getFullYear()} {t('coppyright')}
        </p>
      </div>
    </div>
  );
};
