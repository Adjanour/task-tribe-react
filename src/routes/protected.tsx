import { Suspense } from "react";
import { Outlet, useRouteError } from "react-router-dom";

import { Spinner } from "@/components/Elements";
import { MainLayout } from "@/components/Layout";
import { lazyImport } from "@/utils/lazyImports";
import TaskDashboardPage from "@/components/Dashboards/TaskDashboard/TaskDashboardPage";
import { TaskCalendar } from "@/components/Calendar";

const { TaskRoutes } = lazyImport(
  () => import("@/features/Task-Module"),
  "TaskRoutes"
);
const { TeamRoutes } = lazyImport(
  () => import("@/features/Team-Module"),
  "TeamRoutes"
);

const {ProjectRoutes} = lazyImport(
  () => import("@/features/Project-Module"),
  "ProjectRoutes"
)

const {ChatRoomRoutes} = lazyImport(
  () => import("@/features/ChatRoom-Module/routes"),
  "ChatRoomRoutes"
)
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
      { path: "chat/*", element: <ChatRoomRoutes /> },
      { path: "education/*", element: <h1>Profile</h1> },
      {path:"calendar/*",element: <TaskCalendar tasks={[]}/>},
      {path:"dashboards/task",element:<TaskDashboardPage/>}
    ],
  },
];
