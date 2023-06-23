import { ButtonHTMLAttributes, memo } from 'react';
import { VariantProps } from 'class-variance-authority';

import { classes } from 'utils';
import { LoadingIcon } from 'components/icons';
import { button } from './button.cva';

export interface ButtonProps
  extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'color'>,
    VariantProps<typeof button> {
  children?: React.ReactNode;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  gap?: string;
}

export const Button = memo(
  ({
    children,
    variant,
    size,
    fullWidth,
    disabled,
    loading,
    type = 'button',
    block,
    icon,
    color,
    className,
    iconPosition = 'right',
    gap = '16px',
    ...rest
  }: ButtonProps) => {
    const gapIcon = iconPosition === 'left' ? { marginLeft: gap } : { marginRight: gap };
    return (
      <button
        {...rest}
        // eslint-disable-next-line react/button-has-type
        type={type}
        disabled={disabled || loading}
        className={classes(
          button({ variant, size, fullWidth, disabled, block, color }),
          className,
          iconPosition === 'left'
            ? 'flex flex-row items-center'
            : 'flex flex-row-reverse items-center',
        )}
      >
        {loading ? <LoadingIcon className="animate-spin" /> : icon}
        {children ? (
          <span className={classes('leading-[100%]')} style={loading || !!icon ? gapIcon : {}}>
            {children}
          </span>
        ) : null}
      </button>
    );
  },
);
