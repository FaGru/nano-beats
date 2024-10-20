import axios from 'axios';

type RequestApi = {
  url: string;
  method: 'get' | 'post' | 'put' | 'delete';
  data?: any;
  token?: any;
};

export const requestApi = async ({ url, method, data = {}, token }: RequestApi) => {
  return await axios({
    url,
    method,
    data,
    headers: {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` })
    }
  });
};
