import { AuthUser } from "@/features/auth";
import { User } from "@/features/Task-Module";
import { WindowsFilled } from "@ant-design/icons";

const storagePrefix = 'task_tribe_react_';

const storage = {
    getToken: () => {
        return JSON.parse(window.localStorage.getItem(`${storagePrefix}token`) as string);
    },
    setToken: (token: string) => {
        window.localStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
    },
    clearToken: () => {
        window.localStorage.removeItem(`${storagePrefix}token`);
    },
    setUser:(user:AuthUser) =>{
        window.localStorage.setItem("user",JSON.stringify(user));
    },
    getUser: () =>{
        return JSON.parse(window.localStorage.getItem("user") as string);
    }
};

export default storage;
