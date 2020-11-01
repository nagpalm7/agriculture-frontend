import React, { Component } from 'react';
import { Form, Input, Typography, message, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import '../../formStyle.css';
import MyButton from '../../../Components/ButtonComponent/MyButton';
const { Title } = Typography;
class AddAdo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      btnLoading: false,
    };
  }
  handleAddAdo = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const {
      ado_userName,
      ado_name,
      ado_email,
      ado_password,
      ado_phone,
    } = event;
    const state =
      localStorage.getItem('State') || sessionStorage.getItem('State');
    axiosInstance
      .post('/api/user/', {
        name: ado_name,
        phone: ado_phone,
        email: ado_email,
        username: ado_userName,
        password: ado_password,
        state: state,
        role: 5,
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        console.log(res);
        message.success('Ado added');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        message.error('Unable to add dda');
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };
  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div>
            <Title level={3}>Add ADO</Title>
          </div>

          <Form name="add_ado" className="add_ado" onFinish={this.handleAddAdo}>
            <h3>
              <b>User Name</b>
            </h3>
            <Form.Item
              name="ado_userName"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide ado name!',
                },
              ]}>
              <Input placeholder="Ado name" />
            </Form.Item>
            <h3>
              <b>Ado name</b>
            </h3>
            <Form.Item
              name="ado_name"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide dda name!',
                },
              ]}>
              <Input placeholder="Ado name" />
            </Form.Item>
            <h3>
              <b>Phone</b>
            </h3>
            <Form.Item name="ado_phone" style={{ marginBottom: '10px' }}>
              <Input placeholder="Phone Number" />
            </Form.Item>
            <h3>
              <b>Password</b>
            </h3>
            <Form.Item
              name="ado_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              style={{ marginBottom: '10px' }}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <h3>
              <b>Email Id</b>
            </h3>
            <Form.Item
              name="ado_email"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide email id!',
                },
              ]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <MyButton
                htmlType="submit"
                text="ADD"
                className="filled"
                loading={this.state.btnLoading}
                style={{
                  background: '#e03b3b',
                  borderColor: '#e03b3b',
                  color: '#ffffff',
                  fontWeight: '500',
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </Spin>
    );
  }
}
export default AddAdo;
