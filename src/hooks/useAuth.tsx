import { useState, useEffect, useCallback } from 'react';
import storage from '@/utils/storage';
import { LoginCredentialsDTO, LoginSignupResponse, SignupCredentialsDTO, UserResponse, getUser, loginWithEmailAndPassword, signupWithEmailAndPassword } from '@/features/auth';


interface User {
    id: number;
    username: string;
    email: string;
}

interface AuthContext {
    getUserdetails: () => User | null
    login: (username: string, password: string) => void;
    logout: () => void;
    register: (username: string, email: string, password: string) => void;
}

const initialUser: User | null = null;

// const useAuth = (): AuthContext => {
//     const [user, setUser] = useState<User | null>(initialUser);

//     const login = (username: string, password: string) => {
//         // Perform authentication logic here (e.g., API call)
//         // If successful, update the user state
//         const authenticatedUser: User = {
//             id: 1,
//             username,
//             email: 'user@example.com',
//         };

//         setUser(authenticatedUser);
//     };

//     const logout = () => {
//         // Perform logout logic here (e.g., clear authentication tokens)
//         setUser(null);
//     };

//     const register = (username: string, email: string, password: string) => {
//         // Perform registration logic here (e.g., API call)
//         // If successful, update the user state
//         const registeredUser: User = {
//             id: 2,
//             username,
//             email,
//         };

//         setUser(registeredUser);
//     };

//     return {
//         user,
//         login,
//         logout,
//         register,
//     };
// };

async function handleAuthResponse(data: LoginSignupResponse) {
    const {token} = data;
    console.log("data")
    console.log(data)
    console.log("token")
    console.log(data.token)
    storage.setToken(token);
    console.log(storage.setToken(token))
  }
  
const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const useAuth = () => {



  const [user, setUser] = useState<User|null>(null);

 
  async function loadUser() {
    if (storage.getToken()) {
      const data = await getUser();
      return data;
    }
    return null;
  }
  
  async function loginFn(data: LoginCredentialsDTO) {
    const response = await loginWithEmailAndPassword(data);
    console.log(response)
    return await handleAuthResponse(response);
  }
  
  async function signupFn(data: SignupCredentialsDTO) {
    const response = await signupWithEmailAndPassword(data);
  }
  
  async function logoutFn() {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
  }
  
  const signOut = useCallback(() => {
    setUser(null);
    storage.clearToken()
  },[]);

  const isLoggedIn = () => storage.getToken()

  const getUserDetails = () => user;

  useEffect(() => {
    const token = storage.getToken()
    const storedUserData = localStorage.getItem('userData');

    if (token && storedUserData) {
      const userData = JSON.parse(storedUserData);
      setUser(userData);
    }
  }, []);

  useEffect(() => {
    let inactivityTimer: string | number | NodeJS.Timeout | undefined;

    const resetInactivityTimer = () => {
      clearTimeout(inactivityTimer);

      inactivityTimer = setTimeout(() => {
        signOut();
      }, INACTIVITY_TIMEOUT);
    };

    const handleUserActivity = () => {
      resetInactivityTimer();
    };

    // Set up event listeners for user activity
    window.addEventListener('mousemove', handleUserActivity);
    window.addEventListener('keydown', handleUserActivity);

    resetInactivityTimer();

    // Cleanup function
    return () => {
      clearTimeout(inactivityTimer);
      window.removeEventListener('mousemove', handleUserActivity);
      window.removeEventListener('keydown', handleUserActivity);
    };
  }, [user, signOut]);

  return {
    logoutFn,
    signOut,
    isLoggedIn,
    getUserDetails,
    loginFn,
    loadUser,
    signupFn
  };
};

export default useAuth;
