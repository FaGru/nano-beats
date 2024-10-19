import { useQuery } from '@tanstack/react-query';

import { requestApi } from '@/lib/api/requestApi.helper';
import { QUERY_KEYS } from './query-keys.constants';
import { CONFIG } from '@/lib/config/config';
import { getCookie } from 'cookies-next';

export const fetchUser = async ({ userToken }: { userToken: string }) => {
  const response = await requestApi({
    url: CONFIG.API.ENDPOINT + CONFIG.API.METHODS.USER.GET_USER,
    method: 'get',
    token: userToken
  });

  return response.data;
};

export const useUserQ = () => {
  const userToken = getCookie('token');

  return useQuery({
    enabled: !!userToken,
    queryKey: [QUERY_KEYS.USER.GET_USER],
    queryFn: () => fetchUser({ userToken: userToken || '' })
  });
};
