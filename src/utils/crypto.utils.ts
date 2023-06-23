import AES from 'crypto-js/aes';
import { enc } from 'crypto-js';

export const encrypt = (data: string) => {
  return AES.encrypt(data, process.env.SECRET_KEY || 'XTA');
};
export const decrypt = (data: string) => {
  return AES.decrypt(data, process.env.SECRET_KEY || 'XTA').toString(enc.Utf8);
};
