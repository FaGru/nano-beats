'use client';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import axios from 'axios';
interface RegistrationProps {}

export const Registration: React.FC<RegistrationProps> = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    passwordConfirm: ''
  });

  const { username, email, password, passwordConfirm } = formData;

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
    if (!isDisabled) {
      try {
        // Registrierungs-Request mit Axios
        const response = await axios.post('http://localhost:8000/api/user/', userData, {
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const data = response.data;

        console.log('data', data);
      } catch (error) {
        console.error('Registration error:', error);
      }
    }
  };

  const isDisabled =
    !username || !email || !password || !passwordConfirm || password !== passwordConfirm;

  const getTooltipContent = () => {
    if (!username || !email || !password || !passwordConfirm) return 'Please enter all fields';
    if (password !== passwordConfirm) return 'Passwords do not match';
  };

  return (
    <div className='bg-background w-full flex flex-col items-center gap-2 rounded p-2'>
      <h2 className='text-3xl'>SignUp</h2>
      <Card className='p-4 w-96 '>
        <form onSubmit={onSubmit} className='flex flex-col'>
          <div className='mb-4'>
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
          <div className='mb-4'>
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
          <TooltipProvider delayDuration={0}>
            <Tooltip>
              <TooltipTrigger>
                <Button className='flex-grow' disabled={isDisabled}>
                  register
                </Button>
              </TooltipTrigger>
              {isDisabled && (
                <TooltipContent>
                  <p>{getTooltipContent()}</p>
                </TooltipContent>
              )}
            </Tooltip>
          </TooltipProvider>
        </form>
      </Card>
    </div>
  );
};
