import { cva } from 'class-variance-authority';

export const button = cva(
  `font-semibold leading-5 text-center relative transition-all 
  duration-150 flex items-center justify-center`,
  {
    variants: {
      variant: {
        primary: `border border-main-primary text-main-primary
                  active:bg-main-primary active:text-text-primary
                  hover:border-main-primary hover:bg-main-primary hover:text-text-primary
                  focus:border-main-primary focus:outline-none focus:shadow-outline-gray`,
        secondary: `bg-main-primary text-white border border-transparent 
                  active:bg-main-400 hover:border-main-400 hover:bg-main-400 hover:text-text-primary
                  focus:outline-none focus:shadow-outline-primary`,
        tertiary: `bg-[linear-gradient(90deg,_#F0B09D_0%,_#DA8784_100%)] text-text-primary
                  hover:bg-[linear-gradient(270deg,_#F0B09D_0%,_#DA8784_100%)] focus:bg-[linear-gradient(270deg,_#F0B09D_0%,_#DA8784_100%)]
                  focus:outline-none focus:shadow-outline-gray
                  active:bg-transparent active:text-text-primary`,
      },
      size: {
        slim: 'text-sm',
        medium: 'text-lg',
        large: 'text-1xl',
        larger: 'text-1xl',
      },
      fullWidth: {
        true: 'w-full',
      },
      disabled: {
        true: '',
      },
      block: {
        true: 'w-full flex items-center justify-center',
      },
      color: {
        dark: '',
        gold: '',
      },
    },
    compoundVariants: [
      {
        variant: ['primary', 'secondary', 'tertiary'],
        size: 'slim',
        className: 'px-3 py-1',
      },
      {
        variant: ['primary', 'secondary', 'tertiary'],
        size: 'medium',
        className: 'px-[14px] py-[9px]',
      },
      {
        variant: ['primary', 'secondary', 'tertiary'],
        size: 'large',
        className: 'px-[24px] py-[10px] text-base font-semibold',
      },
      {
        variant: ['primary', 'secondary', 'tertiary'],
        size: 'larger',
        className: 'px-10 py-4',
      },
      {
        variant: 'primary',
        color: 'dark',
        className: `border-main-primary text-main-primary
                  active:bg-main-primary active:text-text-primary
                  hover:border-main-primary hover:bg-main-primary hover:text-text-primary
                  focus:border-main-primary`,
      },
      {
        variant: 'secondary',
        color: 'dark',
        className: `bg-main-primary text-white 
                  active:bg-main-400 hover:border-main-400 
                  hover:bg-main-400 hover:text-text-primary`,
      },
      {
        variant: 'primary',
        color: 'gold',
        className: `border-main-primary text-main-primary
                  active:bg-main-primary active:text-text-primary
                  hover:border-main-primary hover:bg-main-primary hover:text-text-primary
                  focus:border-main-primary`,
      },
      {
        variant: 'secondary',
        color: 'gold',
        className: `bg-main-primary text-white 
                  active:bg-main-400 hover:border-main-400 
                  hover:bg-main-400 hover:text-text-primary`,
      },
      {
        disabled: true,
        variant: ['primary', 'secondary', 'tertiary'],
        color: ['dark', 'gold'],
        className: 'opacity-30',
      },
    ],
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
      color: 'gold',
    },
  },
);
