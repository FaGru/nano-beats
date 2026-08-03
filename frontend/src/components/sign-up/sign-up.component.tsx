'use client';

import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import * as Yup from 'yup';
import { useSignUpUserMutation } from '@/lib/hooks/queries/use-signup-user.mutation';
import { useUserQ } from '@/lib/hooks/queries/useUser.query';
import { useRouter } from 'next/navigation';
import { useFormik } from 'formik';
import { Separator } from '../ui/separator';
import { UserPlus } from 'lucide-react';
import { CONFIG } from '@/lib/config/config';
import { RotatingLines } from 'react-loader-spinner';

interface SignUpProps {}

export const SignUp: React.FC<SignUpProps> = () => {
  const signupMutation = useSignUpUserMutation();

  const { data: user } = useUserQ();
  const router = useRouter();

  if (user) {
    router.push(CONFIG.CLIENT.USER);
  }

  const validationSchema = Yup.object({
    username: Yup.string().required('Username is required'),
    email: Yup.string().email('Please enter a valid email').required('Email is required'),
    password: Yup.string()
      .min(8, 'Das Passwort muss mindestens 8 Zeichen lang sein')
      .matches(/[A-Z]/, 'The password must contain at least one capital letter')
      .matches(/[a-z]/, 'The password must contain at least one lowercase letter')
      .required('Password is required'),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref('password')], 'Passwords must match')
      .required('Confirm Password is required')
  });
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
      confirmPassword: ''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { username, email, password } = values;
      console.log('values', values);
      signupMutation.mutate({ username, email, password });
    }
  });

  return (
    <Card className='max-w-md self-center bg-background mt-8 w-full'>
      <CardHeader>
        <CardTitle className='text-2xl font-bold flex gap-2 items-center text-center'>
          <UserPlus className='h-6 w-6' />
          Sign Up
        </CardTitle>
        <Separator className='my-4' />
      </CardHeader>
      <CardContent>
        <form
          onSubmit={formik.handleSubmit}
          className='space-y-4 max-w-4xl xl:max-w-md  flex flex-col '
        >
          <div className='relative'>
            <Label htmlFor='username'>Username</Label>
            <Input id='username' {...formik.getFieldProps('username')} />
            {formik.touched.username && formik.errors.username ? (
              <div className='text-destructive text-xs absolute'>{formik.errors.username}</div>
            ) : null}
          </div>
          <div className='relative'>
            <Label htmlFor='email'>Email</Label>
            <Input id='email' {...formik.getFieldProps('email')} />
            {formik.touched.email && formik.errors.email ? (
              <div className='text-destructive text-xs absolute'>{formik.errors.email}</div>
            ) : null}
          </div>

          <div className='relative'>
            <Label htmlFor='password'>Password</Label>
            <Input id='password' {...formik.getFieldProps('password')} />
            {formik.touched.password && formik.errors.password ? (
              <div className='text-destructive text-xs absolute'>{formik.errors.password}</div>
            ) : null}
          </div>

          <div className='relative'>
            <Label htmlFor='confirmPassword'>Confirm Password</Label>
            <Input id='confirmPassword' {...formik.getFieldProps('confirmPassword')} />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <div className='text-destructive text-xs absolute'>
                {formik.errors.confirmPassword}
              </div>
            ) : null}
          </div>

          <div className='flex justify-center '>
            <Button type='submit' className='flex-grow mt-4'>
              {signupMutation.isPending ? (
                <RotatingLines strokeColor={'hsl(var(--background))'} width='32' />
              ) : (
                'Sign Up'
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};
