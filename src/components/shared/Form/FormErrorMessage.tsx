import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { classes } from 'utils';

export interface ErrorMessageProps {
  children: string;
  className?: string;
}

export const FormErrorMessage = memo(({ children, className }: ErrorMessageProps) => {
  const { t } = useTranslation('validate-message');
  return (
    <p className={classes('block text-left text-sm text-red-600', className)}>{t(children)}</p>
  );
});
