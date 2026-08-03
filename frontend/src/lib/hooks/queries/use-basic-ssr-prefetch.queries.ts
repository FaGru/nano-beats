import { QUERY_KEYS } from '@/lib/hooks/queries/query-keys.constants';
import { fetchUser } from '@/lib/hooks/queries/useUser.query';
import { QueryClient } from '@tanstack/react-query';
import { cookies } from 'next/headers';

export const useBasicSSRPrefetchQueries = async () => {
  const queryClient = new QueryClient();
  const cookie = cookies();
  const userToken = cookie.get('token')?.value;

  let user = null;

  if (userToken) {
    user = await queryClient.fetchQuery({
      queryKey: [QUERY_KEYS.USER.GET_USER],
      queryFn: () => fetchUser({ userToken })
    });
  }
  return { queryClient, user };
};
