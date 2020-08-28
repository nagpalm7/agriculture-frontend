import React, { Component } from 'react';
import axios from 'axios';
import { Form, Input, Button, Checkbox, Row, Col } from 'antd';
import loginImage from './loginImage.svg';
import './Login.css';

const onFinish = (values) => {
  console.log('Received values of form: ', values);
};

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

  handleChange(event) {
    console.log(event.target.name, event.target.value);
    this.setState({ [event.target.name]: event.target.value });
  }

  onCheckboxChange = (e) => {
    console.log('checked = ', e.target.checked);
    this.setState({
      checked: e.target.checked,
    });
  };

  handleSubmit(event) {
    this.enterLoading();
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
        if (this.state.checked == true) {
          localStorage.setItem('Token', this.token);
          console.log('authorised user');
          this.props.history.push('/Dashboard');
        } else {
          this.props.history.push('/');
        }
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
  componentDidMount() {
    this.documentData = JSON.parse(localStorage.getItem('document'));

    if (localStorage.getItem('document')) {
      this.setState({
        email: this.documentData.email,
        password: this.documentData.password,
      });
    } else {
      this.setState({
        email: '',
        password: '',
      });
    }
  }

  enterLoading = () => {
    this.setState({ ...this.state, loadings: true });
  };

  onFinish = (values) => {
    console.log('Success:', values);
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  render() {
    const { loadings } = this.state;
    console.log(this.state);
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
              <h2>Log In</h2>
              <h5>Username</h5>
              <Form.Item
                name="username"
                onChange={this.handleChange}
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
                onChange={this.handleChange}
                rules={[
                  {
                    required: true,
                    message: 'Please input your Password!',
                  },
                ]}>
                <Input type="password" placeholder="Password" />
              </Form.Item>
              <Form.Item name="remember" valuePropName="unchecked" noStyle>
                <Checkbox
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
                    className="login-form-button"
                    onClick={this.handleSubmit}>
                    Log in
                  </Button>
                </Form.Item>
                <a className="login-form-forgot" href="">
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
