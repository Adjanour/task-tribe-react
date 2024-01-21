import {useRouteError, useRoutes} from 'react-router-dom';

import { protectedRoutes } from './protected';
import useAuth  from "@/hooks/useAuth";
import { publicRoutes } from './public';
import Home from './Home';

export default function ErrorPage() {
  const error : any = useRouteError();
  console.error(error);

  return (
    <div id="error-page" className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">Oops!</h1>
    <p className="text-lg mb-2">Sorry, an unexpected error has occurred.</p>
    <p className="italic">{error.statusText || error.message}</p>
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


