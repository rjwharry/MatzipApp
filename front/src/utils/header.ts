import { axiosInstance } from '@/api';

const setHeader = (key: string, value: string) => {
  axiosInstance.defaults.headers.common[key] = value;
};

const getHeader = (key: string) => {
  return axiosInstance.defaults.headers.common[key];
};

const removeHeader = (key: string) => {
  if (!axiosInstance.defaults.headers.common[key]) {
    return;
  }
  delete axiosInstance.defaults.headers.common[key];
};

export { getHeader, removeHeader, setHeader };
