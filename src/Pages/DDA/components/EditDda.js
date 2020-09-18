import React, { Component, createRef } from 'react';
import { Form, Input, Typography, message, Select, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MyButton from '../../../Components/ButtonComponent/MyButton';
import '../../formStyle.css';

const { Title } = Typography;

class EditDda extends Component {
  constructor() {
    super();
    this.state = {
      formLoading: false,
      btnLoading: false,
      districtList: [],
    };
    this.formRef = createRef();
    this.ddaId = '';
  }

  fetchDistrict = () => {
    this.setState({ ...this.state, formLoading: true });
    axiosInstance
      .get('/api/district/')
      .then((res) => {
        const districtList = res.data.map((item) => {
          return {
            id: item.id,
            district: item.district,
          };
        });
        this.setState({
          ...this.state,
          districtList: districtList,
          formLoading: false,
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, formLoading: false });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };

  fetchDdaInfo = () => {
    this.setState({ ...this.state, formLoading: true });
    this.ddaId = this.props.history.location.pathname.split('/')[3];
    axiosInstance
      .get(`/api/user/${this.ddaId}/`)
      .then((res) => {
        console.log(res);
        this.formRef.current.setFieldsValue({
          dda_name: res.data.user.name,
          dda_phone: res.data.user.phone,
          dda_email: res.data.user.email,
          dda_username: res.data.user.username,
          dda_district: res.data.district.id,
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
      dda_name,
      dda_phone,
      dda_email,
      dda_district,
      dda_username,
    } = event;
    axiosInstance
      .put(`/api/user/${this.ddaId}/`, {
        name: dda_name,
        phone: dda_phone,
        email: dda_email,
        username: dda_username,
        district: dda_district,
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
    this.fetchDdaInfo();
    this.fetchDistrict();
  }

  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div>
            <Title level={3}>Edit Dda</Title>
          </div>
          <Form
            name="edit_dda"
            className="edit-dda"
            ref={this.formRef}
            onFinish={this.handleEditDda}>
            <h3>
              <b>Dda name</b>
            </h3>
            <Form.Item
              name="dda_name"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide dda name!',
                },
              ]}>
              <Input placeholder="Dda name" />
            </Form.Item>
            <h3>
              <b>Phone</b>
            </h3>
            <Form.Item name="dda_phone" style={{ marginBottom: '10px' }}>
              <Input placeholder="Phone Number" />
            </Form.Item>
            <h3>
              <b>Email Id</b>
            </h3>
            <Form.Item
              name="dda_email"
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
              <b>District</b>
            </h3>
            <Form.Item
              name="dda_district"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please select district!',
                },
              ]}>
              <Select
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                placeholder="Select district">
                {this.state.districtList.map((item) => {
                  return (
                    <Select.Option value={item.id}>
                      {item.district}
                    </Select.Option>
                  );
                })}
              </Select>
            </Form.Item>
            <h3>
              <b>Username</b>
            </h3>
            <Form.Item
              name="dda_username"
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
                  background: '#3d0098',
                  borderColor: '#3d0098',
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

export default EditDda;
