import React from 'react';
import { Spinner } from '@/components/Elements';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter as Router } from 'react-router-dom';
import { queryClient } from '@/lib/react-query';
import { QueryClientProvider } from 'react-query';
import { IntlProvider } from "react-intl";

const ErrorFallback = () => {
  return (
    <div
      className="text-red-500 w-screen h-screen flex flex-col justify-center items-center"
      role="alert"
    >
      <h2 className="text-lg font-semibold">Ooops, something went wrong :( </h2>
      <button className="mt-4" onClick={() => window.location.assign(window.location.origin)}>
        Refresh
      </button>
    </div>
  );
};

type AppProviderProps = {
  children: React.ReactNode;
};

export const AppProvider = ({ children }: AppProviderProps) => {
  return (
    <React.Suspense
      fallback={
        <div className="flex items-center justify-center w-screen h-screen">
          <Spinner size='xl' />
        </div>
      }
    >
      <ErrorBoundary FallbackComponent={ErrorFallback}>
      <IntlProvider locale="en">
        <QueryClientProvider client={queryClient}>
            <Router>{children}</Router>
        </QueryClientProvider>
        </IntlProvider>
      </ErrorBoundary>
    </React.Suspense>
  );
};