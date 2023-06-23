import { twMerge } from 'tailwind-merge';
import { ClassNameValue } from 'tailwind-merge/dist/lib/tw-join';

export const classes = (...classLists: ClassNameValue[]) => twMerge(classLists);
