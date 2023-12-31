import {  Route, Routes } from 'react-router-dom';
import {TaskProvider} from "@/features/Task-Module/stores/TaskContext";
import TaskCreatePage from "@/features/Task-Module/routes/Main";
import {Dashboard} from "@/features/Task-Module/components/Dashboard";
import KanbanBoard from '../components/Kanban/KanbanBoard';

export const TaskRoutes = () => {
    return (
        <TaskProvider>
            <Routes>
                <Route path="assigned" element={<TaskCreatePage />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="/kanban" element={<KanbanBoard/>} />
            </Routes>
        </TaskProvider>
);
};