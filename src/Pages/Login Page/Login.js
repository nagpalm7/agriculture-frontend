import React from 'react';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import loginImage from './loginImage.svg';
import './Login.css';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login = () => {
  return (
    <>
      <Row>
        <Col span={8}>
          <div>
            <img src={loginImage} alt="login page" className="image" />
            <div className="top-left">
              <h1>AFL Monitoring</h1>
            </div>
          </div>
        </Col>
        <Col span={16}>
          <Form
            name="normal_login"
            className="login-form"
            initialValues={{
              remember: true,
            }}
            onFinish={onFinish}>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your Username!',
                },
              ]}>
              <h2 className="size">LogIn</h2>
              <h5>User ID</h5>
              <Input />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}>
              <h5>Password</h5>
              <Input type="password" />
            </Form.Item>
            <Form.Item name="remember" valuePropName="checked">
              <Checkbox>Remember me</Checkbox>
            </Form.Item>
            <Form.Item>
              <Form.Item>
                <Button type="primary" htmlType="submit">
                  Login
                </Button>
              </Form.Item>
              <a className="login-form-forgot" href="">
                Forgot password?
              </a>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </>
  );
};

export default Login;
