'use client';

import Slider from 'react-slick';

import { SliderItem } from './SliderItem';
import { settings, sliderList } from './BannerSection.constants';
import { NextArrowButton, PrevArrowButton } from './ArrowButton';

const sliderSettings = {
  ...settings,
  nextArrow: <NextArrowButton />,
  prevArrow: <PrevArrowButton />,
  appendDots: (dots: React.ReactNode) => (
    <div>
      <ul className="absolute -top-[200px] left-[50%] m-0 -translate-x-2/4"> {dots} </ul>
    </div>
  ),
  customPaging: () => <div className="mx-0.5 h-2.5 w-2.5 rounded-full" />,
};

export const BannerSection = () => {
  return (
    <div className="home-banner">
      <Slider {...sliderSettings}>
        {sliderList.map(item => (
          <SliderItem key={item.id} {...item} />
        ))}
      </Slider>
    </div>
  );
};
