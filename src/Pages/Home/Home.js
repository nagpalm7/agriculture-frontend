import React,{ReactDOM, Component } from 'react';
import { Row, Col, Spin, message, Select, Button, Divider } from 'antd';
import './Home.css';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import Map from './Map';

import Charts from './Charts';
import { axiosInstance } from '../../utils/axiosIntercepter';
import DropdownMenu from './Dropdown';
import { Tooltip } from 'antd';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';

mapboxgl.accessToken =
  'pk.eyJ1IjoieXV2cmFqMW1hbm4iLCJhIjoiY2twaTB4MGZnMGlrYzJ2bzhzbDl6eHozNSJ9.TYOI0lrKgV6zmZRsBG1_qQ';
let map; 
class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      districts: null,
      selectedDist: 'ALL DISTRICTS',
      loading: true,
      times: 1,
      centerLat: 30.9002697,
      centerLong: 75.7165881,
      zoom: 6,
      features:null,
    };
    this.mapContainer = React.createRef();
  }
  updateMapBox=(features,lng,lat)=>{
    map.removeLayer('clusters');
    map.removeLayer('cluster-count');
    map.removeLayer('unclustered-point');
    map.removeSource('earthquakes');

    let geoData = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
        },
      },
      features: features,
    };
    map.addSource('earthquakes',{
      type: 'geojson',
      data: geoData,
      cluster: true,
      clusterMaxZoom: 14,
      clusterRadius: 50,
    })
    console.log(map.getSource('earthquakes'));
    map.addLayer({
      id: 'clusters',
      type: 'circle',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      paint: {
        // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
        // with three steps to implement three types of circles:
        //   * Blue, 20px circles when point count is less than 100
        //   * Yellow, 30px circles when point count is between 100 and 750
        //   * Pink, 40px circles when point count is greater than or equal to 750
        'circle-color': [
          'step',
          ['get', 'point_count'],
          '#51bbd6',
          100,
          '#f1f075',
          750,
          '#f28cb1',
        ],
        'circle-radius': [
          'step',
          ['get', 'point_count'],
          20,
          100,
          30,
          750,
          40,
        ],
      },
    });

    map.addLayer({
      id: 'cluster-count',
      type: 'symbol',
      source: 'earthquakes',
      filter: ['has', 'point_count'],
      layout: {
        'text-field': '{point_count_abbreviated}',
        'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
        'text-size': 12,
      },
    });

    map.addLayer({
      id: 'unclustered-point',
      type: 'circle',
      source: 'earthquakes',
      filter: ['!', ['has', 'point_count']],
      paint: {
        'circle-color': '#11b4da',
        'circle-radius': 4,
        'circle-stroke-width': 1,
        'circle-stroke-color': '#fff',
      },
    });
  }
  setMapBoxMount = () => {
    let geoData = {
      type: 'FeatureCollection',
      crs: {
        type: 'name',
        properties: {
          name: 'urn:ogc:def:crs:OGC:1.3:CRS84',
        },
      },
      features: this.state.features,
    };
    let node = this.mapContainer.current;

    map = new mapboxgl.Map({
      container: node,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [this.state.centerLong, this.state.centerLat],
      zoom: this.state.zoom,
    });

    map.on('load', function () {
      map.addSource('earthquakes', {
        type: 'geojson',
        data: geoData,
        cluster: true,
        clusterMaxZoom: 14,
        clusterRadius: 50,
      });

      map.addLayer({
        id: 'clusters',
        type: 'circle',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        paint: {
          // Use step expressions (https://docs.mapbox.com/mapbox-gl-js/style-spec/#expressions-step)
          // with three steps to implement three types of circles:
          //   * Blue, 20px circles when point count is less than 100
          //   * Yellow, 30px circles when point count is between 100 and 750
          //   * Pink, 40px circles when point count is greater than or equal to 750
          'circle-color': [
            'step',
            ['get', 'point_count'],
            '#51bbd6',
            100,
            '#f1f075',
            750,
            '#f28cb1',
          ],
          'circle-radius': [
            'step',
            ['get', 'point_count'],
            20,
            100,
            30,
            750,
            40,
          ],
        },
      });

      map.addLayer({
        id: 'cluster-count',
        type: 'symbol',
        source: 'earthquakes',
        filter: ['has', 'point_count'],
        layout: {
          'text-field': '{point_count_abbreviated}',
          'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
          'text-size': 12,
        },
      });

      map.addLayer({
        id: 'unclustered-point',
        type: 'circle',
        source: 'earthquakes',
        filter: ['!', ['has', 'point_count']],
        paint: {
          'circle-color': '#11b4da',
          'circle-radius': 4,
          'circle-stroke-width': 1,
          'circle-stroke-color': '#fff',
        },
      });

      // inspect a cluster on click
      map.on('click', 'clusters', function (e) {
        var features = map.queryRenderedFeatures(e.point, {
          layers: ['clusters'],
        });
        var clusterId = features[0].properties.cluster_id;
        map
          .getSource('earthquakes')
          .getClusterExpansionZoom(clusterId, function (err, zoom) {
            if (err) return;

            map.easeTo({
              center: features[0].geometry.coordinates,
              zoom: zoom,
            });
          });
      });
      map.addControl(new mapboxgl.FullscreenControl());
      map.on('click', 'unclustered-point', function (e) {
        var coordinates = e.features[0].geometry.coordinates.slice();
        var mag = e.features[0].properties.mag;
        var village_name = e.features[0].properties.village_name;

        while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
        }

        new mapboxgl.Popup()
          .setLngLat(coordinates)
          .setHTML('<br>' + village_name)
          .addTo(map);
      });

      map.on('mouseenter', 'clusters', function () {
        map.getCanvas().style.cursor = 'pointer';
      });
      map.on('mouseleave', 'clusters', function () {
        map.getCanvas().style.cursor = '';
      });
    });

    this.setState({
      ...this.state,
      locations: geoData,
    });
  };
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

      let centerLat = 0,
        centerLong = 0;

      dists.data.push({ id: -1, district: 'ALL DISTRICTS' });
      let features = locs.data.map((location, idx) => {
        centerLat += parseFloat(location.latitude);
        centerLong += parseFloat(location.longitude);
        return {
          type: 'Feature',
          properties: {
            id: location.id,
            village_name: location.village_name,
          },
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        };
      });
      if (locs.data.length == 0) {
        centerLat = 30.9002697;
        centerLong = 75.7165881;
      } else {
        centerLat /= parseFloat(locs.data.length);
        centerLong /= parseFloat(locs.data.length);
      }
      this.setState({
        locations: features,
        features:features,
        districts: dists.data,
        selectedDist: 'ALL DISTRICTS',
        loading: false,
        centerLat: centerLat,
        centerLong: centerLong,
      },()=>{
        this.setMapBoxMount();
      });
    } catch (e) {
      this.setState({
        ...this.state,
        loading: false,
      });
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
      let centerLat = 0,
        centerLong = 0;

      let features = locs.data.map((location, idx) => {
        centerLat += parseFloat(location.latitude);
        centerLong += parseFloat(location.longitude);
        return {
          type: 'Feature',
          properties: {
            id: location.id,
            village_name: location.village_name,
          },
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        };
      });
      if (locs.data.length == 0) {
        centerLat = 30.9002697;
        centerLong = 75.7165881;
      } else {
        centerLat /= parseFloat(locs.data.length);
        centerLong /= parseFloat(locs.data.length);
      }
      this.setState({
        ...this.state,
        locations: features,
        features:features,
        selectedDist: e,
        loading: false,
        times: 1,
        centerLat: centerLat,
        centerLong: centerLong,
      },()=>{
        this.updateMapBox(features,centerLat,centerLong);
      });
    } else {
      url = `https://api.aflmonitoring.com/api/upload/locations/map/?district=${e}`;
      let locs = await axiosInstance.get(url);
      let centerLat = 0,
        centerLong = 0;

      let features = locs.data.map((location, idx) => {
        centerLat += parseFloat(location.latitude);
        centerLong += parseFloat(location.longitude);
        return {
          type: 'Feature',
          properties: {
            id: location.id,
            village_name: location.village_name,
          },
          geometry: {
            type: 'Point',
            coordinates: [location.longitude, location.latitude],
          },
        };
      });
      if (locs.data.length == 0) {
        centerLat = 30.9002697;
        centerLong = 75.7165881;
      } else {
        centerLat /= parseFloat(locs.data.length);
        centerLong /= parseFloat(locs.data.length);
      }
      this.updateMapBox(features,centerLat,centerLong);

      this.setState({
        ...this.state,
        locations: features,
        selectedDist: e,
        loading: false,
        centerLat: centerLat,
        centerLong: centerLong,
      });
    }
    message.info(`Showing data of district ${e}`);
  };
  componentDidMount() {
    this.fetchData();
    document.title = 'AFL - Home';
  }
  render() {
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
          <Spin spinning={this.state.loading}>
            <Row justify="center" className="map_wrapper">
              <Col lg={18} sm={24} xs={24}>
                <div ref={this.mapContainer} className="map-container" />
              </Col>
         
                <Col lg={6} sm={24} xs={24}>
                  {
                    (!this.state.loading)?(
                      <Charts
                      lang={this.props.lang}
                      selectedDist={this.state.selectedDist}
                    />
                    ):('')
                  }
                 
                </Col>
         
            </Row>
          </Spin>
        </div>
      </IntlProvider>
    ) : (
      ''
    );
  }
}

export default Home;
