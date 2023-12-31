import {  Route, Routes } from 'react-router-dom';
import {TaskProvider} from "@/features/Task-Module/stores/TaskContext";
import TeamCreatePage from "@/features/Team-Module/routes/Main";

export const TeamRoutes = () => {
    return (
        <TaskProvider>
            <Routes>
                <Route path="all" element={<TeamCreatePage />} />
            </Routes>
        </TaskProvider>
);
};