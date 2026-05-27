import React, { useRef, useState, useEffect } from 'react';
import { cn } from '@utils/cn';

interface OtpInputProps {
  length?: number;
  onChange: (value: string) => void;
  error?: string;
}

const OtpInput: React.FC<OtpInputProps> = ({ length = 6, onChange, error }) => {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Focus first input on mount
    inputsRef.current[0]?.focus();
  }, []);

  const handleChange = (element: HTMLInputElement, index: number) => {
    const value = element.value;
    if (value && isNaN(Number(value))) return; // Allow numbers only

    const newOtp = [...otp];
    newOtp[index] = value ? value.substring(value.length - 1) : '';
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to next input if digit entered
    if (value && index < length - 1) {
      inputsRef.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace') {
      const newOtp = [...otp];
      if (!otp[index] && index > 0) {
        // Current slot is empty, jump back to previous slot, empty it and focus
        newOtp[index - 1] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
        inputsRef.current[index - 1]?.focus();
      } else {
        // Empty current slot
        newOtp[index] = '';
        setOtp(newOtp);
        onChange(newOtp.join(''));
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (!/^\d+$/.test(pastedData)) return; // Only allow digits

    const digits = pastedData.slice(0, length).split('');
    const newOtp = Array(length).fill('');
    for (let i = 0; i < length; i++) {
      if (digits[i]) {
        newOtp[i] = digits[i];
      }
    }
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Focus last filled or next empty slot
    const focusIndex = Math.min(digits.length, length - 1);
    inputsRef.current[focusIndex]?.focus();
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex gap-2.5 justify-center">
        {otp.map((digit, index) => (
          <input
            key={index}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            onPaste={handlePaste}
            ref={(el) => {
              inputsRef.current[index] = el;
            }}
            className={cn(
              // Each box: 52x56px, rounded-[10px], text-center text-2xl
              'w-[52px] h-[56px] text-center text-2xl font-bold bg-surface border rounded-[10px] text-text outline-none transition-colors duration-[250ms] focus:ring-0',
              // Focused: border-primary
              'focus:border-primary',
              // Error state
              error ? 'border-error text-error focus:border-error' : 'border-border'
            )}
          />
        ))}
      </div>
      {error && (
        <span className="text-xs font-medium text-error select-none mt-1">
          {error}
        </span>
      )}
    </div>
  );
};

export default OtpInput;
