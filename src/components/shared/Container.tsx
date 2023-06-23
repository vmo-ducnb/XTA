import { DetailedHTMLProps, HTMLAttributes, ReactNode } from 'react';
import { classes } from 'utils';

interface ContainerProps extends DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> {
  children: ReactNode;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div className={classes(className, 'container')} {...props}>
      {children}
    </div>
  );
}
