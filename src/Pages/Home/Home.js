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
    pending_count: pending_count || [],
    ongoing_count: ongoing_count || [],
    completed_count: completed_count || [],
    loading: false //set it to true 
  });

  // useEffect(() => {
  //   let mounted = true;
  //   const fetchData = async () => {
  //     try {
  //       let locs = { data: locations };
  //       // let locs = await axios
  //       //   .get('https://api.aflmonitoring.com/api/upload/locations/map/', {
  //       //     headers: {
  //       //       "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
  //       //       "Content-Type": "application/json"
  //       //     }
  //       //   });

  //       let dists = { data: districts };
  //       // let dists = await axios
  //       //   .get('https://api.aflmonitoring.com/api/district/', {
  //       //     headers: {
  //       //       "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
  //       //       "Content-Type": "application/json"
  //       //     }
  //       //   });

  //       let count = { data: { pending_count: pending_count, ongoing_count: ongoing_count, completed_count: completed_count } };
  //       // let count = await axios
  //       //   .get('https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=2019-02-01&end_date=2019-12-12&points=3', {
  //       //     headers: {
  //       //       "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
  //       //       "Content-Type": "application/json"
  //       //     }
  //       //   });

  //       setState({
  //         locations: locs.data,
  //         districts: dists.data,
  //         pending_count: count.data.pending_count,
  //         ongoing_count: count.data.ongoing_count,
  //         completed_count: count.data.completed_count,
  //         loading: false
  //       });
  //     } catch (e) {
  //       setState({
  //         ...state,
  //         loading: false
  //       });

  //       //error handling

  //       console.log(e);
  //     }
  //   }
  //   fetchData();

  //   return () => {
  //     mounted = false;
  //   }
  // }, []);

  const handleDistrictChange = async (e) => {
    setState({
      ...state,
      loading: true
    });

    let locs = await axios
      .get(`https://api.aflmonitoring.com/api/upload/locations/map/?district=${state.districts[22 - parseInt(e.key)].district}`, {
        headers: {
          "Authorization": "token " + (localStorage.getItem("Token") || sessionStorage.getItem("Token")),
          "Content-Type": "application/json"
        }
      });

    setState({
      ...state,
      locations: locs.data,
      loading: false
    });

    message.info(`Showing data of district ${state.districts[22 - parseInt(e.key)].district}`);
  }

  if (state.loading) {
    return (
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, right: 0, backgroundColor: "#aaa", opacity: 0.7, flex: 1 }}>
        <Spin style={{ position: "absolute", top: 300, bottom: 0, left: 0, right: 0, flex: 1, height: 500 }} size="large"/>
      </div>
    );
  }

  return (
    <React.Fragment>
      <Row>
        <h2 style={{ fontWeight: "bold", flex: 1, fontSize: 26 }}>Map</h2>
        <DropdownMenu districts={state.districts} handleDistrictChange={handleDistrictChange} />
      </Row>
      <Row justify="center" >
        <Col xl={20} xs={24} >
          <Map locations={state.locations} />
        </Col>
        <Col xl={4} xs={4} style={{ minWidth: 200 }} >
          <Charts
            pending_count={state.pending_count}
            ongoing_count={state.ongoing_count}
            completed_count={state.completed_count}
          />
        </Col>
      </Row>
    </React.Fragment>
  );
};

export default Home;