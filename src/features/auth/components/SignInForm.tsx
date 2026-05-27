import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, LogIn } from 'lucide-react';
import { signInSchema, SignInInput } from '../validations/auth.schema';
import { useAuth } from '../hooks/useAuth';
import { Input, Button } from '@shared/components/ui';
import { ROUTE_PATHS } from '@core/router/routePaths';

const SignInForm: React.FC = () => {
  const navigate = useNavigate();
  const { login, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignInInput>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: SignInInput) => {
    const success = await login(data);
    if (success) {
      navigate(ROUTE_PATHS.DASHBOARD);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Email field */}
      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        rightIcon={<Mail size={16} />}
        error={errors.email?.message}
        disabled={isLoading}
        {...register('email')}
      />

      {/* Password field */}
      <div className="space-y-1">
        <Input
          type="password"
          placeholder="••••••••"
          rightIcon={<Lock size={16} />}
          error={errors.password?.message}
          disabled={isLoading}
          {...register('password')}
        />
      </div>
      <Link
        to={ROUTE_PATHS.FORGOT_PASSWORD}
        className="text-[11px] font-semibold text-accent hover:underline tracking-wide"
      >
        Forgot?
      </Link>
      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        leftIcon={<LogIn size={16} />}
        className="mt-6"
      >
        Sign In
      </Button>

      {/* Footnote redirection */}
      <div className="text-center text-xs font-semibold text-muted select-none mt-4">
        Don&apos;t have an account?{' '}
        <Link
          to={ROUTE_PATHS.SIGN_UP}
          className="text-primary hover:underline font-bold"
        >
          Sign Up
        </Link>
      </div>
    </form>
  );
};

export default SignInForm;
