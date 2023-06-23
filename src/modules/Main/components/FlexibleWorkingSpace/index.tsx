'use client';

import Image from 'next/image';
import Slider from 'react-slick';

import { alice } from 'fonts';
import { classes } from 'utils';
import { Container, Trans } from 'components/shared';
import { settings, sliderList } from './FlexibleWorkingSpace.constants';
import { SliderItem } from './SliderItem';

const sliderSettings = {
  ...settings,
  appendDots: (dots: React.ReactNode) => (
    <div>
      <ul className={classes('absolute -top-[100px] left-[6%] m-0', alice.className)}> {dots} </ul>
    </div>
  ),
  customPaging: (i: number) => (
    <div className="mx-6 w-fit text-2xl capitalize">
      <Trans nameSpace="home" word="space" /> {i + 1}
    </div>
  ),
};

export const FlexibleWorkingSpace = () => {
  return (
    <div className="home-workspace relative pt-20">
      <div className="mx-auto max-w-[1440px]">
        <Image fill src="/home/flexible-working-space-bg.png" alt="bg" />
        <div className="bg absolute bottom-0 left-0 right-0 top-0" />
        <Container className="relative z-10 px-4">
          <h1 className={classes('mb-20 text-4xl uppercase', alice.className)}>
            <span className="text-gold">
              <Trans nameSpace="home" word="flexible" />
            </span>
            <span className="text-dark">
              <Trans nameSpace="home" word="working_space" />
            </span>
          </h1>
        </Container>
        <Slider className="relative z-10 min-h-[655px]" {...sliderSettings}>
          {sliderList.map(item => (
            <SliderItem key={item.id} {...item} />
          ))}
        </Slider>
      </div>
    </div>
  );
};
