import { ReactNode } from 'react';
import { classes } from 'utils';

export interface DrawerProps {
  children: ReactNode;
  isOpen?: boolean;
  toggle?: () => void;
}

export const Drawer = ({ children, isOpen, toggle }: DrawerProps) => {
  return (
    <div
      className={classes(
        'fixed inset-0 z-[100] h-full transform overflow-hidden bg-gray-900 bg-opacity-25 ease-in-out',
        isOpen
          ? 'translate-x-0 opacity-100 transition-opacity duration-300 '
          : 'transition-translate translate-x-full opacity-0 delay-300',
      )}
    >
      <aside
        className={classes(
          'delay-400 absolute left-0 h-full w-screen max-w-xs transform bg-[rgba(19,_20,_21,_0.6)] shadow-xl backdrop-blur-md transition-all duration-500 ease-in-out',
          isOpen ? 'translate-x-0' : '-translate-x-full',
        )}
      >
        <div className="relative flex h-full w-screen max-w-xs flex-col space-y-6 overflow-y-scroll pb-10">
          {children}
        </div>
      </aside>
      <section
        className="h-full w-screen cursor-pointer"
        onClick={toggle}
        aria-label="Overlay"
        aria-hidden="true"
      />
    </div>
  );
};
