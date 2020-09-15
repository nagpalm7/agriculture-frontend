import React, { Component } from 'react';
import { Form, Input, Typography, message } from 'antd';
import '../../formStyle.css';

import { axiosInstance } from '../../../utils/axiosIntercepter';

import MyButton from '../../../Components/ButtonComponent/MyButton';

const { Title } = Typography;

class AddDistrict extends Component {
  constructor() {
    super();
    this.state = {
      btnLoading: false,
    };
  }

  handleAddDistrict = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const { district_name, district_code } = event;

    axiosInstance
      .post('/api/district/', {
        district: district_name,
        district_code: district_code,
        state: 1,
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        console.log(res);
        message.success('District added');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        if (err.response) {
          console.log(err.response);
          message.error('Unable to add district');
        } else {
          message.error('Unable to add district');
          console.log(err.message);
        }
      });
  };

  render() {
    return (
      <div className="form-container">
        <div>
          <Title level={3}>Add District</Title>
        </div>
        <Form
          name="add_district"
          className="add-district"
          onFinish={this.handleAddDistrict}>
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
          <h3>
            <b>District Code</b>
          </h3>
          <Form.Item
            name="district_code"
            style={{ marginBottom: '10px' }}
            rules={[
              {
                required: true,
                message: 'Please provide district code!',
              },
            ]}>
            <Input placeholder="District Code" />
          </Form.Item>
          <Form.Item style={{ marginBottom: '10px' }}>
            <MyButton
              htmlType="submit"
              text="ADD"
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
    );
  }
}

export default AddDistrict;
