import React, { Component } from 'react';
import { Row, Col, Spin, message, Select } from 'antd';
import './Home.css';
import Map from './Map';
import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      districts: null,
      selectedDist: null,
      loading: true,
    };
  }
  fetchData = async () => {
    try {
      //let locs = { data: locations };
      let locs = await axiosInstance.get(
        'https://api.aflmonitoring.com/api/upload/locations/map/',
      );

      //let dists = { data: districts };
      let dists = await axiosInstance.get(
        'https://api.aflmonitoring.com/api/district/',
      );
      dists.data.push({ id: -1, district: 'ALL DISTRICTS' });
      this.setState({
        locations: locs.data,
        districts: dists.data,
        selectedDist: 'ALL DISTRICTS',
        loading: false,
      });
    } catch (e) {
      this.setState({
        ...this.state,
        loading: false,
      });

      //error handling

      console.log(e);
    }
  };

  handleDistrictChange = async (e) => {
    console.log(e);
    let url = 'https://api.aflmonitoring.com/api/upload/locations/map/';

    this.setState({
      ...this.state,
      selectedDist: e,
      loading: true,
    });

    if (e == 'ALL DISTRICTS') {
      url = 'https://api.aflmonitoring.com/api/upload/locations/map/';
    } else {
      url = `https://api.aflmonitoring.com/api/upload/locations/map/?district=${e}`;
    }

    let locs = await axiosInstance.get(url);
    console.log(locs);
    this.setState({
      ...this.state,
      locations: locs.data,
      selectedDist: e,
      loading: false,
    });

    message.info(`Showing data of district ${e}`);
  };
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (
      <div className="home-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>Map</h2>
          <DropdownMenu
            districts={this.state.districts}
            handleDistrictChange={this.handleDistrictChange}
          />
        </Row>
        <Row justify="center">
          {!this.state.loading ? (
            <>
              <Col lg={18} sm={24}>
                {/* <Map locations={this.state.locations} /> */}
              </Col>
              <Col lg={6} sm={24}>
                <Charts selectedDist={this.state.selectedDist} />
              </Col>
            </>
          ) : (
            <Spin size="large" />
          )}
        </Row>
      </div>
    );
  }
}

export default Home;
