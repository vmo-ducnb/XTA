'use client';

import { ButtonHTMLAttributes } from 'react';

import { ArrowRightIcon } from 'components/icons';
import { classes } from 'utils';

const arrowButtonClassNames =
  'absolute z-10 h-16 w-16 rounded-full border border-solid border-white text-white hover:border-white hover:text-white focus:text-white top-[95%] lg:top-[30%]';

export const NextArrowButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={classes(
        arrowButtonClassNames,
        'right-[30%] lg:right-[35%] xl:right-[40%] 2xl:right-[42%]',
        className?.includes('slick-disabled') && 'opacity-50',
        className,
      )}
      type="button"
      {...props}
    >
      <ArrowRightIcon />
    </button>
  );
};

export const PrevArrowButton = ({
  className,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      className={classes(
        arrowButtonClassNames,
        'left-[30%] lg:left-[51%] xl:left-[50%]',
        className?.includes('slick-disabled') && 'opacity-50',
        className,
      )}
      type="button"
      {...props}
    >
      <ArrowRightIcon className="rotate-180" />
    </button>
  );
};
