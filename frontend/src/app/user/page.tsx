import { UserComponent } from '@/components/user/user.component';

import { useBasicSSRPrefetchQueries } from '@/lib/hooks/queries/use-basic-ssr-prefetch.queries';
import { dehydrate, HydrationBoundary } from '@tanstack/react-query';

export default async function UserPage() {
  const { queryClient } = await useBasicSSRPrefetchQueries();
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className='flex flex-col items-center justify-between'>
      <HydrationBoundary state={dehydratedState}>
        <UserComponent />
      </HydrationBoundary>
    </div>
  );
}
