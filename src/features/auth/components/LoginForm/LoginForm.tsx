import React from 'react';
import { Form, Input, Button, Space } from 'antd';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom for navigation

interface LoginFormProps {
  onLogin: (values: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const onFinish = (values: { email: string; password: string }) => {
    // Assuming a successful login, you can send the data to your backend
    onLogin(values);
  };

  return (
    <Form name="login" onFinish={onFinish}>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <Input.Password />
      </Form.Item>

      <Form.Item>
        <Space>
          <Button htmlType="submit">
            Login
          </Button>
          <span>Don't have an account?</span>
          <Link to="/auth/signup">Sign Up</Link>
        </Space>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
