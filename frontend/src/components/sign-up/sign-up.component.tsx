'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

import { useSignUpUserMutation } from '@/lib/hooks/queries/use-signup-user.mutation';
import { useUserQ } from '@/lib/hooks/queries/useUser.query';
import { useRouter } from 'next/navigation';
import { CONFIG } from '@/lib/config/config';
import { RotatingLines } from 'react-loader-spinner';

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });
  const [errorMsg, setErrorMsg] = useState<string[]>([]);

  const { username, email, password, passwordConfirm } = formData;

  const signupMutation = useSignUpUserMutation();

  const { data: user } = useUserQ();
  const router = useRouter();
  const isDisabled =
    !username ||
    !email ||
    !password ||
    !passwordConfirm ||
    password !== passwordConfirm ||
    !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);

  if (user) {
    router.push(CONFIG.CLIENT.USER);
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const onSubmit = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    const userData = {
      username,
      email,
      password
    };

    let newErrors: string[] = [];
    if (!username || !email || !password || !passwordConfirm) {
      newErrors = [...newErrors, 'Please enter all fields'];
    }
    if (password !== passwordConfirm) {
      newErrors = [...newErrors, 'Passwords do not match'];
    }
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
      newErrors = [...newErrors, 'Please enter a valid email'];
    }
    setErrorMsg(newErrors);

    if (!isDisabled) {
      signupMutation.mutate(userData);
    }
  };

  return (
    <div className='bg-background w-full flex flex-col items-center gap-2 rounded p-2'>
      <h2 className='text-3xl'>SignUp</h2>
      <Card className='p-4 w-96 '>
        <form onSubmit={onSubmit} className='flex flex-col gap-1'>
          <div>
            <Label className='ml-1' htmlFor='username'>
              Username
            </Label>
            <Input
              id='username'
              type='text'
              placeholder='Username'
              name='username'
              value={username}
              onChange={onChange}
            />
          </div>
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
          <div>
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
          <div className='mb-6'>
            <Label className='ml-1' htmlFor='confirm-password'>
              Confirm Password
            </Label>
            <Input
              id='confirm-password'
              type='password'
              placeholder='Confirm Password'
              name='passwordConfirm'
              value={passwordConfirm}
              onChange={onChange}
            />
          </div>
          <Button className='flex-grow' disabled={signupMutation.isPending}>
            {signupMutation.isPending ? (
              <RotatingLines strokeColor={'hsl(var(--background))'} width='32' />
            ) : (
              'register'
            )}
          </Button>
          {errorMsg.map((msg: string) => (
            <p className='text-destructive text-xs' key={msg}>
              {msg}
            </p>
          ))}
        </form>
      </Card>
    </div>
  );
};
