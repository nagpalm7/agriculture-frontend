import React, { Component } from 'react';
import { Row, Col, Spin, message, Avatar, Select, Button, Divider } from 'antd';
import Map from './Map';
import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';
import { Tooltip, Popover } from 'antd';
import './Home.css';

class ADO_Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      renderLocations: null,
      districts: null,
      selectedDist: 'ALL DISTRICTS',
      loading: true,
      times: 1,
      adoInfo: null,
      pendingCount: 0,
      ongoingCount: 0,
      completedCount: 0,
    };
  }
  fetchDataChartData = async () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    try {
      let pending_locs = await axiosInstance.get(`/api/admin/ado/26/pending`);
      //   let ongoing_locs = await axiosInstance.get(`/api/admin/ado/26/ongoing`);
      let completed_locs = await axiosInstance.get(
        `/api/admin/ado/26/completed`,
      );

      this.setState({
        ...this.state,
        pendingCount: pending_locs.data.count,
        ongoingCount: 0,
        completedCount: completed_locs.data.count,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        loading: false,
      });
      console.log(e);
    }
  };
  fetchData = async () => {
    try {
      let locs = await axiosInstance.get(`/api/upload/locations/map`);
      this.setState({
        ...this.state,
        locations: locs.data,
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        loading: false,
      });
      console.log(e);
    }
  };
  componentDidMount() {
    let adoInfo = null;
    if (this.props.loginData) {
      adoInfo = this.props.loginData;
    }
    if (sessionStorage.getItem('loginData')) {
      adoInfo = sessionStorage.getItem('loginData');
    }
    if (localStorage.getItem('loginData')) {
      adoInfo = localStorage.getItem('loginData');
    }
    adoInfo = JSON.parse(adoInfo);
    console.log(adoInfo);
    this.setState({ ...this.state, adoInfo: adoInfo }, () => {
      this.fetchData();
      this.fetchDataChartData();
    });
    document.title = 'AFL-Home';
  }
  render() {
    console.log(this.state);
    const popoverContent = this.state.adoInfo ? (
      <div className="pop_ado_disp">
        <div>Name : {this.state.adoInfo.user.name}</div>
        <div>Email : {this.state.adoInfo.user.email}</div>
        <div>Phone No : {this.state.adoInfo.user.phone_number}</div>
        <div>Under DDA : {this.state.adoInfo.dda.username}</div>
        <div>District : {this.state.adoInfo.district.district}</div>
        <div>State : {this.state.adoInfo.user.state.state}</div>
      </div>
    ) : (
      ''
    );
    return (
      <div className="home-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>Map</h2>
          {this.state.adoInfo ? (
            <Popover
              placement="bottom"
              content={popoverContent}
              id="dda_disp_pop">
              <div className="dda_info_disp">
                <Avatar src={this.state.adoInfo.user.image} />
                <span>{this.state.adoInfo.user.username}</span>
              </div>
            </Popover>
          ) : (
            ''
          )}
        </Row>
        <Row justify="center" className="map_wrapper">
          {!this.state.loading ? (
            <>
              <Col lg={18} sm={24} xs={24}>
                <Map locations={this.state.locations} />
              </Col>

              <Col lg={6} sm={24} xs={24}>
                <div className="charts-wrapper">
                  <div>
                    <div className="pending">
                      <div className="header">Pending</div>
                      <div className="count">{this.state.pendingCount}</div>
                    </div>
                  </div>
                  <div className="completed">
                    <div className="header">Completed</div>
                    <div className="count">{this.state.completedCount}</div>
                  </div>
                </div>
              </Col>
            </>
          ) : (
            <Spin />
          )}
        </Row>
      </div>
    );
  }
}

export default ADO_Home;
