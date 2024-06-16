import {useCallback, useEffect, useState} from 'react';
import storage from '@/utils/storage';
import {
  AuthUser,
  getUser,
  LoginCredentialsDTO,
  LoginSignupResponse,
  loginWithEmailAndPassword,
  SignupCredentialsDTO,
  signupWithEmailAndPassword,
} from '@/features/auth';
import {useNavigate} from 'react-router-dom';

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


async function handleAuthResponse(data: LoginSignupResponse) {
  const { token } = data;
  storage.setToken(token);
}


const INACTIVITY_TIMEOUT = 30 * 60 * 1000; // 30 minutes

const useAuth = () => {
  const [user, setUser] = useState<User | null | AuthUser>(null);
  const navigate = useNavigate()

  const loadUser = async () => {
  
      const user = await getUser();
      storage.setUser(user)
      setUser(user)
      
      return user
  
  }

  const loginFn = async (data: LoginCredentialsDTO) => {
    const response = await loginWithEmailAndPassword(data);
    await handleAuthResponse(response);
    setUser(await loadUser());  
  }

  const signupFn = useCallback(async (data: SignupCredentialsDTO) => {
    return await signupWithEmailAndPassword(data)
  }, []);

  const logoutFn = useCallback(() => {
    storage.clearToken();
    window.location.assign(window.location.origin as unknown as string);
  }, []);

  const signOut = useCallback(() => {
    setUser(null);
    storage.clearToken();
    navigate("/auth/login")
  }, []);

  const isLoggedIn = useCallback(() => !!storage.getToken(), []);

  const getUserDetails = ()=> user

  // useEffect(() => {
  //   const token = storage.getToken();
  //   const storedUserData = localStorage.getItem('userData');

  //   if (token && storedUserData) {
  //     const userData = JSON.parse(storedUserData);
  //     setUser(userData);
  //   }
  // }, []);

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
    user,
  };
};

export default useAuth;
