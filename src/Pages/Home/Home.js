import React, { Component } from 'react';
import { Row, Col, Spin, message, Select, Button, Divider } from 'antd';
import './Home.css';
import Map from './Map';
import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';
import { Tooltip } from 'antd';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      renderLocations: null,
      districts: null,
      selectedDist: 'ALL DISTRICTS',
      loading: true,
      times: 1,
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
      var toRender = locs.data.slice(0, locs.data.length / 4);
      console.log(locs.data, locs.data.length);
      dists.data.push({ id: -1, district: 'ALL DISTRICTS' });
      this.setState({
        locations: locs.data,
        renderLocations: toRender,
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
      let locs = await axiosInstance.get(url);
      var toRender = locs.data.slice(0, locs.data.length / 4);
      this.setState({
        ...this.state,
        locations: locs.data,
        selectedDist: e,
        loading: false,
        renderLocations: toRender,
        times: 1,
      });
    } else {
      url = `https://api.aflmonitoring.com/api/upload/locations/map/?district=${e}`;
      let locs = await axiosInstance.get(url);
      this.setState({
        ...this.state,
        locations: locs.data,
        selectedDist: e,
        loading: false,
        renderLocations: null,
      });
    }
    message.info(`Showing data of district ${e}`);
  };
  componentDidMount() {
    this.fetchData();
    document.title = 'ALF - Home';
  }
  render() {
    console.log(this.state);
    return (
      <div className="home-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>Map</h2>
          <DropdownMenu
            districts={this.state.districts}
            handleDistrictChange={this.handleDistrictChange}
            style={{
              borderRadius: '20px',
            }}
          />
        </Row>

        <Row
          className={
            this.state.selectedDist == 'ALL DISTRICTS'
              ? 'add_more_locs'
              : 'add_more_locs no_disp'
          }>
          <Tooltip
            title={`Add locations.Page might go unresponsive until new locations are rendered.`}>
            <Button
              disabled={!(this.state.times < 4)}
              style={{
                backgroundColor: 'rgb(245, 243, 255)',
                color: 'rgb(224, 59, 59)',
                marginBottom: '5px',
                borderRadius: '10px',
                border: '0px',
                fontWeight: '600',
                borderColor: 'rgb(224, 59, 59)',
              }}
              onClick={() => {
                var n = this.state.locations.length;
                var newLocs;
                var times = this.state.times;
                if (times == 1) {
                  newLocs = this.state.locations.slice(n / 4 + 1, n / 2);
                }
                if (times == 2) {
                  newLocs = this.state.locations.slice(n / 2 + 1, (3 * n) / 4);
                }
                if (times == 3) {
                  newLocs = this.state.locations.slice((3 * n) / 4, n);
                }
                var upLocs = [...this.state.renderLocations, ...newLocs];
                this.setState({
                  ...this.state,
                  renderLocations: upLocs,
                  times: this.state.times + 1,
                });
              }}>
              Add More Locations
            </Button>
          </Tooltip>

          <div className="count_displayer">
            * Locations currently rendered -{' '}
            {this.state.renderLocations
              ? this.state.renderLocations.length
              : '0'}
          </div>
        </Row>
        <Row justify="center" className="map_wrapper">
          {!this.state.loading ? (
            <>
              <Col lg={18} sm={24} xs={24}>
                <Map
                  locations={
                    this.state.selectedDist.toString() == 'ALL DISTRICTS'
                      ? this.state.renderLocations
                      : this.state.locations
                  }
                />
              </Col>

              <Col lg={6} sm={24} xs={24}>
                <Charts selectedDist={this.state.selectedDist} />
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

export default Home;
