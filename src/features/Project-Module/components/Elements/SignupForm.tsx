"use client"
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { Button, Checkbox, Form, Input } from 'antd';
import React from "react";


const SignupForm: React.FC = () => {
  


  //  const Finish =(()=>{
  //     const token = onFinish;
  //     console.log(token);
      
  //     localStorage.setItem('token',object.values(token[1]))
  //     localStorage.setItem('name','bernard')
  //  })

  return (
    <Form
      name="normal_login"
      className="login-form"
      initialValues={{ remember: true }}

    >
      <Form.Item
        name="email"
        rules={[{ required: true, message: 'Please input your Username!' }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} style={{ width: '100%' }} placeholder="Username" />
      </Form.Item>
      <Form.Item
        name="password"
        rules={[{ required: true, message: 'Please input your Password!' }]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          style={{ width: '100%' }}
        />
      </Form.Item>
      <Form.Item
        name=""
        dependencies={['password']}
        rules={[
          {
            required: true,
          },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject(new Error('The new password that you entered do not match!'));
            },
          }),
        ]}
      >
        <Input placeholder='Confirm Password...' style={{ width: '100%' }}/>
      </Form.Item>
      <Form.Item>
        <Form.Item name="" valuePropName="checked" noStyle>
          <Checkbox>Remember me</Checkbox>
        </Form.Item>

        <a className="login-form-forgot" href="">
          Forgot password
        </a>
      </Form.Item>

      <Form.Item>
        <Button type="default" htmlType="submit" className="login-form-button">
          Log in
        </Button>
        Or <a href="">register now!</a>
      </Form.Item>
    </Form>
  );
};

export default SignupForm;
