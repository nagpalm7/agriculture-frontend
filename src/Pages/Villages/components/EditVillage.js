import React, { Component, createRef } from 'react';
import { Form, Input, Typography, message, Select } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MyButton from '../../../Components/ButtonComponent/MyButton';
import './addvillage.css';

const { Title } = Typography;
class EditVillage extends Component {
  constructor() {
    super();
    this.state = {
      blockData: [],
      adoData: [],
    };
    this.formRef = createRef();
    this.villageId = '';
  }

  componentDidMount() {
    this.fetchVillageInfo();
    this.fetchBlockList();
    this.fetchAdoList();
  }

  fetchVillageInfo = () => {
    this.villageId = this.props.history.location.pathname.split('/')[3];
    axiosInstance
      .get(`/api/village/${this.villageId}/`)
      .then((res) => {
        console.log(res);
        this.formRef.current.setFieldsValue({
          village_name: res.data.village,
          village_code: res.data.village_code,
          village_subcode: res.data.village_subcode,
          blocklist: res.data.block.id,
          adolist: res.data.ado,
        });
      })
      .catch((err) => {
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };

  fetchBlockList = () => {
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
  };

  fetchAdoList = () => {
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
  };

  handleEditVillage = (e) => {
    const {
      village_name,
      village_code,
      village_subcode,
      blocklist,
      adolist,
    } = e;
    axiosInstance
      .put(`/api/village/${this.villageId}/`, {
        village: village_name,
        village_code: village_code,
        village_subcode: village_subcode,
        block: blocklist,
        ado: adolist,
      })
      .then((res) => {
        console.log(res);
        message.success('Village updated successfully');
      })
      .catch((err) => {
        if (err.response) {
          message.error('Unable to update village');
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  render() {
    return (
      <div className="form-container">
        <div>
          <Title level={3}>Edit Village</Title>
        </div>
        <Form
          ref={this.formRef}
          name="edit_village"
          className="edit-village"
          onFinish={this.handleEditVillage}>
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
          <Form.Item name="adolist" style={{ marginBottom: '16px' }}>
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

          <Form.Item style={{ marginBottom: '10px' }}>
            <MyButton
              htmlType="submit"
              text="UPDATE"
              type="filled"
              extraStyle={{
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

export default EditVillage;
