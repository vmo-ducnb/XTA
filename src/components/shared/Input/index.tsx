import { forwardRef, DetailedHTMLProps, InputHTMLAttributes, useState, memo } from 'react';
import { useTranslation } from 'next-i18next';

import { classes } from 'utils';
import { EyeHideIcon, EyeShowIcon } from 'components/icons';

export type InputProps = {
  id: string;
  name: string;
  label: string;
  className?: string;
} & Omit<DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>, 'size'>;

const InputRef = forwardRef<HTMLInputElement, InputProps>(
  ({ id, name, label, type = 'text', className = '', placeholder, ...props }, ref) => {
    const [passwordType, setPasswordType] = useState('password');
    const { t } = useTranslation('common');

    return (
      <div className={classes('relative text-gray-500')}>
        <input
          id={id}
          ref={ref}
          name={name}
          type={type === 'password' ? passwordType : type}
          aria-label={label}
          placeholder={placeholder}
          className={classes(
            'block w-full border-0 border-b-2 border-main-primary px-0 py-[10px] leading-4 focus:border-main-400 focus:ring-0',
            className,
          )}
          {...props}
        />
        {type === 'password' ? (
          <button
            type="button"
            className="group absolute inset-y-0 right-0 mr-3 flex cursor-pointer items-center"
            onClick={() =>
              setPasswordType(prev => {
                return prev === 'password' ? 'text' : 'password';
              })
            }
          >
            {passwordType !== 'password' ? (
              <EyeHideIcon width={20} height={20} />
            ) : (
              <EyeShowIcon width={20} height={20} />
            )}
            <span
              className="absolute left-1/2 m-7 mx-auto w-max -translate-x-1/2 translate-y-[110%] rounded-md bg-[rgba(19,_20,_21,_0.6)] p-[5px] text-sm 
    text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100"
            >
              {t(passwordType === 'password' ? 'show_password' : 'hide_password')}
            </span>
          </button>
        ) : null}
      </div>
    );
  },
);
export const Input = memo(InputRef);
