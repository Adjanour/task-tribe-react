import {  Route, Routes } from 'react-router-dom';
import Main from "@/features/Task-Module/routes/Main";
import {TaskProvider} from "@/features/Task-Module/stores/TaskContext";
import TaskCreatePage from "@/features/Task-Module/routes/Main";
import {Dashboard} from "@/features/Task-Module/components/Dashboard";

export const TaskRoutes = () => {
    return (
        <TaskProvider>
            <Routes>
                <Route path="" element={<TaskCreatePage />} />
                <Route path="dashboard" element={<Dashboard />} />
            </Routes>
        </TaskProvider>
);
};