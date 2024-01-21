import { useNavigate,useLocation } from 'react-router-dom';

import { Layout } from '../components/Layout';
import React from 'react';
import { notification } from 'antd';
import {LoginForm} from '../components/LoginForm';
import useAuth from "../../../hooks/useAuth"

export const Login: React.FC = () => {
  const { loginFn } = useAuth();
  const navigate = useNavigate()
  const location = useLocation()
  const from = location.state?.from ? location.state?.from : "/app"
  const handleLogin = async (values: any) => {
    try {
      // Call the login function
      await loginFn(values);
      // Optionally, redirect to the dashboard or perform any other action
      // Redirect logic: history.push('/dashboard');
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });
      navigate(from,{replace:true})
    } catch (error) {
      console.error('Login failed:', error);
      notification.error({
        message: 'Login Failed',
        description: 'Invalid credentials. Please check your username and password.',
      });
    }
  };

  return (
    <Layout title="Login">
      <LoginForm onLogin={handleLogin} />
  </Layout>
  );
};

export default Login;
