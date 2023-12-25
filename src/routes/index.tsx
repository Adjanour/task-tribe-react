import {useRouteError, useRoutes} from 'react-router-dom';

import { protectedRoutes } from './protected';
import Home from './Home';

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

export const AppRoutes = () => {

  const commonRoutes = [{ path: '/',errorElement: <ErrorPage />, element: <Home/> }];

  const element = useRoutes([...protectedRoutes, ...commonRoutes]);

  return <>{element}</>;
};