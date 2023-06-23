/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC } from 'react';
import { cookies } from 'next/headers';

import { ACCESS_TOKEN } from 'app-constants';

export function withAuth(WrappedComponent: FC<any>) {
  return (props: any) => {
    const cookiesList = cookies();
    const accessToken = cookiesList.get(ACCESS_TOKEN);
    if (accessToken) return <WrappedComponent {...props} />;
    return null;
  };
}
