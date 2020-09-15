import React, { Component, createRef } from 'react';
import { Form, Input, Typography, message, Spin } from 'antd';
import '../../formStyle.css';

import { axiosInstance } from '../../../utils/axiosIntercepter';

import MyButton from '../../../Components/ButtonComponent/MyButton';

const { Title } = Typography;

class EditDistrict extends Component {
  constructor() {
    super();
    this.state = {
      formLoading: false,
      btnLoading: false,
    };
    this.formRef = createRef();
    this.districtId = '';
  }

  fetchDistrictInfo = () => {
    this.setState({ ...this.state, formLoading: true });
    this.districtId = this.props.history.location.pathname.split('/')[3];
    axiosInstance
      .get(`/api/district/${this.districtId}/`)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          district_name: res.data.district,
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

  handleEditDistrict = (e) => {
    this.setState({ ...this.state, btnLoading: true });
    const { district_name } = e;
    axiosInstance
      .put(`/api/district/${this.districtId}/`, {
        district: district_name,
      })
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, btnLoading: false });
        message.success('District updated successfully');
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
    this.fetchDistrictInfo();
  }

  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div>
            <Title level={3}>Edit District</Title>
          </div>
          <Form
            name="edit_district"
            className="edit-district"
            ref={this.formRef}
            onFinish={this.handleEditDistrict}>
            <h3>
              <b>District Name</b>
            </h3>
            <Form.Item
              name="district_name"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide district name!',
                },
              ]}>
              <Input placeholder="District name" />
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

export default EditDistrict;
