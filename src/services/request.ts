import axios from 'axios';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';

import { message } from 'utils';
import { ACCESS_TOKEN, REFRESH_TOKEN } from 'app-constants';
// eslint-disable-next-line import/no-cycle
import authServices from './auth.services';

export const axiosClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

axiosClient.interceptors.request.use(
  config => {
    const accessToken = getCookie(ACCESS_TOKEN);
    if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

axiosClient.interceptors.response.use(
  response => {
    return response.data;
  },
  async error => {
    const regex = /(5)/g;
    const status = error?.response?.status;
    const data = error?.response?.data;

    if (!status || regex.test(status)) {
      message.error('Something went wrong please try again!');
    } else if (status === 401 || data.message === 'Unauthorized') {
      const refreshToken = getCookie(REFRESH_TOKEN);
      if (refreshToken) {
        const resRefresh = await authServices.refreshToken({
          refreshToken: refreshToken as string,
        });

        if (resRefresh.data.accessToken) {
          error.config.headers.Authorization = `Bearer ${resRefresh.data.accessToken}`;

          setCookie(ACCESS_TOKEN, resRefresh.data.accessToken, {
            expires: new Date(Date.now() + resRefresh.data.accessTokenExpire * 1000),
          });
          setCookie(REFRESH_TOKEN, resRefresh.data.refreshToken, {
            expires: new Date(Date.now() + resRefresh.data.refreshTokenExpiry * 1000),
          });
          return axiosClient(error.config);
        }
      }

      deleteCookie(ACCESS_TOKEN);
      deleteCookie(REFRESH_TOKEN);
      return axiosClient(error.config);
    } else if (error.message === 'Network Error' && error.response) {
      message.error('Please check your internet connection and try again');
    }
    return Promise.reject(error);
  },
);
