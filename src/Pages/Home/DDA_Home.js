import React, { Component } from 'react';
import { Row, Col, Spin, message, Avatar, Select, Button, Divider } from 'antd';
import Map from './Map';
import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';
import { Tooltip, Popover } from 'antd';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';
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
      centerLat: 0,
      centerLong: 0,
    };
  }
  fetchData = async () => {
    try {
      let locs = await axiosInstance.get(
        `https://api.aflmonitoring.com/api/upload/locations/map/?district=${this.state.ddaInfo.district.district}`,
      );
      let centerLat = 0,
        centerLong = 0;
      if (locs.data.length > 0) {
        locs.data.map((loc) => {
          centerLat += parseFloat(loc.latitude);
          centerLong += parseFloat(loc.longitude);
        });
      }
      if (locs.data.length == 0) {
        centerLat = 30.9002697;
        centerLong = 75.7165881;
      } else {
        centerLat /= parseFloat(locs.data.length);
        centerLong /= parseFloat(locs.data.length);
      }
      this.setState({
        ...this.state,
        locations: locs.data,
        loading: false,
        centerLat: centerLat,
        centerLong: centerLong,
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
    console.log(this.state.ddaInfo);
   
    return (
      <div className="home-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>Map</h2>
          
        </Row>

        <Row justify="center" className="map_wrapper">
          {!this.state.loading ? (
            <>
              <Col lg={18} sm={24} xs={24}>
                <Map
                  locations={this.state.locations}
                  centerLong={this.state.centerLong}
                  centerLat={this.state.centerLat}
                />
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
