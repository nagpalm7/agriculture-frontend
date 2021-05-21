import React, { Component } from 'react';
import { Row, Col, Spin, message, Select, Button, Divider } from 'antd';
import './Home.css';
import Map from './Map';
import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';
import { Tooltip } from 'antd';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';

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
      centerLat: 0,
      centerLong: 0,
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
      dists.data.push({ id: -1, district: 'ALL DISTRICTS' });
      this.setState({
        locations: locs.data,
        renderLocations: toRender,
        districts: dists.data,
        selectedDist: 'ALL DISTRICTS',
        loading: false,
        centerLat: centerLat,
        centerLong: centerLong,
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
        selectedDist: e,
        loading: false,
        renderLocations: toRender,
        times: 1,
        centerLat: centerLat,
        centerLong: centerLong,
      });
    } else {
      url = `https://api.aflmonitoring.com/api/upload/locations/map/?district=${e}`;
      let locs = await axiosInstance.get(url);
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
        selectedDist: e,
        loading: false,
        renderLocations: null,
        centerLat: centerLat,
        centerLong: centerLong,
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
    return this.props.lang ? (
      <IntlProvider
        locale={this.props.lang}
        messages={Languages[this.props.lang]}>
        <div className="home-wrapper">
          <Row style={{ marginBottom: '10px' }}>
            <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>
              {' '}
              <FormattedMessage id="map" defaultMessage="Map_d" />
            </h2>

            <DropdownMenu
              districts={this.state.districts}
              lang={this.props.lang}
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
                let text;
                if (this.props.lang == 'hi') {
                  text = 'नया स्थान जोड़े जाने तक पृष्ठ अनुत्तरदायी हो सकता है';
                } else {
                  text =
                    'Page might go unresponsive until new location are added';
                }
                message.warn(text);
                setTimeout(() => {
                  var n = this.state.locations.length;
                  var newLocs;
                  var times = this.state.times;
                  if (times == 1) {
                    newLocs = this.state.locations.slice(n / 4 + 1, n / 2);
                  }
                  if (times == 2) {
                    newLocs = this.state.locations.slice(
                      n / 2 + 1,
                      (3 * n) / 4,
                    );
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
                }, 100);
              }}>
              <FormattedMessage
                id="location_add"
                defaultMessage="some default one"
                values={this.props.localeLang}
              />
            </Button>

            <div className="count_displayer">
              <FormattedMessage
                id="currently_render"
                defaultMessage="Locations Currently Rendered"
              />{' '}
              -{' '}
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
                    centerLong={this.state.centerLong}
                    centerLat={this.state.centerLat}
                    locations={
                      this.state.selectedDist.toString() == 'ALL DISTRICTS'
                        ? this.state.renderLocations
                        : this.state.locations
                    }
                  />
                </Col>

                <Col lg={6} sm={24} xs={24}>
                  <Charts
                    lang={this.props.lang}
                    selectedDist={this.state.selectedDist}
                  />
                </Col>
              </>
            ) : (
              <Spin />
            )}
          </Row>
        </div>
      </IntlProvider>
    ) : (
      ''
    );
  }
}

export default Home;
