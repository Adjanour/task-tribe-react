import {useRouteError, useRoutes} from 'react-router-dom';

import { protectedRoutes } from './protected';
import useAuth  from "@/hooks/useAuth";
import { publicRoutes } from './public';
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
  const auth = useAuth()

  const commonRoutes = [{ path: '/', element: <Home/> }];
  const routes = auth.isLoggedIn() ? protectedRoutes : publicRoutes;

  const element = useRoutes([...routes, ...commonRoutes]);

  return <>{element}</>;
};


