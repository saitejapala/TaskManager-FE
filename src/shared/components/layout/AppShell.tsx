import React from 'react';
import Sidebar from './Sidebar';
import Navbar from './Navbar';

interface AppShellProps {
  title?: string;
  searchQuery?: string;
  onSearchChange?: (query: string) => void;
  children: React.ReactNode;
}

const AppShell: React.FC<AppShellProps> = ({
  title,
  searchQuery,
  onSearchChange,
  children,
}) => {
  return (
    <div className="min-h-screen bg-bg transition-colors duration-[250ms] ease-out">
      {/* Navbar: fixed top */}
      <Navbar
        title={title}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
      />

      {/* Sidebar: desktop fixed-left, mobile fixed-bottom */}
      <Sidebar currentTab="dashboard" />

      {/* Content Area: ml-16 (64px desktop margin-left) mt-[60px] (60px desktop height) p-6.
          Mobile (below 768px): ml-0 mb-14 (tab bar height offset) mt-[60px] p-4 */}
      <main className="min-h-[calc(100vh-60px)] md:ml-16 mt-[60px] mb-14 md:mb-0 p-4 md:p-6 transition-all duration-[250ms] ease-out">
        {children}
      </main>
    </div>
  );
};

export default AppShell;
