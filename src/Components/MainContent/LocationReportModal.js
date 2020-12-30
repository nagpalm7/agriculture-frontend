import React, { Component } from 'react';
import { Modal, DatePicker, Form, Spin, Select, message, Button } from 'antd';
import MyButton from '../ButtonComponent/MyButton';
import { axiosInstance } from '../../utils/axiosIntercepter';

import './MainContent.css';
const { Option } = Select;
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD';
class LocationReport extends Component {
  constructor(props) {
    super(props);
    var villageChildren = [];

    villageChildren.push(
      <Option value={undefined} style={{ display: 'none' }}></Option>,
    );

    var ado_children = [];

    ado_children.push(<Option value={undefined}>No ADO</Option>);
    this.state = {
      isLocationModalOpen: false,
      reportLink: null,
      loading: true,
      village_loading: true,
      btnLoading: false,
      district: null,
      slectedDistrict: null,
      villageChildren: villageChildren,
      villageList: null,
      districtId: null,
      vilPage: 1,
      isVillageRendered: false,
      ado_loading: true,
      ado_children: ado_children,
      isAdoRendered: false,
      adoPage: 1,
    };
  }
  fetchAdoList = (page) => {
    axiosInstance
      .get(`/api/users-list/ado/?page=${page}`)
      .then((res) => {
        this.setState({ ...this.state, ado_loading: false });
        const adoData = res.data.results.map((item) => {
          return {
            ado: item.user.username,
            id: item.user.id,
          };
        });
        var ado_children = [...this.state.ado_children];
        var length = ado_children.length;

        adoData.map((ado) => {
          ado_children.push(
            <Option key={ado.id} value={ado.ado}>
              {ado.ado}
            </Option>,
          );
        });
        this.setState({ ado_children: ado_children }, () => {
          if (length == res.data.count - 5) {
            this.setState({ ...this.state, isAdoRendered: true });
          }

          this.setState({ ado_loading: false });
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, ado_loading: false });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };
  fetchVillageList = (distId, page) => {
    this.setState({
      ...this.state,
      village_loading: true,
    });
    axiosInstance
      .get(`/api/villages-list/district/${distId}?page=${page}`)
      .then((res) => {
        this.setState({
          ...this.setState,

          village_loading: false,
        });
        const villageData = res.data.results.map((item) => {
          return {
            village: item.village,
            id: item.id,
          };
        });
        var villageChildren = [...this.state.villageChildren];
        var length = villageChildren.length;
        villageData.map((vill) => {
          villageChildren.push(
            <Option key={vill.id} value={vill.village}>
              {vill.village}
            </Option>,
          );
        });

        this.setState({ villageChildren: villageChildren }, () => {
          var rendered = false;
          if (villageChildren.length == res.data.count) {
            rendered = true;
          }
          this.setState({
            ...this.state,
            isVillageRendered: rendered,
            village_loading: false,
          });
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, village_loading: false });
        console.log(err);
      });
  };
  onScroll = (event) => {
    var target = event.target;
    if (
      !this.state.village_loading &&
      !this.state.isVillageRendered &&
      Math.ceil(target.scrollTop) + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ village_loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchVillageList(
          this.state.slectedDistrict,
          this.state.vilPage + 1,
        );
        this.setState({ ...this.state, vilPage: this.state.vilPage + 1 });
      });
    }
  };
  onAdoScroll = (event) => {
    var target = event.target;
    if (
      !this.state.ado_loading &&
      !this.state.isAdoRendered &&
      Math.ceil(target.scrollTop) + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ ado_loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchAdoList(this.state.adoPage + 1);
        this.setState({ ...this.state, adoPage: this.state.adoPage + 1 });
      });
    }
  };
  fetchDistricts = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    axiosInstance
      .get('/api/district/')
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          district: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        console.log(err);
      });
  };
  componentDidMount() {
    this.fetchDistricts();
    this.fetchAdoList(1);
  }
  fetchReportLink = (
    startDate,
    EndDate,
    status,
    adoName,
    district,
    village,
  ) => {
    this.setState({
      btnLoading: true,
    });
    axiosInstance
      .get(
        `api/generate-location-report/?start=${startDate}&end=${EndDate}&status=${status.toLowerCase()}&village=${village}&district=${district}&ado=${adoName}`,
      )
      .then((res) => {
        console.log(res);
        if (res.statusText == 'No Content') {
          message.warning('No report found');
        } else {
          message.success('Successfull fetched report');
        }
        this.setState({
          btnLoading: false,
          reportLink: res.data.csvFile,
        });
      })
      .catch((err) => {
        message.warning(err);
        this.setState({
          btnLoading: false,
        });
      });
  };
  showLocationModal = () => {
    this.setState({
      ...this.state,
      isLocationModalOpen: !this.state.isLocationModalOpen,
    });
  };
  onFinish = (event) => {
    console.log(event);
    const startDate = event.range[0].format(dateFormat);
    const endDate = event.range[0].format(dateFormat);
    const ado = event.Ado;
    var district;
    if (event.District) {
      district = event.District.toString().split(' ')[0];
    }
    const village = event.village;

    this.fetchReportLink(
      startDate,
      endDate,
      this.props.status,
      ado,
      district,
      village,
    );
  };
  changeDistrict = (e) => {
    console.log(e);
    if (e) {
      const districtId = e.toString().split(' ')[1];
      this.setState(
        {
          ...this.state,
          slectedDistrict: districtId,
          vilPage: 1,
          villageChildren: [],
        },
        () => {
          this.fetchVillageList(districtId, 1);
        },
      );
    }
  };
  render() {
    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    return (
      <>
        <MyButton
          text="Location Report"
          className="filled"
          style={{
            color: '#e03b3b',
            backgroundColor: '#f5f3ff',
            border: '0px',
          }}
          onClick={this.showLocationModal}
        />
        <Modal
          title={`Download ${this.props.status} location report`}
          centered
          visible={this.state.isLocationModalOpen}
          onCancel={this.showLocationModal}
          style={{
            padding: '10px',
          }}
          footer={[]}>
          <div className="locationMdalWrapper">
            Everything expect date field is optional*
            <Form {...layout} id="reportform" onFinish={this.onFinish}>
              <Form.Item
                name="range"
                label="Date Range"
                rules={[
                  {
                    required: true,
                  },
                ]}>
                <RangePicker
                  style={{ borderRadius: '40px' }}
                  onChange={this.handleDateChange}></RangePicker>
              </Form.Item>

              <Form.Item name="District" label="Select District">
                <Select
                  showSearch
                  placeholder="Select District"
                  onChange={this.changeDistrict}>
                  <Option value={undefined}>No District</Option>
                  {!this.state.loading ? (
                    this.state.district.map((district) => {
                      return (
                        <Option
                          key={district.id}
                          value={`${district.district} ${district.id}`}>
                          {district.district}
                        </Option>
                      );
                    })
                  ) : (
                    <Option style={{ textAlign: 'center' }}>
                      <Spin spinning={true}></Spin>
                    </Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item name="village" label="Select Village">
                <Select
                  showSearch
                  onPopupScroll={this.onScroll}
                  placeholder="Select Village">
                  <Option value={undefined}>No Village</Option>

                  {this.state.slectedDistrict != null ? (
                    this.state.village_loading == false &&
                    !this.state.isVillageRendered ? (
                      [...this.state.villageChildren]
                    ) : this.state.isVillageRendered == true ? (
                      [...this.state.villageChildren]
                    ) : (
                      [
                        ...this.state.villageChildren,
                        <Option key="loading" style={{ textAlign: 'center' }}>
                          <Spin spinning={true}></Spin>
                        </Option>,
                      ]
                    )
                  ) : (
                    <Option
                      value={undefined}
                      style={{
                        textAlign: 'center',

                        color: 'red',
                      }}>
                      Select the district first
                    </Option>
                  )}
                </Select>
              </Form.Item>
              <Form.Item name="Ado" label="Select ADO">
                <Select
                  showSearch
                  style={{ borderRadius: '7px', borderColor: '#707070' }}
                  optionFilterProp="children"
                  onPopupScroll={this.onAdoScroll}
                  placeholder="select ADO">
                  {!this.state.ado_loading && !this.state.isAdoRendered
                    ? this.state.ado_children
                    : this.state.isAdoRendered == true
                    ? [...this.state.ado_children]
                    : [
                        ...this.state.ado_children,
                        <Option key="loading" style={{ textAlign: 'center' }}>
                          <Spin spinning={true}></Spin>
                        </Option>,
                      ]}
                </Select>
              </Form.Item>
              <Form.Item
                wrapperCol={{ span: 24, offset: 0 }}
                labelCol={{ span: 0 }}
                style={{
                  marginTop: '50px',
                  marginBottom: '-20px',
                }}>
                <div className="reportLinks">
                  {this.state.reportLink ? (
                    <div id="linksreport">
                      <div>Download the report</div>
                      <a href={this.state.reportLink}>
                        {this.state.reportLink}
                      </a>
                    </div>
                  ) : null}
                </div>
                <div>
                  <Button
                    key="link_btn"
                    className="link-button"
                    htmlType="submit"
                    loading={this.state.btnLoading}
                    style={{
                      color: '#e03b3b',
                      backgroundColor: '#f5f3ff',
                      borderRadius: '20px',
                      border: '0px',
                      marginRight: '10px',
                    }}>
                    Get Report
                  </Button>

                  <Button
                    key="link_btn1"
                    className="link-button"
                    style={{
                      color: 'white',
                      backgroundColor: 'rgb(224, 59, 59)',
                      borderRadius: '20px',
                      border: '0px',
                    }}
                    onClick={this.showLocationModal}>
                    Cancel
                  </Button>
                </div>
              </Form.Item>
            </Form>
          </div>
        </Modal>
      </>
    );
  }
}
export default LocationReport;
