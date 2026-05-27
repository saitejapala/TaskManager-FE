import React from 'react';
import { Bell, Sun, Moon, Search } from 'lucide-react';
import { useAppSelector } from '@core/store/hooks';
import { useTheme } from '@shared/hooks/useTheme';
import { getInitials } from '@utils/formatters';

interface NavbarProps {
  title?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
}

const Navbar: React.FC<NavbarProps> = ({
  title = 'Dashboard',
  searchQuery = '',
  onSearchChange,
}) => {
  const { theme, toggleTheme } = useTheme();
  const user = useAppSelector((state) => state.auth.user);

  return (
    <header className="fixed top-0 left-0 md:left-16 right-0 h-[60px] bg-surface border-b border-border flex items-center justify-between px-6 z-20 transition-colors duration-[250ms] ease-out">
      {/* Left: Page Title */}
      <h1 className="text-lg font-heading font-semibold text-text select-none tracking-wide">
        {title}
      </h1>

      {/* Center: Search input */}
      <div className="flex-1 max-w-sm mx-4 relative hidden sm:block">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none">
          <Search size={16} />
        </span>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search tasks..."
          className="w-full h-9 pl-9 pr-4 bg-surface2 border border-border rounded-[10px] text-xs text-text transition-colors duration-[250ms] focus:border-primary focus:outline-none focus:ring-0 placeholder:text-muted/60"
        />
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-4">
        {/* Mobile Search button/bar fallback or simple structure */}
        
        {/* Bell notification icon */}
        <button
          className="text-muted hover:text-text p-1.5 rounded-lg hover:bg-surface2 transition-all duration-150 relative"
          title="Notifications"
        >
          <Bell size={18} />
          {/* Notification Badge Dot */}
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-accent" />
        </button>

        {/* Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          className="text-muted hover:text-text p-1.5 rounded-lg hover:bg-surface2 transition-all duration-150"
          title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>

        {/* User initials avatar and display name */}
        <div className="flex items-center gap-2.5 border-l border-border pl-4">
          <div className="text-right hidden lg:block select-none">
            <p className="text-xs font-semibold text-text leading-tight">
              {user?.fullName || 'Kinetic User'}
            </p>
            <p className="text-[10px] font-semibold text-muted leading-tight">
              {user?.email || 'user@kinetic.com'}
            </p>
          </div>
          <div className="h-8 w-8 rounded-full bg-accent text-white text-xs font-bold font-heading flex items-center justify-center select-none">
            {getInitials(user?.fullName)}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
