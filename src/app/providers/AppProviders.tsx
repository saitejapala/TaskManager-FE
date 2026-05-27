import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { BrowserRouter } from 'react-router-dom';
import { store, persistor } from '@core/store/store';
import { ThemeProvider } from './ThemeProvider';
import { ToastContainer, Loader } from '@shared/components/ui';

interface AppProvidersProps {
  children: React.ReactNode;
}

const LoadingFallback: React.FC = () => (
  <div className="min-h-screen flex items-center justify-center bg-[#0A0A0F] text-white">
    <Loader size="lg" />
  </div>
);

export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingFallback />} persistor={persistor}>
        <ThemeProvider>
          <BrowserRouter>
            {children}
            {/* Global toast notification system wrapper */}
            <ToastContainer />
          </BrowserRouter>
        </ThemeProvider>
      </PersistGate>
    </Provider>
  );
};

export default AppProviders;
