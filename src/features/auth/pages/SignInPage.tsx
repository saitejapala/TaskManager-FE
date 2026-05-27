import React from 'react';
import AuthLayout from '@shared/components/layout/AuthLayout';
import SignInForm from '../components/SignInForm';

const SignInPage: React.FC = () => {
  return (
    <AuthLayout
      title="Sign In"
      subtitle="Welcome back! Access your workspace and manage your work items seamlessly."
    >
      <SignInForm />
    </AuthLayout>
  );
};

export default SignInPage;
