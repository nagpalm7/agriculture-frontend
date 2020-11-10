import React, { Component } from 'react';
import { Form, Input, Typography, message, Select, Spin } from 'antd';
import '../../formStyle.css';

import { axiosInstance } from '../../../utils/axiosIntercepter';

import MyButton from '../../../Components/ButtonComponent/MyButton';

const { Title } = Typography;
const { Option } = Select;
class AddVillages extends Component {
  constructor(props) {
    super(props);
    var children = [];

    children.push(
      <Option key="1" style={{ display: 'none' }}>
        dont'display
      </Option>,
    );

    this.state = {
      formLoading: false,
      btnLoading: false,
      blockData: [],
      adoData: [],
      children: children,
      loading: false,
      page: 1,
      isRendered: false,
    };
  }
  onScroll = (event) => {
    var target = event.target;
    if (
      !this.state.loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchAdo(this.state.page + 1);
        this.setState({ page: this.state.page + 1 });
      });
    }
  };
  fetchBlock = () => {
    this.setState({ ...this.state, formLoading: true });
    axiosInstance
      .get('/api/block/')
      .then((res) => {
        console.log(res);
        const blockData = res.data.map((item) => {
          return {
            block: item.block,
            id: item.id,
          };
        });
        this.setState({ ...this.state, blockData: blockData });
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

  fetchAdo = (page) => {
    axiosInstance
      .get(`/api/users-list/ado/?page=${page}`)
      .then((res) => {
        this.setState({ ...this.state, formLoading: false });
        const adoData = res.data.results.map((item) => {
          return {
            ado: item.user.username,
            id: item.user.id,
          };
        });
        var children = [...this.state.children];
        var length = children.length;

        adoData.map((ado) => {
          children.push(<Option key={ado.id}>{ado.ado}</Option>);
        });
        this.setState({ children: children }, () => {
          if (length == res.data.count - 5) {
            this.setState({ ...this.state, isRendered: true });
          }

          this.setState({ loading: false });
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

  componentDidMount() {
    this.fetchBlock();
    this.fetchAdo(1);
  }

  handleAddVillage = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const {
      village_name,
      village_code,
      village_subcode,
      blocklist,
      adolist,
    } = event;

    axiosInstance
      .post('/api/village/', {
        village: village_name,
        village_code: village_code,
        village_subcode: village_subcode,
        block: blocklist,
        ado: adolist === undefined ? null : adolist,
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        console.log(res);
        message.success('Village added');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
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
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
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
              <Input placeholder="Village name" />
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
              <Input placeholder="Village Code" />
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
              <Input placeholder="Village Sub Code" />
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
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }
                placeholder="Select Block">
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
            <Form.Item name="adolist" style={{ marginBottom: '16px' }}>
              <Select
                showSearch
                style={{ borderRadius: '7px', borderColor: '#707070' }}
                optionFilterProp="children"
                onChange={this.handleChange}
                onPopupScroll={this.onScroll}
                filterOption={(input, option) =>
                  option.children.toLowerCase().indexOf(input.toLowerCase()) >=
                  0
                }>
                {!this.state.loading && !this.state.isRendered
                  ? this.state.children
                  : this.state.isRendered == true
                  ? [
                      ...this.state.children,
                      <Option key="loaded">-------------------</Option>,
                    ]
                  : [
                      ...this.state.children,
                      <Option key="loading">Loading...</Option>,
                    ]}
              </Select>
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <MyButton
                htmlType="submit"
                text="ADD"
                className="filled"
                loading={this.state.btnLoading}
                style={{
                  background: 'crimson',
                  borderColor: 'crimson',
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

export default AddVillages;
