import React, { useEffect, useState } from 'react';
import { Row, Col, Spin, message } from 'antd';
import axios from 'axios';

import "./Home.css";
import Map from "./Map";
import Charts from "./Charts";
import DropdownMenu from "./Dropdown";

const locations = [
  {
    id: 1,
    latitude: 30.994680,
    longitude: 75.467600,
    village_name: "MACHHONDI"
  },
  {
    id: 2,
    latitude: 31.738790,
    longitude: 75.933880,
    village_name: "SIWAN"
  },
  {
    id: 3,
    latitude: 30.921820,
    longitude: 75.421810,
    village_name: "LANDER PEERZADA"
  },
  {
    id: 4,
    latitude: 32.950730,
    longitude: 75.421390,
    village_name: "MACHHONDI"
  },
  {
    id: 5,
    latitude: 30.870490,
    longitude: 75.412350,
    village_name: "KHERI RAIWALI"
  },
  {
    id: 6,
    latitude: 30.879710,
    longitude: 75.455740,
    village_name: "JHARAULI KHURD"
  },
  {
    id: 7,
    latitude: 30.994680,
    longitude: 75.467600,
    village_name: "AJRANA KALAN"
  },
  {
    id: 8,
    latitude: 30.738790,
    longitude: 75.933880,
    village_name: "AJRANA KALAN"
  },
  {
    id: 9,
    latitude: 30.921820,
    longitude: 75.421810,
    village_name: "KIRMACH"
  },
  {
    id: 10,
    latitude: 30.950730,
    longitude: 75.421390,
    village_name: "AJRANA KALAN"
  },
  {
    id: 11,
    latitude: 30.870490,
    longitude: 75.412350,
    village_name: "SALEMPUR"
  },
  {
    id: 12,
    latitude: 30.879710,
    longitude: 75.455740,
    village_name: "SALEMPUR"
  }
];

const districts = [
  {
    "id": 22,
    "district": "CHARKHI DADRI",
    "district_code": "90",
    "state": {
      "id": 1,
      "state": "HARYANA",
      "state_code": "3"
    }
  }
];

const pending_count = [
  {
    "start": "2019-02-01",
    "end": "2019-05-16",
    "data": 1000
  },
  {
    "start": "2019-05-17",
    "end": "2019-08-29",
    "data": 1200
  },
  {
    "start": "2019-08-30",
    "end": "2019-12-12",
    "data": 1599
  }
];

const ongoing_count = [
  {
    "start": "2019-02-01",
    "end": "2019-05-16",
    "data": 0
  },
  {
    "start": "2019-05-17",
    "end": "2019-08-29",
    "data": 0
  },
  {
    "start": "2019-08-30",
    "end": "2019-12-12",
    "data": 0
  }
];

const completed_count = [
  {
    "start": "2019-02-01",
    "end": "2019-05-16",
    "data": 0
  },
  {
    "start": "2019-05-17",
    "end": "2019-08-29",
    "data": 0
  },
  {
    "start": "2019-08-30",
    "end": "2019-12-12",
    "data": 0
  }
];

const Home = (props) => {
  let [state, setState] = useState({
    locations: locations || [],
    districts: districts || [],
    selectedDist: "ALL DISTRICTS",
    pending_count: pending_count || [],
    ongoing_count: ongoing_count || [],
    completed_count: completed_count || [],
    loading: true //set it to true 
  });

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        //let locs = { data: locations };
        let locs = await axios
          .get('https://api.aflmonitoring.com/api/upload/locations/map/', {
            headers: {
              "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
              "Content-Type": "application/json"
            }
          });

        //let dists = { data: districts };
        let dists = await axios
          .get('https://api.aflmonitoring.com/api/district/', {
            headers: {
              "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
              "Content-Type": "application/json"
            }
          });
        dists.data.push({ id: -1, district: "ALL DISTRICTS" });

        //let count = { data: { pending_count: pending_count, ongoing_count: ongoing_count, completed_count: completed_count } };
        let count = await axios
          .get('https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=2019-02-01&end_date=2019-12-12&points=5', {
            headers: {
              "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
              "Content-Type": "application/json"
            }
          });

        setState({
          locations: locs.data,
          districts: dists.data,
          selectedDist: "ALL DISTRICTS",
          pending_count: count.data.pending_count,
          ongoing_count: count.data.ongoing_count,
          completed_count: count.data.completed_count,
          loading: false
        });
      } catch (e) {
        setState({
          ...state,
          loading: false
        });

        //error handling

        console.log(e);
      }
    }
    fetchData();

    return () => {
      mounted = false;
    }
  }, []);

  const handleDistrictChange = async (e) => {
    console.log(e);
    
    let url = "https://api.aflmonitoring.com/api/upload/locations/map/";
    let selectedDist = state.districts.filter((dist) => dist.id == parseInt(e.key))[0].district;

    setState({
      ...state,
      selectedDist: selectedDist,
      loading: true
    });

    if (selectedDist == "ALL DISTRICTS") {
      url = "https://api.aflmonitoring.com/api/upload/locations/map/";
    } else {
      url = `https://api.aflmonitoring.com/api/upload/locations/map/?district=${selectedDist}`;
    }

    let locs = await axios
      .get(url, {
        headers: {
          "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
          "Content-Type": "application/json"
        }
      });

    setState({
      ...state,
      locations: locs.data,
      selectedDist: selectedDist,
      loading: false
    });

    message.info(`Showing data of district ${selectedDist}`);
  }

  return (
    <React.Fragment>
      <Row>
        <h2 style={{ fontWeight: "bold", flex: 1, fontSize: 26 }}>Map</h2>
        <DropdownMenu districts={state.districts} handleDistrictChange={handleDistrictChange} selectedDist={state.selectedDist} />
      </Row>
      <Row justify="center" >
        {
          state.loading
            ? <Spin size="large" />
            : <>
              <Col xl={20} lg={18} md={24} >
                <Map locations={state.locations} />
              </Col>
              <Col xl={4} lg={6} >
                <Charts
                  pending_count={state.pending_count}
                  ongoing_count={state.ongoing_count}
                  completed_count={state.completed_count}
                />
              </Col>
            </>
        }
      </Row>
    </React.Fragment>
  );
};

export default Home;