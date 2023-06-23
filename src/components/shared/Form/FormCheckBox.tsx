import { ReactNode, Ref } from 'react';
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
import { CheckBox, CheckBoxProps } from 'components/shared/CheckBox';
import { Label } from 'components/shared/Label';
import { FormErrorMessage } from './FormErrorMessage';

export type FormCheckBoxProps<T extends FieldValues> = {
  name: Path<T>;
  required?: boolean;
  rules?: RegisterOptions;
  register?: UseFormRegister<T>;
  errors?: Partial<DeepMap<T, FieldError>>;
  labelClass?: string;
  labelItem?: ReactNode;
} & Omit<CheckBoxProps, 'name'>;

export const FormCheckBox = <TFormValues extends Record<string, unknown>>({
  name,
  register,
  rules,
  errors,
  className,
  label,
  ref,
  required,
  labelClass,
  labelItem,
  ...props
}: FormCheckBoxProps<TFormValues>): JSX.Element => {
  const errorMessages = get(errors, name);
  const hasError = !!(errors && errorMessages);

  return (
    <div className={classes('mt-6', className)} aria-live="polite">
      <div className="flex items-center">
        <CheckBox
          name={name}
          aria-invalid={hasError}
          className={classes(
            hasError
              ? 'border-red-600 focus:border-red-400 focus:outline-none focus:ring-red-200 '
              : '',
          )}
          ref={ref as Ref<HTMLInputElement> | undefined}
          label={label}
          {...props}
          {...(register && register(name, rules))}
        />
        {labelItem || (
          <Label className={classes('mb-0 ml-2 mt-1', labelClass)} htmlFor={name}>
            {label}
          </Label>
        )}
      </div>
      <ErrorMessage
        errors={errors}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        name={name as any}
        render={({ message }) => <FormErrorMessage className="mt-1">{message}</FormErrorMessage>}
      />
    </div>
  );
};
