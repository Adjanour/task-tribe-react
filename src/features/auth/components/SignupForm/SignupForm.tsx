import React from 'react';
import { Form, Input, Button } from 'antd';

interface SignupFormProps {
  onSignup: (values: {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => void;
}

export const SignupForm: React.FC<SignupFormProps> = ({ onSignup }) => {
  const onFinish = (values: {
    userName: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
  }) => {
    // Assuming a successful signup, you can send the data to your backend
    onSignup(values);
  };

  return (
    <Form name="signup" onFinish={onFinish} initialValues={{ remember: true }}>
      <Form.Item
        name="userName"
        label="Username"
        rules={[{ required: true, message: 'Please enter your username!' }]}
      >
        <Input />
      </Form.Item>

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

      <Form.Item
        name="firstName"
        label="First Name"
        rules={[{ required: true, message: 'Please enter your first name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        name="lastName"
        label="Last Name"
        rules={[{ required: true, message: 'Please enter your last name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button htmlType="submit">
          Signup
        </Button>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
