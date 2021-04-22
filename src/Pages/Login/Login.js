import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Input, Checkbox, message } from 'antd';
import './Login.css';
import { axiosInstance } from '../../utils/axiosIntercepter';

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loadings: false,
      checked: false,
    };
  }

  onCheckboxChange = (e) => {
    this.setState({ ...this.state, checked: e.target.checked });
  };

  handleSubmit = (event) => {
    console.log(event);
    this.setState({ ...this.state, loadings: true });
    const { username, password } = event;
    axios
      .post('https://api.aflmonitoring.com/rest-auth/login/', {
        username: username,
        password: password,
      })
      .then((response) => {
        this.setState({ ...this.state, loadings: false });
        const token = response.data.key;
        if (token)
          axiosInstance.interceptors.request.use(function (config) {
            config.headers.Authorization = 'token ' + token;
            return config;
          });
        // getting user role
        axios
          .get('https://api.aflmonitoring.com/api/get-user/', {
            headers: {
              Authorization: `token ${token}`,
            },
          })
          .then((res) => {
            console.log(this.state.checked);
            const role = res.data.user.role;
            const state =
              res.data.user.state == null ? null : res.data.user.state.state;
            const dda_id = role == 4 ? res.data.user.id : null;
            if (this.state.checked == true) {
              localStorage.setItem('token', token);
              localStorage.setItem('Role', role);
              localStorage.setItem('State', state);
              localStorage.setItem('dda_id', dda_id);
            } else {
              sessionStorage.setItem('token', token);
              sessionStorage.setItem('Role', role);
              sessionStorage.setItem('State', state);
              sessionStorage.setItem('dda_id', dda_id);
            }
            message.success('Login Successfull');
            this.props.toggleIsLoggedIn();
            this.props.setRole(role);
            this.props.history.push('/home');
          })
          .catch((err) => {
            if (err.response) {
              console.log(err.response);
            } else {
              console.log(err.message);
            }
          });
      })
      .catch((error) => {
        this.setState({ ...this.state, loadings: false });
        if (error.response) {
          message.error(error.response.data.non_field_errors[0]);
        } else {
          message.error(error.message);
        }
      });
  };
  componentDidMount() {
    document.title = 'AFL Monitoring';
  }
  render() {
    const { loadings } = this.state;
    return (
      <div className="main-content">
        <div className="left-content">
          <h3 className="page-title">AFL Monitoring</h3>
        </div>
        <div className="right-content">
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.handleSubmit}>
            <h2>
              <b>LogIn</b>
            </h2>
            <h5>
              <b>Username</b>
            </h5>
            <Form.Item
              name="username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              style={{ marginBottom: '10px' }}>
              <Input placeholder="Username" style={{ borderRadius: '7px' }} />
            </Form.Item>
            <h5>
              <b>Password</b>
            </h5>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              style={{ marginBottom: '0' }}>
              <Input.Password
                placeholder="Password"
                style={{ borderRadius: '7px' }}
              />
            </Form.Item>
            <Form.Item
              valuePropName="unchecked"
              style={{ marginBottom: '5px' }}>
              <Checkbox
                name="checked"
                checked={this.state.checked}
                onChange={this.onCheckboxChange}>
                <span style={{ fontWeight: 500 }}>Remember me</span>
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Form.Item style={{ marginBottom: '16px' }}>
                <Button
                  htmlType="submit"
                  loading={loadings}
                  className="login-btn"
                  style={{
                    background: '#e03b3b',
                    borderColor: '#e03b3b',
                    color: '#ffffff',
                    fontWeight: '500',
                  }}>
                  LOGIN
                </Button>
              </Form.Item>
              <a
                className="login-form-forgot"
                href="/"
                style={{ color: '#e03b3b' }}>
                Forgot Password?
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default Login;
