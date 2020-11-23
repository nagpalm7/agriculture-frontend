import React, { Component, createRef } from 'react';
import '../../formStyle.css';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import { Spin, Typography, Form, Input, message, Select } from 'antd';
import MyButton from '../../../Components/ButtonComponent/MyButton';
const { Title } = Typography;
const { Option } = Select;
class EditPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      districtData: null,
      villageData: null,
      btnLoading: false,
    };
    this.formRef = createRef();
  }
  componentDidMount() {
    this.fetchLocationInfo();
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

  fetchVillageData=(district_id)=>{
    this.setState({ ...this.state, formLoading: true });
    axiosInstance.get(`api/villages-list/district/${district_id}/`)
    .then((res)=>{
      console.log(res);
      const villageData =(res.data.results)? res.data.results.map((village) => {
        return {
          village_id: village.id,
          village_name: village.village,
        };
      }):null;
      this.setState({
        ...this.state,
        villageData: villageData,
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
  }
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
        this.fetchVillageData(res.data.district.id);
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
  handleEditPending=(event)=>{
    this.setState({ ...this.state, btnLoading: true });
    const{district,village}=event;
    let locationId = this.props.history.location.pathname.split('/')[4];
    axiosInstance
    .put(`api/location/${locationId}/`,{
      district_name:district,
      village_name:village,
    })
    .then((res)=>{
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
  }
  handleDistrictSelect=(event)=>{
    this.fetchVillageData(event);
  }
  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div className="form-wrapper">
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
          </div>
        </div>
      </Spin>
    );
  }
}
export default EditPending;
