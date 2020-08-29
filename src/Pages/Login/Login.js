import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import loginImage from '../../assets/images/loginImage.svg';
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
    axios.post('https://api.aflmonitoring.com/rest-auth/login/', {
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
                name="username"
                rules={[
                  {
                    required: true,
                    message: 'Please input your username!',
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

export default Login;
