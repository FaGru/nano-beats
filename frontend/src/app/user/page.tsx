import { UserComponent } from '@/components/user/user.component';

import { useBasicSSRPrefetchQueries } from '@/lib/hooks/queries/use-basic-ssr-prefetch.queries';

export default async function UserPage() {
  await useBasicSSRPrefetchQueries();
  return (
    <div className='flex flex-col items-center justify-between'>
      <UserComponent />
    </div>
  );
}
