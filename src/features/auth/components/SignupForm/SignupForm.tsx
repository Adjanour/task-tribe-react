import React from "react";
import { Form, Input, Button, Row, Col } from "antd";

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
    onSignup(values);
  };

  return (
    <Form
      name="signup"
      onFinish={onFinish}
      initialValues={{ remember: true }}
      requiredMark={false}
    >
      <Row>
        <Col span={24}>
          <Form.Item
            name="userName"
            label="Username"
            labelCol={{ span: 7}}
            rules={[
              { required: true, message: "Please enter your username!" },
              {
                pattern: /^[A-Za-z0-9]+$/,
                message: "Username must be alphanumeric.",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
          <Form.Item
            name="email"
            label="Email"
            labelCol={{ span: 7 }}
            rules={[
              { required: true, message: "Please enter your email!" },
              { type: "email", message: "Please enter a valid email address!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        
        <Col span={24}>
          <Form.Item
            name="firstName"
            label="First Name"
            labelCol={{ span: 7 }}
            rules={[
              { required: true, message: "Please enter your first name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
        </Row>
        <Row>
        <Col span={24}>
          <Form.Item
            name="lastName"
            label="Last Name"
            labelCol={{ span: 7}}
            rules={[
              { required: true, message: "Please enter your last name!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>
      
      <Row>
        <Col span={24}>
          <Form.Item
            name="password"
            label="Password"
            labelCol={{ span: 7 }}
            rules={[{ required: true, message: "Please enter your password!" }]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>
      <Row>
        <Col span={24}>
          <Form.Item
            name="confirmPassword"
            label="Confirm Password"
            labelCol={{ span: 7 }}
            rules={[
              { required: true, message: "Please confirm your password!" },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue("password") === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(
                    new Error(
                      "The two passwords that you entered do not match!"
                    )
                  );
                },
              }),
            ]}
          >
            <Input.Password />
          </Form.Item>
        </Col>
      </Row>

      <Row>
        <Col span={24} offset={20}>
          <Form.Item>
            <Button htmlType="submit">Signup</Button>
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default SignupForm;
