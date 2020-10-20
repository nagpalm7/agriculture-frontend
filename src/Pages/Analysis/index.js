import React, { useEffect, useState } from 'react';
import { Spin } from 'antd';
import axios from 'axios';
// import { Table } from "antd";

import Chart from './Chart';
import Table from './Table';

const Analysis = (props) => {
  let [state, setState] = useState({
    loading: true,
    data: {},
  });

  const refactorDistrictData = (rec) => {
    const data = [];

    Object.keys(rec).forEach((val, index) => {
      data.push({
        name: val,
        pending: rec[val].pending,
        ongoing: rec[val].ongoing,
        completed: rec[val].completed,
      });
    });

    return data;
  };

  useEffect(() => {
    let mounted = true;
    const fetchData = async () => {
      try {
        let res = await axios.get(
          'https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=2019-02-01&end_date=2019-12-12&points=5',
          {
            headers: {
              Authorization:
                'token ' +
                (localStorage.getItem('Token') ||
                  sessionStorage.getItem('Token')),
              'Content-Type': 'application/json',
            },
          },
        );

        setState({
          data: res.data,
          loading: false,
        });
      } catch (e) {
        setState({
          ...state,
          loading: false,
        });

        //error handling

        console.log(e);
      }
    };

    fetchData();

    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flex: 1,
        flexDirection: 'column',
        height: '100%',
        justifyContent: 'center',
      }}>
      {state.loading ? (
        <Spin size="large" />
      ) : (
        <>
          <div
            style={{
              flex: 40,
              backgroundColor: 'white',
              marginBottom: 15,
              borderRadius: 25,
            }}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                margin: 15,
                paddingLeft: 20,
                paddingRight: 30,
              }}>
              <div style={{ fontWeight: 'bolder', fontSize: 24, flex: 1 }}>
                Analysis
              </div>
              <div>Analysis</div>
            </div>
            <div style={{ height: '200px' }}>
              {/* <Chart data={state.data} /> */}
            </div>
          </div>
          <div style={{ flex: 60, marginTop: 15, borderRadius: 25 }}>
            {/* <Table
								data={refactorDistrictData(state.data.results)}
							/> */}
          </div>
        </>
      )}
    </div>
  );
};

export default Analysis;
