import {
  LoginRequestType,
  ILoginAndRefreshResponse,
  IRefreshToken,
  IRegisterResponse,
  PreSignUpRequestType,
  IPreRegisterResponse,
  ISignUpRequest,
  ResetPasswordRequestType,
} from 'types/auth.types';

// eslint-disable-next-line import/no-cycle
import { axiosClient } from './request';

const authServices = {
  login(body: LoginRequestType): Promise<ILoginAndRefreshResponse> {
    return axiosClient.post('/v1/auth/login', { loginId: body.email, password: body.password });
  },
  refreshToken(body: IRefreshToken): Promise<ILoginAndRefreshResponse> {
    return axiosClient.post('/v1/auth/refresh-token', body);
  },
  preRegister(body: PreSignUpRequestType): Promise<IPreRegisterResponse> {
    return axiosClient.post('/v1/auth/pre-signup', body);
  },
  register(body: ISignUpRequest): Promise<IRegisterResponse> {
    return axiosClient.post('/v1/auth/signup', body);
  },
  preForgotPassword(body: PreSignUpRequestType): Promise<IPreRegisterResponse> {
    return axiosClient.post('/v1/auth/forgot-password', body);
  },
  resetPassword(body: ResetPasswordRequestType): Promise<unknown> {
    return axiosClient.post('/v1/auth/reset-password', body);
  },
  logout(): Promise<unknown> {
    return axiosClient.post('/v1/auth/logout');
  },
};

export default authServices;
