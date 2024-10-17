'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';

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
    console.log('loginUserMutation');
    loginUserMutation.mutate({ email, password });
  };

  const isDisabled = !email || !password;

  return (
    <div className='bg-background w-full flex flex-col items-center gap-2 rounded p-2'>
      <h2 className='text-3xl'>SignIn</h2>
      <Card className='p-4 w-96 '>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <div className='mb-4'>
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
          <div className='mb-4'>
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

          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button className='flex-grow' disabled={isDisabled}>
                  login
                </Button>
              </TooltipTrigger>
              {isDisabled && (
                <TooltipContent>
                  <p>Please enter all fields</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </form>
      </Card>
    </div>
  );
};
