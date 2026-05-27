import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Send, CheckCircle2 } from 'lucide-react';
import { Input, Button } from '@shared/components/ui';
import { ROUTE_PATHS } from '@core/router/routePaths';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>(undefined);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError('Email address is required');
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email address');
      return;
    }
    
    setError(undefined);
    setIsLoading(true);
    
    // Simulate brief network delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
    }, 800);
  };

  if (isSubmitted) {
    return (
      <div className="text-center space-y-6 animate-in fade-in duration-200">
        <div className="flex justify-center text-success mb-2 select-none">
          <CheckCircle2 size={44} />
        </div>
        <div className="space-y-2 select-none">
          <h4 className="text-base font-bold text-text">
            Reset Link Sent
          </h4>
          <p className="text-xs font-semibold text-muted max-w-[280px] mx-auto leading-relaxed">
            We sent instructions to reset your password to <span className="text-text font-bold">{email}</span>.
          </p>
        </div>
        
        <Button
          onClick={() => navigate(ROUTE_PATHS.SIGN_IN)}
          variant="primary"
          fullWidth
          className="mt-4"
        >
          Back to Sign In
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <p className="text-xs font-semibold text-muted leading-relaxed select-none mb-4">
        Enter your email address and we&apos;ll send you instructions to reset your password.
      </p>

      <Input
        label="Email Address"
        type="email"
        placeholder="you@example.com"
        leftIcon={<Mail size={16} />}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
          if (e.target.value) {
            setError(undefined);
          }
        }}
        error={error}
        disabled={isLoading}
      />

      <Button
        type="submit"
        variant="primary"
        fullWidth
        isLoading={isLoading}
        leftIcon={<Send size={16} />}
        className="mt-6"
      >
        Send Reset Instructions
      </Button>

      <div className="text-center mt-4">
        <Link
          to={ROUTE_PATHS.SIGN_IN}
          className="inline-flex items-center gap-1.5 text-xs font-bold text-primary hover:underline select-none"
        >
          <ArrowLeft size={14} />
          Back to Sign In
        </Link>
      </div>
    </form>
  );
};

export default ForgotPasswordForm;
