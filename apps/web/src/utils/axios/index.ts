import axios from 'axios';
import { config } from '../../config';

export interface AxiosTrpcResponse<T> {
  result: {
    data: T;
  };
}

const axiosIntance = axios.create({
  baseURL: config.appUrl,
});

axiosIntance.interceptors.request.use((axiosConfig) => {
  const accessToken = localStorage.getItem(config.tokens.accessToken);

  if (accessToken) {
    axiosConfig.headers.Authorization = `Bearer ${accessToken}`;
  }

  return axiosConfig;
});

export { axiosIntance };
