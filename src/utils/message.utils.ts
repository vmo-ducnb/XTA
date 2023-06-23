import { toast } from 'react-toastify';

export const message = {
  success: (str: string) =>
    toast.success(str, {
      theme: 'light',
    }),
  error: (str: string) =>
    toast.error(str, {
      theme: 'light',
    }),
};
