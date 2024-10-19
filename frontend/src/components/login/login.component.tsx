'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import { useRouter } from 'next/navigation';
import { useLoginUserMutation } from '@/lib/hooks/queries/use-login-user.mutation';
import { useUserQ } from '@/lib/hooks/queries/useUser.query';
import { CONFIG } from '@/lib/config/config';

interface RegistrationProps {}

export const Login: React.FC<RegistrationProps> = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const loginUserMutation = useLoginUserMutation();
  const { data: user } = useUserQ();

  if (user) {
    router.push(CONFIG.CLIENT.USER);
  }

  const { email, password } = formData;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!email || !password) {
      setErrorMsg('Please fill in all fields');
      return;
    }
    loginUserMutation.mutate({ email, password });
  };

  return (
    <div className='bg-background w-full flex flex-col items-center gap-2 rounded p-4'>
      <h2 className='text-3xl'>SignIn</h2>
      <Card className='p-4 w-96 '>
        <form onSubmit={onSubmit} className='flex flex-col gap-1'>
          <div>
            <Label className='ml-1' htmlFor='email'>
              Email
            </Label>
            <Input
              id='email'
              type='text'
              placeholder='Email'
              name='email'
              value={email}
              onChange={onChange}
            />
          </div>
          <div className='mb-6'>
            <Label className='ml-1' htmlFor='password'>
              Password
            </Label>
            <Input
              id='password'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={onChange}
            />
          </div>
          <Button className='flex-grow'>Login</Button>
          {errorMsg && <p className='text-destructive'>{errorMsg}</p>}
        </form>
      </Card>
    </div>
  );
};
