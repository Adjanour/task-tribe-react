import { Suspense } from "react";
import { Outlet, useRouteError } from "react-router-dom";

import { Spinner } from "@/components/Elements";
import { MainLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImports";
import {ProjectRoutes} from "@/features/Project-Module/routes";
import path from "path";
import TaskDashboard from "@/components/Dashboards/TaskDashboard/TaskDashboard";
import TaskDashboardPage from "@/components/Dashboards/TaskDashboard/TaskDashboardPage";

const { TaskRoutes } = lazyImport(
  () => import("@/features/Task-Module"),
  "TaskRoutes"
);
const { TeamRoutes } = lazyImport(
  () => import("@/features/Team-Module"),
  "TeamRoutes"
);
export default function ErrorPage() {
  const error: any = useRouteError();
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
    path: "/app",
    element: <App />,
    children: [
      { path: "task/*", element: <TaskRoutes /> },
      { path: "teams/*", element: <TeamRoutes /> },
      { path: "settings/*", element: <h1>Profile</h1> },
      { path: "projects/*", element: <ProjectRoutes /> },
      { path: "education/*", element: <h1>Profile</h1> },
      {path:"dashboards/task",element:<TaskDashboardPage/>}
    ],
  },
];
