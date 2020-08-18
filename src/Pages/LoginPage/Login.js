import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import loginImage from './loginImage.svg';
import './Login.css';

const onFinish = (values) => {
  console.log('Success:', values);
};

const onFinishFailed = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: '',
      password: '',
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  handleSubmit(event) {
    const { email, password } = this.state;

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
  }

  render() {
    return (
      <div>
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
                  onChange={(event) => this.handleChange(event)}
                  name="email"
                />
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
                  onChange={(event) => this.handleChange(event)}
                  name="password"
                />
              </Form.Item>
              <Form.Item name="remember" valuePropName="checked">
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
              <Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    htmlType="submit"
                    onClick={this.handleSubmit}>
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
      </div>
    );
  }
}

export default Login;
