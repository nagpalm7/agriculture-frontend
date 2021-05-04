import React, { Component } from 'react';
import { Row, Col, Spin, message, Avatar, Select, Button, Divider } from 'antd';
import Map from './Map';
import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';
import { Tooltip, Popover } from 'antd';
import './Home.css';
class DDA_Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      renderLocations: null,
      districts: null,
      selectedDist: 'ALL DISTRICTS',
      loading: true,
      times: 1,
      ddaInfo: null,
    };
  }
  fetchData = async () => {
    try {
      let locs = await axiosInstance.get(
        `https://api.aflmonitoring.com/api/upload/locations/map/?district=${this.state.ddaInfo.district.district}`,
      );
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
    let ddaInfo = null;
    if (this.props.loginData) {
      ddaInfo = this.props.loginData;
    }
    if (sessionStorage.getItem('loginData')) {
      ddaInfo = sessionStorage.getItem('loginData');
    }
    if (localStorage.getItem('loginData')) {
      ddaInfo = localStorage.getItem('loginData');
    }
    ddaInfo = JSON.parse(ddaInfo);
    console.log(ddaInfo);
    this.setState({ ...this.state, ddaInfo: ddaInfo }, () => {
      this.fetchData();
    });
  }
  render() {
    const popoverContent = this.state.ddaInfo ? (
      <div className="pop_dda_disp">
        <div>Name : {this.state.ddaInfo.user.name}</div>
        <div>Email : {this.state.ddaInfo.user.email}</div>
        <div>Phone No : {this.state.ddaInfo.user.phone_number}</div>
        <div>District : {this.state.ddaInfo.district.district}</div>
        <div>State : {this.state.ddaInfo.user.state.state}</div>
      </div>
    ) : (
      ''
    );
    return (
      <div className="home-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>Map</h2>
          {this.state.ddaInfo ? (
            <Popover placement="bottom" content={popoverContent}>
              <div className="dda_info_disp">
                <Avatar src={this.state.ddaInfo.user.image} />
                <span>{this.state.ddaInfo.user.username}</span>
              </div>
            </Popover>
          ) : (
            ''
          )}

          {/* <DropdownMenu
        districts={this.state.districts}
        handleDistrictChange={this.handleDistrictChange}
        style={{
          borderRadius: '20px',
        }}
      /> */}
        </Row>

        <Row justify="center" className="map_wrapper">
          {!this.state.loading ? (
            <>
              <Col lg={18} sm={24} xs={24}>
                <Map locations={this.state.locations} />
              </Col>

              <Col lg={6} sm={24} xs={24}>
                <Charts selectedDist={this.state.ddaInfo.district.district} />
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

export default DDA_Home;
