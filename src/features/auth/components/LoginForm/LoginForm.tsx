import React from "react";
import { Form, Input, Button, Space, Row, Col } from "antd";
import { Link } from "react-router-dom"; // Assuming you're using react-router-dom for navigation
import { InputEdit } from "@/components/Elements";

interface LoginFormProps {
  onLogin: (values: { email: string; password: string }) => void;
}

export const LoginForm: React.FC<LoginFormProps> = ({ onLogin }) => {
  const onFinish = (values: { email: string; password: string }) => {
    // Assuming a successful login, you can send the data to your backend
    onLogin(values);
  };

  return (
    <Form name="login" onFinish={onFinish} requiredMark={false}>
      <Row>
        <Col span={24}>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 4 }}
            className="mb-2 mr-1"
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <InputEdit placeholder="Enter Email"className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 4 }}
            className="mb-1 mr-1"
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password className="w-full" />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Row className="m-1 mt-1 ">
          <Col span={24} offset={4}>
            <Button htmlType="submit" className="mr-2">Login</Button>
            <Link to="/auth/forgot-password">Forgot Password?</Link>
          </Col>
        </Row>
        <Row>
          <Col span={24} offset={8} className="mt-2">
          <span className="font-semibold text-blue-300 mr-2">Don't have an account?</span>
          <Link to="/auth/signup">Sign Up</Link>
          </Col>
        </Row>
      </Form.Item>
    </Form>
  );
};

export default LoginForm;
