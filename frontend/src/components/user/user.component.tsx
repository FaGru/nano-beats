'use client';
import { useUserQ } from '@/lib/hooks/queries/useUser.query';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { CONFIG } from '@/lib/config/config';
import { Card } from '../ui/card';

export const UserComponent = () => {
  const { data: user, isFetched } = useUserQ();
  const router = useRouter();

  if (!isFetched) {
    return <div>Loading...</div>;
  }

  if (!user && isFetched) {
    return (
      <Card className=' bg-background w-full p-4 flex flex-col items-center  gap-4'>
        <p>No user found</p>
        <div className='flex gap-2 items-center'>
          <Button size='sm' onClick={() => router.push(CONFIG.CLIENT.SIGN_UP)}>
            Sign up
          </Button>
          <p>or</p>
          <Button size='sm' onClick={() => router.push(CONFIG.CLIENT.LOGIN)}>
            Login
          </Button>
        </div>
      </Card>
    );
  }

  return (
    <Card className='bg-background w-full p-4'>
      <div>
        <p>email: {user.email}</p>
        <p>username: {user.username}</p>
      </div>
    </Card>
  );
};
