import React, { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { OtpInput, Button } from '@shared/components/ui';
import { ROUTE_PATHS } from '@core/router/routePaths';
import { Check } from 'lucide-react';

const OtpForm: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { register, requestOtp, isLoading } = useAuth();
  
  const [otpValue, setOtpValue] = useState('');
  const [otpError, setOtpError] = useState<string | undefined>(undefined);
  const [countdown, setCountdown] = useState(60);

  // Retrieve state passed from SignUp page
  const signUpState = location.state as {
    email?: string;
    fullName?: string;
    password?: string;
  } | null;

  useEffect(() => {
    if (!signUpState?.email) {
      navigate(ROUTE_PATHS.SIGN_UP);
    }
  }, [signUpState, navigate]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [countdown]);

  const handleResend = async () => {
    if (signUpState?.email) {
      const success = await requestOtp(signUpState.email);
      if (success) {
        setCountdown(60);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otpValue.length !== 6) {
      setOtpError('OTP must be exactly 6 digits');
      return;
    }
    setOtpError(undefined);

    if (signUpState?.email && signUpState?.fullName && signUpState?.password) {
      const success = await register({
        email: signUpState.email,
        fullName: signUpState.fullName,
        password: signUpState.password,
        otp: otpValue,
      });
      if (success) {
        // Navigate to sign-in page on registration success
        navigate(ROUTE_PATHS.SIGN_IN);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="text-center space-y-1 select-none">
        <p className="text-xs font-semibold text-muted">
          We sent a verification code to
        </p>
        <p className="text-xs font-bold text-text">
          {signUpState?.email || ''}
        </p>
      </div>

      <OtpInput
        length={6}
        onChange={(val) => {
          setOtpValue(val);
          if (val.length === 6) {
            setOtpError(undefined);
          }
        }}
        error={otpError}
      />

      {/* Countdown timer: accent (#FF6B2B) for countdown numbers */}
      <div className="text-center text-xs font-semibold select-none">
        {countdown > 0 ? (
          <p className="text-muted">
            Resend code in <span className="text-accent font-bold font-heading">{countdown}s</span>
          </p>
        ) : (
          <button
            type="button"
            onClick={handleResend}
            disabled={isLoading}
            className="text-primary hover:underline font-bold disabled:opacity-50"
          >
            Resend Verification Code
          </button>
        )}
      </div>

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        disabled={otpValue.length !== 6}
        leftIcon={<Check size={16} />}
      >
        Verify & Register
      </Button>
    </form>
  );
};

export default OtpForm;
