import React from 'react';
import Card from '../ui/Card';
import { useTheme } from '@shared/hooks/useTheme';
import { Sun, Moon } from 'lucide-react';

interface AuthLayoutProps {
  title?: string;
  subtitle?: string;
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ title, subtitle, children }) => {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg text-text transition-colors duration-[250ms] ease-out flex flex-col justify-center items-center py-12 px-4 relative select-none">
      {/* Floating Theme Switcher */}
      <button
        onClick={toggleTheme}
        className="absolute top-6 right-6 text-muted hover:text-text p-2 rounded-lg hover:bg-surface2 transition-all duration-150"
        title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>

      {/* Main card box: centered layout, max-w-[420px] w-full */}
      <div className="w-full max-w-[420px] mx-auto flex flex-col gap-6">
        {/* Brand identity header */}
        <div className="flex flex-col items-center text-center gap-2 select-none">
          <div className="h-10 w-10 bg-primary text-white font-heading font-bold text-xl flex items-center justify-center rounded-[10px]">
            K
          </div>
          <h2 className="text-2xl font-heading font-bold tracking-wide mt-2">
            Kinetic
          </h2>
          {subtitle && (
            <p className="text-xs font-semibold text-muted max-w-[280px]">
              {subtitle}
            </p>
          )}
        </div>

        {/* Centered card with p-10 */}
        <Card className="p-6 sm:p-10 w-full border border-border bg-surface transition-all duration-[250ms]">
          {title && (
            <h3 className="text-lg font-heading font-bold tracking-wide mb-6 text-left border-b border-border pb-3">
              {title}
            </h3>
          )}
          {children}
        </Card>
      </div>
    </div>
  );
};

export default AuthLayout;
