import React, { Component } from 'react';
import { Row, Col, Spin, message } from 'antd';
import './Home.css';
import Map from './Map';
import Charts from './Charts';
import DropdownMenu from './Dropdown';
import { axiosInstance } from '../../utils/axiosIntercepter';

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
    let url = 'https://api.aflmonitoring.com/api/upload/locations/map/';
    let selectedDist = this.state.districts.filter(
      (dist) => dist.id == parseInt(e.key),
    )[0].district;

    this.setState({
      ...this.state,
      selectedDist: selectedDist,
      loading: true,
    });

    if (selectedDist == 'ALL DISTRICTS') {
      url = 'https://api.aflmonitoring.com/api/upload/locations/map/';
    } else {
      url = `https://api.aflmonitoring.com/api/upload/locations/map/?district=${selectedDist}`;
    }

    let locs = await axiosInstance.get(url);

    this.setState({
      ...this.state,
      locations: locs.data,
      selectedDist: selectedDist,
      loading: false,
    });

    message.info(`Showing data of district ${selectedDist}`);
  };

  componentDidMount() {
    this.fetchData();
  }
  render() {
    console.log(this.state);
    return (
      <>
        <Row>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>Map</h2>
          {/* <DropdownMenu
            districts={this.state.districts}
            handleDistrictChange={this.handleDistrictChange}
            selectedDist={this.state.selectedDist}
          /> */}
        </Row>
        <Row justify="center">
          {!this.state.loading ? (
            <>
              <Col lg={18} sm={24}>
                <Map locations={this.state.locations} />
              </Col>
              <Col lg={6} sm={24}>
                <Charts />
              </Col>
            </>
          ) : (
            <Spin size="large" />
          )}
        </Row>
      </>
    );
  }
}

export default Home;
