import { useState, useEffect, useCallback } from 'react';
import storage from '@/utils/storage';
import {
  AuthUser,
  LoginCredentialsDTO,
  LoginSignupResponse,
  SignupCredentialsDTO,
  UserResponse,
  getUser,
  loginWithEmailAndPassword,
  signupWithEmailAndPassword,
} from '@/features/auth';

interface User {
  id: number;
  username: string;
  email: string;
}

interface AuthContext {
  getUserdetails: () => User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
  register: (username: string, email: string, password: string) => void;
}

const initialUser: User | null = null;

async function handleAuthResponse(data: LoginSignupResponse) {
  const { token } = data;
  storage.setToken(token);
  console.log(storage.setToken(token));
}

const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const useAuth = () => {
  const [user, setUser] = useState<User | null | AuthUser>(null);

  const loadUser = useCallback(async () => {
    if (storage.getToken()) {
      const data = await getUser();
      return data;
    }
    return null;
  }, []);

  const loginFn = useCallback(async (data: LoginCredentialsDTO) => {
    const response = await loginWithEmailAndPassword(data);
    console.log(response);
    setUser(await loadUser());
    await handleAuthResponse(response);
  }, [loadUser]);

  const signupFn = useCallback(async (data: SignupCredentialsDTO) => {
    const response = await signupWithEmailAndPassword(data);
    await handleAuthResponse(response);
  }, []);

  const logoutFn = useCallback(() => {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    storage.clearToken();
  }, []);

  const isLoggedIn = useCallback(() => !!storage.getToken(), []);

  const getUserDetails = useCallback(() => user, [user]);

  useEffect(() => {
    const token = storage.getToken();
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
    signupFn,
  };
};

export default useAuth;
