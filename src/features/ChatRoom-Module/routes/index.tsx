import React from 'react';
import { Navigate, Route, Routes } from 'react-router-dom';
import ChatApp from "@/features/ChatRoom-Module/routes/ChatApp";
import useAuth from "@/hooks/useAuth";

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

export const ChatRoomRoutes: React.FC = () => {
    return (

            <Routes>
                <Route
                    path="chat"
                    element={<PrivateRoute element={<ChatApp />} path="/app/chat" />}
                />

                {/* Add more routes as needed */}
            </Routes>

    );
};
