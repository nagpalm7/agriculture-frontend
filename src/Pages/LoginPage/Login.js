import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import loginImage from './loginImage.svg';
import './Login.css';
import { Redirect } from 'react-router-dom';

class Login extends Component {
  token;
  documentData;
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loadings: false,
      checked: false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(value) {
    this.setState(value);
  }

  onCheckboxChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };

  handleSubmit(values) {
    console.log('Success:', values);
    this.setState({ loadings: true });
    const { email, password } = this.state;
    axios
      .post('http://api.aflmonitoring.com/rest-auth/login/', {
        email: email,
        password: password,
      })
      .then((response) => {
        console.log(response);
        this.token = response.data.key;
        this.setState({ ...this.state, loadings: false });

        if (response.status === 200) {
          //if response is ok, then check if u want to store the token in localstorage or sessionstorage
          if (this.state.checked === true) {
            localStorage.setItem('Token', this.token);
            console.log('authorised user');
            this.props.history.push('/Dashboard');
          } else {
            sessionStorage.setItem('Token', this.token);
            console.log('authorised user');
            this.props.history.push('/Dashboard');
          }
        } else {
          this.setState({ loadings: false });
          alert('Invalid user');
        }
      })
      .catch((error) => {
        this.setState({ loadings: false });
        alert('Invalid username or password');
        console.log(error);
      });
  }

  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { loadings } = this.state;
    if (localStorage.getItem('Token') || sessionStorage.getItem('Token')) {
      return <Redirect to="/Dashboard" />;
    } else {
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
                onValuesChange={this.handleChange}
                name="normal_login"
                className="login-form"
                onFinish={this.handleSubmit}>
                <h2>Log In</h2>
                <h5>Username</h5>
                <Form.Item
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Username!',
                    },
                  ]}>
                  <Input placeholder="Username" />
                </Form.Item>
                <h5>Password</h5>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: 'Please input your Password!',
                    },
                  ]}>
                  <Input type="password" placeholder="Password" />
                </Form.Item>
                <Form.Item valuePropName="unchecked">
                  <Checkbox
                    name="checked"
                    checked={this.state.checked}
                    onChange={this.onCheckboxChange}>
                    Remember me
                  </Checkbox>
                </Form.Item>
                <Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      loading={loadings}
                      className="login-form-button">
                      Log in
                    </Button>
                  </Form.Item>
                  <a className="login-form-forgot" href="/">
                    Forgot Password?
                  </a>
                </Form.Item>
              </Form>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

export default Login;
