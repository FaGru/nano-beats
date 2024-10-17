import { useMutation, useQueryClient } from '@tanstack/react-query';

import { requestApi } from '@/lib/api/requestApi.helper';
import { CONFIG } from '@/lib/config/config';

import { useGlobalStore } from '@/lib/state-managment/useGlobalStore';
import { QUERY_KEYS } from './query-keys.constants';

export const useSignUpUserMutation = () => {
  const url = `${CONFIG.API.ENDPOINT}${CONFIG.API.METHODS.USER.GET_USER}`;
  const queryClient = useQueryClient();
  const setToken = useGlobalStore((state) => state.setToken);

  return useMutation({
    // mutationKey: ['user-session'],
    mutationFn: async ({
      email,
      password,
      username
    }: {
      email: string;
      password: string;
      username: string;
    }) => {
      const response = await requestApi({
        method: 'post',
        url,
        data: { email, password, username }
      });

      if (response.data) {
        setToken(response.data.token);
        queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER.GET_USER] });
      }

      return { response: response.data };
    }
  });
};
