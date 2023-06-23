import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, memo } from 'react';
import { classes } from 'utils';

export type CheckBoxProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

const CheckBoxRef = forwardRef<HTMLInputElement, CheckBoxProps>(
  ({ id, name, label, className = '', placeholder, ...props }, ref) => {
    return (
      <div className={classes('relative text-gray-500')}>
        <input
          id={id}
          ref={ref}
          name={name}
          type="checkbox"
          aria-label={label}
          placeholder={placeholder}
          className={classes(
            'rounded border-gray-300 text-main-primary shadow-sm focus:border-main-primary focus:ring focus:ring-main-200 focus:ring-opacity-50 focus:ring-offset-0',
            className,
          )}
          {...props}
        />
      </div>
    );
  },
);
export const CheckBox = memo(CheckBoxRef);
