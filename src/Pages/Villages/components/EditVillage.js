import React, { Component, createRef } from 'react';
import { Form, Input, Typography, message, Select, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MyButton from '../../../Components/ButtonComponent/MyButton';
import '../../formStyle.css';
import './EditVillage.css';
const { Title } = Typography;
const { Option } = Select;
class EditVillage extends Component {
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
    this.formRef = createRef();
    this.villageId = '';
  }

  componentDidMount() {
    this.fetchVillageInfo();
    this.fetchBlockList();
    this.fetchAdoList(1);
  }
  onScroll = (event) => {
    var target = event.target;
    if (
      !this.state.loading &&
      target.scrollTop + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchAdoList(this.state.page + 1);
        this.setState({ page: this.state.page + 1 });
      });
    }
  };
  fetchVillageInfo = () => {
    this.setState({ ...this.state, formLoading: true });
    this.villageId = this.props.history.location.pathname.split('/')[3];
    axiosInstance
      .get(`/api/village/${this.villageId}/`)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          village_name: res.data.village,
          village_code: res.data.village_code,
          village_subcode: res.data.village_subcode,
          blocklist: res.data.block.id,
          adolist: res.data.ado.id,
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

  fetchAdoList = (page) => {
    axiosInstance
      .get(`/api/users-list/ado/?page=${page}`)
      .then((res) => {
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
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };

  handleEditVillage = (e) => {
    console.log(e);
    this.setState({ ...this.state, btnLoading: true });
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
        this.setState({ ...this.state, btnLoading: false });
        message.success('Village updated successfully');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
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
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div className="form-wrapper">
            <div className="left-form-content">
              <div className="edit-fix-button">Edit</div>
              <h3>
                <b>Village</b>
              </h3>
              <h3>
                <b>Village Code</b>
              </h3>
              <h3>
                <b>Village Sub Code</b>
              </h3>
              <h3>
                <b>Block</b>
              </h3>
              <h3>
                <b>ADO</b>
              </h3>
            </div>
            <div className="right-form-content">
              <div style={{ marginBottom: '40px' }}>
                <Title level={3}>Edit Village</Title>
              </div>
              <Form
                ref={this.formRef}
                name="edit_village"
                className="edit-village"
                onFinish={this.handleEditVillage}>
                <Form.Item
                  name="village_name"
                  style={{ marginBottom: '25px', width: '100%' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please provide village name!',
                    },
                  ]}>
                  <Input placeholder="Village name" />
                </Form.Item>

                <Form.Item
                  name="village_code"
                  style={{ marginBottom: '25px' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please provide village code!',
                    },
                  ]}>
                  <Input placeholder="Village Code" />
                </Form.Item>

                <Form.Item
                  name="village_subcode"
                  style={{ marginBottom: '25px' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please provide village subcode!',
                    },
                  ]}>
                  <Input placeholder="Village Sub Code" />
                </Form.Item>

                <Form.Item
                  name="blocklist"
                  style={{ marginBottom: '25px' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please select block!',
                    },
                  ]}>
                  <Select placeholder="Select Block">
                    {this.state.blockData.map((item) => {
                      return (
                        <Select.Option value={item.id}>
                          {item.block}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>

                <Form.Item name="adolist" style={{ marginBottom: '16px' }}>
                  <Select
                    showSearch
                    style={{ borderRadius: '7px', borderColor: '#707070' }}
                    optionFilterProp="children"
                    onChange={this.handleChange}
                    onPopupScroll={this.onScroll}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
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

                <Form.Item
                  style={{
                    marginBottom: '10px',
                    textAlign: 'right',
                  }}>
                  <MyButton
                    htmlType="submit"
                    text="UPDATE"
                    className="filled"
                    loading={this.state.btnLoading}
                    style={{
                      background: 'rgb(224, 59, 59)',
                      borderColor: 'rgb(224, 59, 59)',
                      color: '#ffffff',
                      fontWeight: '500',
                    }}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
      </Spin>
    );
  }
}

export default EditVillage;
