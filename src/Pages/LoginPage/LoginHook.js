import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import { PoweroffOutlined } from '@ant-design/icons';
import loginImage from './loginImage.svg';
import './Login.css';

const LoginHook = () => {
  let documentData;
  const onFinish = (values) => {
    console.log('Success:', values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  const onSubmit = (values) => console.log(values);
  const { handleSubmit, register, errors } = useForm();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loadings, setLoadings] = useState(false);

  const handleChange = (event) => {
    console.log(event.target.name, event.target.value);
    setEmail(event.target.value);
  };

  const handleSubmits = (event) => {
    enterLoading();
    axios
      .post('http://18.224.202.135:8000/rest-auth/login/', {
        email: email,
        password: password,
      })

      .then((response) => {
        console.log(response);
        console.log(response.status);

        if (response.status == 200) {
          console.log(this.props.history);
          this.props.history.push('/Dashboard');
        } else {
          alert('invalid user');
        }
      })
      .catch((error) => {
        console.log(error);
      });

    event.preventDefault();
    localStorage.setItem(
      'document',
      JSON.stringify({ email: email, password: password }),
    );
  };

  useEffect(() => {
    documentData = JSON.parse(localStorage.getItem('document'));

    if (localStorage.getItem('document')) {
      setEmail(documentData.email);
      setPassword(documentData.password);
    } else {
      setEmail('');
      setPassword('');
    }
  }, []);

  const enterLoading = () => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 6000);
  };
  return (
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
          onFinish={onFinish}
          onSubmit={handleSubmit(onSubmit)}>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: 'Please input your Username!',
              },
            ]}>
            <h2 className="size">LogIn</h2>
            <h5>User ID</h5>
            <Input
              type="text"
              onChange={handleChange}
              name="email"
              ref={register({
                required: 'Required',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'invalid email address',
                },
              })}
            />
            {errors.email && errors.email.message}
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
            <Input
              type="password"
              onChange={handleChange}
              name="password"
              ref={register({
                validate: (value) => value !== 'admin' || 'Nice try!',
              })}
            />
            {errors.username && errors.username.message}
          </Form.Item>
          <Form.Item name="remember" valuePropName="checked">
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
          <Form.Item>
            <Form.Item>
              <Button
                type="primary"
                size="small"
                loading={loadings}
                onClick={handleSubmits}
                htmlType="submit">
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
  );
};

export default LoginHook;
