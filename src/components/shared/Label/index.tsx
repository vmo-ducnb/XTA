import { memo } from 'react';
import { classes } from 'utils';

export interface LabelProps {
  className?: string;
  children: string;
  htmlFor?: string;
}
export const Label = memo(({ className, children, htmlFor }: LabelProps) => {
  return (
    <label
      className={classes(
        'mb-2 mt-6 block select-none text-base font-bold leading-[150%] text-rose-gold-3',
        className,
      )}
      htmlFor={htmlFor}
    >
      {children}
    </label>
  );
});
