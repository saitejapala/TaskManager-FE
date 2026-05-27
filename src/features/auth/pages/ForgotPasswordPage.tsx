import React from 'react';
import AuthLayout from '@shared/components/layout/AuthLayout';
import ForgotPasswordForm from '../components/ForgotPasswordForm';

const ForgotPasswordPage: React.FC = () => {
  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Retrieve your credentials to restore access to your dashboard workspaces."
    >
      <ForgotPasswordForm />
    </AuthLayout>
  );
};

export default ForgotPasswordPage;
