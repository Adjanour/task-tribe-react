import { useNavigate } from 'react-router-dom';
import React from 'react';
import { notification } from 'antd';
import {SignupForm} from '../components/SignupForm';
import useAuth from '../../../hooks/useAuth';
import { Layout } from '../components/Layout';

const Signup: React.FC = () => {
  const { signupFn } = useAuth();
  const navigate = useNavigate()
  const handleSignup = async (values: any) => {
    try {
      // Call the signup function
      await signupFn(values);

      // Optionally, redirect to the login page
      navigate("/auth/login",{state:{from:"auth/signup"}})
      
      notification.success({
        message: 'Signup Successful',
        description: 'You have successfully signed up!',
      });
    } catch (error) {
      console.error('Signup failed:', error);
      notification.error({
        message: 'Signup Failed',
        description: 'There was an error during signup. Please try again.',
      });
    }
  };

  return (
    <Layout title="Sign up for your account">
      <SignupForm onSignup={handleSignup} />
  </Layout>
  );
};

export default Signup;
