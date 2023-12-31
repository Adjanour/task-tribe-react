import { Suspense } from 'react';
import {Navigate, Outlet, useRouteError} from 'react-router-dom';

import { Spinner } from '@/components/Elements';
import { MainLayout } from '@/components/Layout';
import {lazyImport} from "@/utils/lazyImports";

const {TaskRoutes} = lazyImport(() => import('@/features/Task-Module'), 'TaskRoutes');

export default function ErrorPage() {
    const error : any = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Sorry, an unexpected error has occurred.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
        </div>
    );
}

const App = () => {
  return (
    <MainLayout>
      <Suspense
        fallback={
          <div className="h-full w-full flex items-center justify-center">
            <Spinner size="xl" />
          </div>
        }
      >
        <Outlet />
      </Suspense>
    </MainLayout>
  );
};

export const protectedRoutes = [
  {
      path: '/app',
      element: <App />,
      errorElement: <ErrorPage/>,
      children: [
        { path: 'task/*', element: <TaskRoutes/> },
        { path: 'teams/*', element: <h1>Users</h1> },
        { path: 'settings/*', element: <h1>Profile</h1> },
        { path: 'projects/*', element: <h1>Profile</h1> },
        { path: 'education/*', element: <h1>Profile</h1> }
    ],
  },
];