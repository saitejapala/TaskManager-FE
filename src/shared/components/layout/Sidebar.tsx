import React from 'react';
import { LayoutDashboard, Layers, Bookmark, Settings, LogOut } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '@core/store/hooks';
import { logout } from '@features/auth/store/authSlice';
import { getInitials } from '@utils/formatters';
import { cn } from '@utils/cn';

interface SidebarProps {
  currentTab?: string;
  onTabChange?: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentTab = 'dashboard', onTabChange }) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.auth.user);

  const navItems = [
    { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'layers', icon: Layers, label: 'Workspaces' },
    { id: 'bookmarks', icon: Bookmark, label: 'Bookmarks' },
    { id: 'settings', icon: Settings, label: 'Settings' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {/* Desktop Sidebar: 64px fixed left, full height, hidden below md (768px) */}
      <aside className="fixed left-0 top-0 bottom-0 w-16 bg-surface border-r border-border flex flex-col items-center justify-between py-6 z-30 transition-colors duration-[250ms] ease-out hidden md:flex">
        <div className="flex flex-col items-center gap-8 w-full">
          {/* Logo mark: 36px square rounded-[10px] bg-primary "K" white */}
          <div className="h-9 w-9 bg-primary text-white font-heading font-bold text-lg flex items-center justify-center rounded-[10px] select-none shadow-none">
            K
          </div>

          {/* Navigation icons */}
          <nav className="flex flex-col gap-2 w-full">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onTabChange?.(item.id)}
                  title={item.label}
                  className={cn(
                    'w-full h-12 flex items-center justify-center text-muted hover:text-text transition-all duration-[250ms] border-l-[3px] border-transparent relative group',
                    {
                      // Active: text-primary border-l-[3px] border-primary bg-surface2
                      'text-primary border-primary bg-surface2': isActive,
                    }
                  )}
                >
                  <Icon size={20} />
                </button>
              );
            })}
          </nav>
        </div>

        {/* Bottom User Profile Section */}
        <div className="flex flex-col items-center gap-4 w-full px-2">
          {/* Logout Action */}
          <button
            onClick={handleLogout}
            title="Log Out"
            className="text-muted hover:text-error p-2 rounded-lg hover:bg-surface2 transition-all duration-150"
          >
            <LogOut size={18} />
          </button>
          
          {/* User Initials Avatar */}
          <div
            className="h-9 w-9 rounded-full bg-accent text-white text-xs font-bold font-heading flex items-center justify-center select-none"
            title={user?.fullName || 'User'}
          >
            {getInitials(user?.fullName)}
          </div>
        </div>
      </aside>

      {/* Mobile Responsive Bottom Tab Bar: fixed bottom, h-14, full width, flex row, bg-surface border-t */}
      <div className="fixed bottom-0 left-0 right-0 h-14 bg-surface border-t border-border flex items-center justify-around z-30 transition-colors duration-[250ms] ease-out md:hidden">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange?.(item.id)}
              className={cn(
                'flex flex-col items-center justify-center w-12 h-12 rounded-[10px] text-muted hover:text-text transition-all duration-[250ms]',
                {
                  'text-primary bg-surface2': isActive,
                }
              )}
            >
              <Icon size={20} />
            </button>
          );
        })}
        {/* Mobile Log Out Icon */}
        <button
          onClick={handleLogout}
          className="flex flex-col items-center justify-center w-12 h-12 text-muted hover:text-error transition-all duration-150"
        >
          <LogOut size={20} />
        </button>
      </div>
    </>
  );
};

export default Sidebar;
