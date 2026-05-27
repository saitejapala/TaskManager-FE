import React from 'react';
import AuthLayout from '@shared/components/layout/AuthLayout';
import OtpForm from '../components/OtpForm';

const OtpPage: React.FC = () => {
  return (
    <AuthLayout
      title="Verify Email"
      subtitle="Please enter the 6-digit verification code sent to your email to complete registration."
    >
      <OtpForm />
    </AuthLayout>
  );
};

export default OtpPage;
