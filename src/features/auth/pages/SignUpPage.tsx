import React from 'react';
import AuthLayout from '@shared/components/layout/AuthLayout';
import SignUpForm from '../components/SignUpForm';

const SignUpPage: React.FC = () => {
  return (
    <AuthLayout
      title="Create Account"
      subtitle="Register now to start tracking tasks and collaborating with your team."
    >
      <SignUpForm />
    </AuthLayout>
  );
};

export default SignUpPage;
