import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TaskProvider } from '@/features/Task-Module/stores/TaskContext';
import TaskCreatePage from '@/features/Task-Module/routes/Main';
import { Dashboard } from '@/features/Task-Module/components/Dashboard';
import KanbanBoard from '../components/Kanban/KanbanBoard';
import useAuth from '@/hooks/useAuth';
import TaskMePage from "@/features/Task-Module/routes/Me";
import { List } from '../components/Kanban';
import { TaskCalendarContainer } from '@/components/Calendar/TCalendar';
import TaskTable from '../components/Elements/TaskTable';
import { DataGrid } from '../components/Datagrid';

interface PrivateRouteProps {
  element: React.ReactNode;
  path:string
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ element,path }) => {
  const auth = useAuth();

  return auth.isLoggedIn() ? (
    <>{element}</>
  ) : (
    <Navigate to="/auth/login" replace={true} state={{ from: path }} />
  );
};

export const TaskRoutes: React.FC = () => {
  return (
    <TaskProvider>
      <Routes>
        <Route
          path="assigned"
          element={<PrivateRoute element={<TaskCreatePage />} path="/app/task/assigned" />}
        />
        <Route
          path="dashboard"
          element={<PrivateRoute element={<Dashboard />} path="/app/task/dashboard" />}
        />
        <Route
          path="/kanban"
          element={<PrivateRoute element={<List />} path='/app/task/kanban' />}
        />
        <Route
            path="my"
            element={<PrivateRoute element={<TaskMePage/>} path='/app/task/my' />}
        />
        <Route
            path="calendar"
            element={<PrivateRoute element={<TaskCalendarContainer/>} path='/app/task/calendar' />}
        />
        <Route
            path="all"
            element={<PrivateRoute element={<DataGrid/>} path='/app/task/my' />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </TaskProvider>
  );
};
