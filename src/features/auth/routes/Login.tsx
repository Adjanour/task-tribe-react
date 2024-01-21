import { useNavigate } from 'react-router-dom';

import { Layout } from '../components/Layout';
import React from 'react';
import { notification } from 'antd';
import {LoginForm} from '../components/LoginForm';
import useAuth from "../../../hooks/useAuth"

export const Login: React.FC = () => {
  const { loginFn } = useAuth();
  const nav = useNavigate()

  const handleLogin = async (values: any) => {
    try {
      // Call the login function
      await loginFn(values);
      // Optionally, redirect to the dashboard or perform any other action
      // Redirect logic: history.push('/dashboard');
      nav("/app")
      notification.success({
        message: 'Login Successful',
        description: 'You have successfully logged in!',
      });
      nav("/app")
    } catch (error) {
      console.error('Login failed:', error);
      notification.error({
        message: 'Login Failed',
        description: 'Invalid credentials. Please check your username and password.',
      });
    }
  };

  return (
    <Layout title="Register your account">
      <LoginForm onLogin={handleLogin} />
  </Layout>
  );
};

export default Login;
