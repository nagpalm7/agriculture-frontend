import React, { Component, createRef } from 'react';
import '../../formStyle.css';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import { Spin, Typography, Row, Col, Form, Input, message, Select } from 'antd';
import MyButton from '../../../Components/ButtonComponent/MyButton';
const { Title } = Typography;
const { Option } = Select;
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const formTailLayout = {
  wrapperCol: { span: 24 },
};
class EditPending extends Component {
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
      districtData: null,
      villageData: null,
      children: children,
      isRendered: false,
      loading: false,
      adoData: [],
      children: children,
      page: 1,
      btnLoading: false,
      districtSlelectId: null,
    };
    this.formRef = createRef();
  }
  onScroll = (event) => {
    console.log(this.state.districtSlelectId);
    var target = event.target;
    if (
      !this.state.loading &&
      Math.ceil(target.scrollTop) + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchVillageData(
          this.state.districtSlelectId,
          this.state.page + 1,
        );
        this.setState({ page: this.state.page + 1 });
      });
    }
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
    this.fetchLocationInfo();
    this.fetchAdo(1);
    this.fetchDistrictData();
  }
  fetchDistrictData = () => {
    this.setState({ ...this.state, formLoading: true });
    axiosInstance
      .get(`/api/district/`)
      .then((res) => {
        console.log(res.data);
        const districtData = res.data.map((district) => {
          return {
            district_id: district.id,
            district_name: district.district,
          };
        });
        this.setState({
          ...this.state,
          districtData: districtData,
          formLoading: false,
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

  fetchVillageData = (district_id, page) => {
    axiosInstance
      .get(`api/villages-list/district/${district_id}/?page=${page}`)
      .then((res) => {
        console.log(res);
        const villageData = res.data.results
          ? res.data.results.map((village) => {
              return {
                village_id: village.id,
                village_name: village.village,
              };
            })
          : null;
        var children = [...this.state.children];
        var length = children.length;

        villageData.map((village) => {
          children.push(
            <Option value={village.village_id}>{village.village_name}</Option>,
          );
        });
        this.setState(
          {
            ...this.state,
            children: children,
            loading: false,
            formLoading: false,
          },
          () => {
            if (length == res.data.count) {
              this.setState({ ...this.state, isRendered: true });
            }

            this.setState({
              ...this.state,
              formLoading: false,
              loading: false,
            });
          },
        );
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
          isRendered: true,
          formLoading: false,
        });
        if (err.response) {
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };
  fetchLocationInfo = () => {
    let locationId = this.props.history.location.pathname.split('/')[4];
    this.setState({ ...this.state, formLoading: true });
    axiosInstance
      .get(`api/location/${locationId}/`)
      .then((res) => {
        console.log(res);
        this.formRef.current.setFieldsValue({
          district: res.data.district.id,
          village: res.data.village_name.id,
        });
        this.fetchVillageData(res.data.district.id, 1);
        this.setState({
          ...this.state,
          districtSlelectId: res.data.district.id,
          formLoading: false,
        });
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
  handleEditPending = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const { district, village , adolist } = event;
    console.log( adolist);
    let locationId = this.props.history.location.pathname.split('/')[4];
    axiosInstance
      .put(`api/update/location/${locationId}`, {
        ado : adolist,
      })
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, btnLoading: false });
        message.success('Pending Location updated successfully');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        if (err.response) {
          message.error('Unable to update Pending Location');
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };
  handleDistrictSelect = (event) => {
    this.setState(
      {
        ...this.state,
        districtSlelectId: event,
        children: [],
        page: 1,
      },
      () => {
        this.fetchVillageData(event, 1);
      },
    );
  };
  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <Row style={{ marginBottom: '20px' }}>
            <Col
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="edit-fix-button">Edit</div>
            </Col>
            <Col md={18} md={18}>
              <Title level={3}>Edit Pending Location</Title>
            </Col>
          </Row>
          <Row>
            <Form
              {...layout}
              name="edit_pending"
              className="edit-pending"
              colon={false}
              style={{ width: '100%' }}
              ref={this.formRef}
              onFinish={this.handleEditPending}>
             
              <Form.Item  label=" Ado" name="adolist" style={{ marginBottom: '25px' }}
            rules={[
                {
                  required: true,
                  message: 'Please provide Ado name!',
                },
              ]}>
                <Select
                showSearch
                style={{ borderRadius: '7px', borderColor: '#707070' }}
                optionFilterProp="children"
                onChange={this.handleChange}
                onPopupScroll={this.onScroll}>
                {!this.state.loading && !this.state.isRendered
                  ? this.state.children
                  : this.state.isRendered == true
                  ? [
                      ...this.state.children,
                      <Option key="loaded">-------------------</Option>,
                    ]
                  : [
                      ...this.state.children,
                      <Option key="loading" style={{ textAlign: 'center' }}>
                        <Spin spinning={true}></Spin>
                      </Option>,
                    ]}
              </Select>
              </Form.Item>
              <Form.Item
                style={{
                  marginBottom: '10px',
                  textAlign: 'right',
                }}
                {...formTailLayout}>
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
          </Row>
          {/* <div className="form-wrapper">
            <div className="left-form-content">
              <div className="edit-fix-button">Edit</div>
              <h3>
                <b>District</b>
              </h3>
              <h3>
                <b>Village</b>
              </h3>
            </div>
            <div className="right-form-content">
              <div style={{ marginBottom: '40px' }}>
                <Title level={3}>Edit District</Title>
              </div>
              <Form
                name="edit_pending"
                className="edit-pending"
                ref={this.formRef}
                onFinish={this.handleEditPending}>
                <Form.Item
                  name="district"
                  style={{ marginBottom: '25px' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please provide district name!',
                    },
                  ]}
                
                  >
                  <Select
                    showSearch
                    placeholder="Select District"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    onChange={this.handleDistrictSelect}>
                    {this.state.districtData
                      ? this.state.districtData.map((item) => {
                          return (
                            <Option value={item.district_id}>
                              {item.district_name}
                            </Option>
                          );
                        })
                      : null}
                  </Select>
                </Form.Item>
                <Form.Item
                  name="village"
                  style={{ marginBottom: '25px' }}
                  rules={[
                    {
                      required: true,
                      message: 'Please provide district name!',
                    },
                  ]}>
                    <Select
                    showSearch
                    placeholder="Select Village"
                    optionFilterProp="children"
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                    >
                    {this.state.villageData
                      ? this.state.villageData.map((item) => {
                          return (
                            <Option value={item.village_id}>
                              {item.village_name}
                            </Option>
                          );
                        })
                      : null}
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
          </div> */}
        </div>
      </Spin>
    );
  }
}
export default EditPending;
