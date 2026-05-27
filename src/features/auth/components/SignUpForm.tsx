import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, ArrowRight } from 'lucide-react';
import { signUpSchema, SignUpInput } from '../validations/auth.schema';
import { useAuth } from '../hooks/useAuth';
import { Input, Button } from '@shared/components/ui';
import { ROUTE_PATHS } from '@core/router/routePaths';

const SignUpForm: React.FC = () => {
  const navigate = useNavigate();
  const { requestOtp, isLoading } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignUpInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      fullName: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = async (data: SignUpInput) => {
    // Step 1: request OTP for the email
    const success = await requestOtp(data.email);
    if (success) {
      // Step 2: navigate to /verify-otp passing registration details in state
      navigate(ROUTE_PATHS.OTP, {
        state: {
          email: data.email,
          fullName: data.fullName,
          password: data.password,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {/* Full Name field */}
      <Input
        label="Full Name"
        type="text"
        placeholder="John Doe"
        rightIcon={<User size={16} />}
        error={errors.fullName?.message}
        disabled={isLoading}
        {...register('fullName')}
      />

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
      <Input
        label="Password"
        type="password"
        placeholder="Min. 8 chars, 1 uppercase, 1 number"
        rightIcon={<Lock size={16} />}
        error={errors.password?.message}
        disabled={isLoading}
        {...register('password')}
      />

      {/* Confirm Password field */}
      <Input
        label="Confirm Password"
        type="password"
        placeholder="••••••••"
        rightIcon={<Lock size={16} />}
        error={errors.confirmPassword?.message}
        disabled={isLoading}
        {...register('confirmPassword')}
      />

      {/* Submit Button */}
      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        leftIcon={<ArrowRight size={16} />}
        className="mt-6"
      >
        Send Verification Code
      </Button>

      {/* Footnote redirection */}
      <div className="text-center text-xs font-semibold text-muted select-none mt-4">
        Already have an account?{' '}
        <Link
          to={ROUTE_PATHS.SIGN_IN}
          className="text-primary hover:underline font-bold"
        >
          Sign In
        </Link>
      </div>
    </form>
  );
};

export default SignUpForm;
