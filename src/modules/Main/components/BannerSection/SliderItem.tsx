import Link from 'next/link';
import Image from 'next/image';

import { Button, Container } from 'components/shared';
import { workSans, alice } from 'fonts';
import { classes } from 'utils';
import { ArrowRightIcon } from 'components/icons';

interface SliderItemProps {
  title: string;
  description: string;
  url: string;
  image: string;
}

export const SliderItem = ({ title, description, image, url }: SliderItemProps) => {
  return (
    <div className="home-banner relative min-h-[848px] bg-cover bg-center bg-no-repeat">
      <Image fill src={image} alt="banner" />
      <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full bg-[url(/home/home-banner-line.png)] bg-no-repeat" />
      <Container className="relative z-10 px-4">
        <div className="flex h-full min-h-[848px] w-full flex-col items-center justify-center lg:flex-row lg:justify-normal">
          <div className="flex h-full w-full lg:w-1/2">
            <h1 className={classes('text-4xl text-white lg:text-[64px]', alice.className)}>
              {title}
            </h1>
          </div>
          <div className="flex h-full w-full flex-col items-start self-end lg:mb-[87px] lg:w-1/2">
            <p className={classes('mb-10 text-white opacity-80', workSans.className)}>
              {description}
            </p>

            <Link href={url}>
              <Button
                className={classes(
                  'border-gold px-6 py-5 text-[18px] text-gold hover:border-gold hover:bg-transparent hover:text-gold',
                  workSans.className,
                )}
                icon={<ArrowRightIcon className="-rotate-45" />}
                iconPosition="right"
              >
                Join with us
              </Button>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
};
