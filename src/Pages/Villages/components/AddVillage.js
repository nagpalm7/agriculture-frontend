import React, { Component } from 'react';
import { Form, Input, Button, Typography, message, Select } from 'antd';
import './addvillage.css';

import { axiosInstance } from '../../../utils/axiosIntercepter';

const { Title } = Typography;

class AddVillages extends Component {
  constructor() {
    super();
    this.state = {
      loadings: false,
      blockData: [],
      adoData: [],
    };
  }

  componentDidMount() {
    // console.log(this.blockRef.current);
    axiosInstance
      .get('/api/block/')
      .then((res) => {
        const blockData = res.data.map((item) => {
          return {
            block: item.block,
            id: item.id,
          };
        });
        this.setState({ ...this.state, blockData: blockData });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });

    axiosInstance
      .get('/api/users-list/ado/')
      .then((res) => {
        const adoData = res.data.results.map((item) => {
          return {
            ado: item.user.username,
            id: item.user.id,
          };
        });
        this.setState({ ...this.state, adoData: adoData });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  }

  handleAddVillage = (event) => {
    const { village_name, village_code, village_subcode, block } = event;

    axiosInstance
      .post('/api/village/', {
        village: village_name,
        village_code: village_code,
        village_subcode: village_subcode,
        block: block,
      })
      .then((res) => {
        console.log(res);
        message.success('Village added');
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
          message.error('Unable to add village');
        } else {
          message.error('Unable to add village');
          console.log(err.message);
        }
      });
  };

  render() {
    return (
      <div className="add-village-container">
        <div>
          <Title level={3}>Add Village</Title>
        </div>
        <Form
          name="add_village"
          className="add-village"
          onFinish={this.handleAddVillage}>
          <h3>
            <b>Village</b>
          </h3>
          <Form.Item
            name="village_name"
            style={{ marginBottom: '10px' }}
            rules={[
              {
                required: true,
                message: 'Please provide village name!',
              },
            ]}>
            <Input
              placeholder="Village name"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <h3>
            <b>Village Code</b>
          </h3>
          <Form.Item
            name="village_code"
            style={{ marginBottom: '10px' }}
            rules={[
              {
                required: true,
                message: 'Please provide village code!',
              },
            ]}>
            <Input
              placeholder="Village Code"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <h3>
            <b>Village Sub Code</b>
          </h3>
          <Form.Item
            name="village_subcode"
            style={{ marginBottom: '10px' }}
            rules={[
              {
                required: true,
                message: 'Please provide village subcode!',
              },
            ]}>
            <Input
              placeholder="Village Sub Code"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <h3>
            <b>Block</b>
          </h3>
          <Form.Item
            name="blocklist"
            style={{ marginBottom: '16px' }}
            rules={[
              {
                required: true,
                message: 'Please select block!',
              },
            ]}>
            <Select
              placeholder="Select Block"
              style={{ borderRadius: '7px', borderColor: '#707070' }}>
              {this.state.blockData.map((item) => {
                return (
                  <Select.Option value={item.id}>{item.block}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <h3>
            <b>Ado</b>
          </h3>
          <Form.Item
            name="adolist"
            style={{ marginBottom: '16px' }}
            rules={[
              {
                required: true,
                message: 'Please select ado!',
              },
            ]}>
            <Select
              placeholder="Select Ado"
              style={{ borderRadius: '7px', borderColor: '#707070' }}>
              {this.state.adoData.map((item) => {
                return (
                  <Select.Option value={item.id}>{item.ado}</Select.Option>
                );
              })}
            </Select>
          </Form.Item>
          <Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Button
                htmlType="submit"
                className="add-village-btn"
                style={{
                  background: '#3d0098',
                  borderColor: '#3d0098',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                ADD
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddVillages;
