import React, { Component } from 'react';
import { Form, Input, Typography, message, Select, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import '../../formStyle.css';

import MyButton from '../../../Components/ButtonComponent/MyButton';

const { Title } = Typography;

class AddDda extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      btnLoading: false,
      district_id: null,
    };
  }

  componentDidMount() {
    const district_id = this.props.history.location.pathname.split('/')[2];
    this.setState({ ...this.state, district_id: district_id });
  }
  handleAddBlock = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const { block_name, block_code } = event;
    const district_id = this.props.history.location.pathname.split('/')[2];

    axiosInstance
      .post('api/block/', {
        block: block_name,
        block_code: block_code,
        district: district_id,
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        console.log(res);
        message.success('Block added');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        message.error('Unable to add block');
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
            <Title level={3}>Add Block</Title>
          </div>
          <Form
            name="add_block"
            className="add-block"
            onFinish={this.handleAddBlock}>
            <h3>
              <b>Block name</b>
            </h3>
            <Form.Item
              name="block_name"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide block name!',
                },
              ]}>
              <Input placeholder="Block name" />
            </Form.Item>
            <h3>
              <b>Block Code</b>
            </h3>
            <Form.Item
              name="block_code"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide block code!',
                },
              ]}>
              <Input placeholder="Block Code" />
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

export default AddDda;
