import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import { TaskProvider } from '@/features/Task-Module/stores/TaskContext';
import TaskCreatePage from '@/features/Task-Module/routes/Main';
import { Dashboard } from '@/features/Task-Module/components/Dashboard';
import KanbanBoard from '../components/Kanban/KanbanBoard';
import useAuth from '@/hooks/useAuth';

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
          element={<PrivateRoute element={<TaskCreatePage />} path="assigned" />}
        />
        <Route
          path="dashboard"
          element={<PrivateRoute element={<Dashboard />} path="dashboard" />}
        />
        <Route
          path="/kanban"
          element={<PrivateRoute element={<KanbanBoard />} path='/kanban' />}
        />
        {/* Add more routes as needed */}
      </Routes>
    </TaskProvider>
  );
};
