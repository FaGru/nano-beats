'use client';
import { useUserQ } from '@/lib/hooks/queries/useUser.query';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { CONFIG } from '@/lib/config/config';
import { Card } from '../ui/card';

export const UserComponent = () => {
  const { data: user } = useUserQ();
  const router = useRouter();

  return (
    <Card className='bg-background w-full p-4'>
      {user ? (
        <div>
          <p>email: {user.email}</p>
          <p>username: {user.username}</p>
        </div>
      ) : (
        <div className='flex flex-col items-center  gap-4'>
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
        </div>
      )}
    </Card>
  );
};
