import { Ref, useMemo } from 'react';
import { get } from 'lodash';
import { ErrorMessage } from '@hookform/error-message';
import {
  RegisterOptions,
  DeepMap,
  FieldError,
  UseFormRegister,
  Path,
  FieldValues,
} from 'react-hook-form';

import { classes } from 'utils';
import { Input, InputProps } from 'components/shared/Input';
import { Label } from 'components/shared/Label';
import { FormErrorMessage } from './FormErrorMessage';

export type FormInputProps<T extends FieldValues> = {
  name: Path<T>;
  required?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  labelClass?: string;
  showErrorMessage?: boolean;
} & Omit<InputProps, 'name'>;

export const FormInput = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  label,
  ref,
  required,
  labelClass,
  maxLength,
  showErrorMessage = true,
  ...props
}: FormInputProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);
  const fieldRegister = useMemo(() => {
    if (!register) return undefined;
    const newRegister = register(name, { ...rules });
    const origOnChange = newRegister.onChange;
    newRegister.onChange = e => {
      const res = origOnChange?.(e);
      const { value } = e.target;
      return maxLength ? value.substring(0, maxLength) : res;
    };
    return newRegister;
  }, [maxLength, name, register, rules]);

  return (
    <div className={className} aria-live="polite">
      <Label
        className={`mb-0 mt-0 text-lg font-medium leading-4 tracking-[0.5px] text-[#B7B7B7] ${labelClass}`}
        htmlFor={name}
      >
        {label}
      </Label>
      <Input
        name={name}
        aria-invalid={hasError}
        className={classes(
          'mt-2 rounded-none text-lg tracking-[0.5px] text-[#000]',
          hasError
            ? 'border-red-600 focus:border-red-400 focus:outline-none focus:ring-red-200 '
            : '',
        )}
        ref={ref as Ref<HTMLInputElement> | undefined}
        label={label}
        maxLength={maxLength}
        {...props}
        {...fieldRegister}
      />
      {showErrorMessage && (
        <ErrorMessage
          errors={errors}
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          name={name as any}
          render={({ message }) => <FormErrorMessage className="mt-1">{message}</FormErrorMessage>}
        />
      )}
    </div>
  );
};
