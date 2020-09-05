import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Input, Checkbox } from 'antd';
import './Login.css';

class Login extends Component {
  token;
  documentData;
  constructor(props) {
    super(props);
    this.state = {
      username: '',
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

  handleSubmit(event) {
    // event.preventDefault();
    this.setState({ loadings: true });
    const { username, password } = this.state;
    axios
      .post('https://api.aflmonitoring.com/rest-auth/login/', {
        username: username,
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
          } else {
            sessionStorage.setItem('Token', this.token);
          }
          this.props.toggleIsLoggedIn();
          this.props.history.push('/home');
        } else {
          this.setState({ loadings: false });
          alert('Invalid user');
        }
      })
      .catch((error) => {
        this.setState({ loadings: false });
      });
  }

  render() {
    const { loadings } = this.state;
    return (
      <div className="main-content">
        <div className="left-content">
          <h1 style={{ textAlign: 'center' }}>AFL Monitoring</h1>
        </div>
        <div className="right-content">
          <Form
            onValuesChange={this.handleChange}
            name="normal_login"
            className="login-form"
            onFinish={this.handleSubmit}>
            <h1>
              <b>Log In</b>
            </h1>
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
              style={{ marginBottom: '16px' }}>
              <Input placeholder="Username" />
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
              style={{ marginBottom: '8px' }}>
              <Input type="password" placeholder="Password" />
            </Form.Item>
            <Form.Item
              valuePropName="unchecked"
              style={{ marginBottom: '16px' }}>
              <Checkbox
                name="checked"
                checked={this.state.checked}
                onChange={this.onCheckboxChange}>
                Remember me
              </Checkbox>
            </Form.Item>
            <Form.Item>
              <Form.Item style={{ marginBottom: '16px' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={loadings}
                  style={{ width: '150px' }}>
                  Log in
                </Button>
              </Form.Item>
              <a
                className="login-form-forgot"
                href="/"
                style={{ color: '#3d0098' }}>
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
