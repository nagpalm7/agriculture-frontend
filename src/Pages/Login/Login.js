import React, { Component } from 'react';
import axios from 'axios';
import { Form, Button, Input, Checkbox, message, Select } from 'antd';
import './Login.css';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';
const { Option } = Select;

class Login extends Component {
  constructor() {
    super();
    this.state = {
      loadings: false,
      checked: false,
      localeLang: 'en',
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
            console.log(res);
            console.log(this.state.checked);
            const role = res.data.user.role;
            let logData = JSON.stringify(res.data);
            this.props.setLang(this.state.localeLang);
            if (this.state.checked == true) {
              localStorage.setItem('token', token);
              localStorage.setItem('Role', role);
              localStorage.setItem('loginData', logData);
              localStorage.setItem('lang',this.state.localeLang);
            } else {
              sessionStorage.setItem('token', token);
              sessionStorage.setItem('Role', role);
              sessionStorage.setItem('loginData', logData);
              sessionStorage.setItem('lang',this.state.localeLang);
            }
            message.success('Login Successfull');
            this.props.toggleIsLoggedIn();
            this.props.setRole(role);
            this.props.setLoginData(res.data);
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
    console.log(Languages);
    document.title = 'AFL Monitoring';
  }
  render() {
    const { loadings } = this.state;
    return (
      <IntlProvider locale={this.state.localeLang} messages={Languages[this.state.localeLang]}>
        <div className="main-content">
        <div className="left-content">
          <h3 className="page-title">
            <FormattedMessage
            id="afl"
            defaultMessage="some default one"
            values={ this.state.localeLang }
          />
          <span> </span>
           <FormattedMessage
            id="monitoring"
            defaultMessage="some default one"
            values={ this.state.localeLang }
          />
          </h3>
        </div>
        <div className="right-content">
          <div className="select_lang">
          <Select
            style={{ width: '100px' }}
            defaultValue="en"
            onChange={(e) => {
              console.log(e);
              this.setState({ ...this.state, localeLang: e });
            }}>
            <Option value="hi">Hindi</Option>
            <Option value="en">English</Option>
          </Select>
          </div>
          <Form
            name="normal_login"
            className="login-form"
            onFinish={this.handleSubmit}>
            <h2>
              <b> <FormattedMessage
                  id="login"
                  defaultMessage="some default one"
                  values={ this.state.localeLang }
                  /></b>
            </h2>
            <h5>
              <b> <FormattedMessage
                  id="username"
                  defaultMessage="some default one"
                  values={ this.state.localeLang }
                  /></b>
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
              <b><FormattedMessage
                  id="password"
                  defaultMessage="some default one"
                  values={ this.state.localeLang }
                  /></b>
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
                <span style={{ fontWeight: 500 }}><FormattedMessage
                  id="rememberMe"
                  defaultMessage="some default one"
                  values={ this.state.localeLang }
                  /></span>
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
                    {' '}
                  <FormattedMessage
                  id="login"
                  defaultMessage="some default one"
                  values={ this.state.localeLang }
                  />
                 
                </Button>
              </Form.Item>
              <a
                className="login-form-forgot"
                href="/"
                style={{ color: '#e03b3b' }}>
                <FormattedMessage
                  id="forgotPass"
                  defaultMessage="some default one"
                  values={ this.state.localeLang }
                  />?
              </a>
            </Form.Item>
          </Form>
        </div>
      </div>
      </IntlProvider>
      
    );
  }
}

export default Login;