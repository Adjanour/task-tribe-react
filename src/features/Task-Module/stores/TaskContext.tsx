import React, { createContext, useContext } from 'react';
import {useTaskAPI} from "@/features/Task-Module/hooks/useTaskAPI";

export type task={
    Tasks: any;
    refetchTasks: () => void;
    isLoadingGettingTasks: boolean,
    errorFetchingTasks: unknown;
}
const TaskContext = createContext<task|null>(null);

export const TaskProvider = ({ children }: { children: React.ReactNode }) => {
    const {task} = useTaskAPI();
    return <TaskContext.Provider value={task}>{children}</TaskContext.Provider>
};

export const useTaskContext =  () => {
    const context = useContext(TaskContext);

    if (!context) {
        throw new Error('useTaskContext must be used within a TaskProvider');
    }

    return context;
};
