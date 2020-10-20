import React, { Component, createRef } from 'react';
import { Form, Input, Typography, message, Select, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MyButton from '../../../Components/ButtonComponent/MyButton';
import '../../formStyle.css';
import '../ADO.css';

const { Title } = Typography;

class EditAdo extends Component {
  constructor() {
    super();
    this.state = {
      formLoading: false,
      btnLoading: false,
      districtList: [],
    };
    this.formRef = createRef();
    this.adoId = '';
  }

  fetchAdoInfo = () => {
    this.setState({ ...this.state, formLoading: true });
    this.adoId = this.props.history.location.pathname.split('/')[3];
    axiosInstance
      .get(`/api/user/${this.adoId}/`)
      .then((res) => {
        console.log(res);
        this.formRef.current.setFieldsValue({
          ado_name: res.data.user.name,
          ado_phone: res.data.user.phone_number,
          ado_email: res.data.user.email,
          ado_username: res.data.user.username,
          ado_district: res.data.district.id,
        });
        this.setState({ ...this.state, formLoading: false });
      })
      .catch((err) => {
        this.setState({ ...this.state, formLoading: false });
        if (err.response) {
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  handleEditDda = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const {
      ado_name,
      ado_phone,
      ado_email,
      ado_district,
      ado_username,
    } = event;
    axiosInstance
      .put(`/api/user/${this.adoId}/`, {
        name: ado_name,
        phone: ado_phone,
        email: ado_email,
        username: ado_username,
        district: ado_district,
      })
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, btnLoading: false });
        message.success('Dda updated successfully');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        if (err.response) {
          message.error('Unable to update district');
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  componentDidMount() {
    this.fetchAdoInfo();
  }

  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div>
            <Title level={3}>Edit ADO</Title>
          </div>
          <Form
            name="edit_dda"
            className="edit-dda"
            ref={this.formRef}
            onFinish={this.handleEditDda}>
            <h3>
              <b>Ado name</b>
            </h3>
            <Form.Item
              name="ado_name"
              style={{ marginBottom: '10px', color: 'crimson' }}
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
            <h3>
              <b>Username</b>
            </h3>
            <Form.Item
              name="ado_username"
              rules={[
                {
                  required: true,
                  message: 'Please input your username!',
                },
              ]}
              style={{ marginBottom: '10px' }}>
              <Input placeholder="Username" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <MyButton
                htmlType="submit"
                text="UPDATE"
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

export default EditAdo;
