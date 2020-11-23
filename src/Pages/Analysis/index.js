import React, { Component } from 'react';
import { Spin } from 'antd';
import { Line } from 'react-chartjs-2';
import { axiosInstance } from '../../utils/axiosIntercepter';
import './Analysis.css';
import { PageHeader, Button, Modal, DatePicker, Space } from 'antd';
import TableComponent from './Table';
import { withState } from 'recompose';
import { Redirect } from 'react-router';

const { RangePicker } = DatePicker;
class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      start_date: null,
      end_date: null,
      loading: false,
      active: null,
      visible: false,
      table_data: null,
      pending_chart_data: {
        labels: [],
        data: [],
      },
      ongoing_chart_data: {
        labels: [],
        data: [],
      },
      completed_chart_data: {
        labels: [],
        data: [],
      },
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  changeActive(status) {
    this.setState({
      ...this.state,
      active: status,
    });
  }

  fetchData = async (status) => {
    console.log(status);
    let startDate;
    let EndDate;
    if (status == 'allTime') {
      startDate = '2019-02-01';
      EndDate = '2019-12-12';
    } else if (status == 'thisMonth') {
      let d = new Date();
      startDate = `${d.getFullYear()}-${d.getMonth() - 1}-${d.getDate()}`;
      EndDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    } else if (status == 'thisYear') {
      let d = new Date();
      startDate = `${d.getFullYear() - 1}-${d.getMonth()}-${d.getDate()}`;
      EndDate = `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;
    } else if (status == 'custom') {
      console.log('inside', this.state);
      startDate = this.state.start_date;
      EndDate = this.state.end_date;
    }
    this.setState({
      ...this.state,
      loading: true,
      pending_chart_data: {
        labels: [],
        data: [],
      },
      ongoing_chart_data: {
        labels: [],
        data: [],
      },
      completed_chart_data: {
        labels: [],
        data: [],
      },
    });

    console.log(startDate, EndDate);
    try {
      let count = await axiosInstance.get(
        `https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=${startDate}&end_date=${EndDate}&points=5`,
      );

      this.setState({
        ...this.state,
        loading: false,
        visible: false,
        table_data: count.data.results,
      });
      count.data.pending_count.map((value) => {
        this.setState((prevState) => ({
          pending_chart_data: {
            labels: [
              ...prevState.pending_chart_data.labels,
              `${value.start} - ${value.end}`,
            ],
            data: [...prevState.pending_chart_data.data, value.data],
          },
        }));
      });
      count.data.ongoing_count.map((value) => {
        this.setState((prevState) => ({
          ongoing_chart_data: {
            labels: [
              ...prevState.ongoing_chart_data.labels,
              `${value.start} - ${value.end}`,
            ],
            data: [...prevState.ongoing_chart_data.data, value.data],
          },
        }));
      });
      count.data.completed_count.map((value) => {
        this.setState((prevState) => ({
          completed_chart_data: {
            labels: [
              ...prevState.completed_chart_data.labels,
              `${value.start} - ${value.end}`,
            ],
            data: [...prevState.completed_chart_data.data, value.data],
          },
        }));
      });
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        loading: false,
      });
      return;
    }
  };
  handleButtonClick(status) {
    this.fetchData(status);
  }
  componentDidMount() {
    this.fetchData('allTime');
  }
  borderColor(status) {
    if (status == 'pending') {
      return '#df6b67';
    } else if (status == 'ongoing') {
      return '#ffe00c';
    } else if (status == 'completed') {
      return '#069d15';
    }
  }
  handleOk = () => {
    this.setState({ loading: true });
    this.fetchData('custom');
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };
  render() {
    const chartData = {
      labels: !this.state.loading ? this.state.pending_chart_data.labels : null,
      datasets: [
        {
          label: 'Pending',
          data: !this.state.loading ? this.state.pending_chart_data.data : null,
          backgroundColor: ['#D68F8D'],
          borderColor: [this.borderColor('pending')],
        },
        {
          label: 'Completed',
          data: !this.state.loading
            ? this.state.completed_chart_data.data
            : null,
          backgroundColor: ['#81E67A'],
          borderColor: [this.borderColor('completed')],
          type: 'line',
        },
        {
          label: 'Ongoing',
          data: !this.state.loading ? this.state.ongoing_chart_data.data : null,
          backgroundColor: ['#ffdf0cb2'],
          borderColor: [this.borderColor('ongoing')],
          type: 'line',
        },
      ],
    };
    return (
      <>
        <div className="analysis-wrapper">
          <PageHeader
            className="analysis-page-header"
            ghost={false}
            title="Analysis"
            style={{ borderRadius: '20px' }}
            extra={[
              <Button
                onClick={() => {
                  this.handleButtonClick('allTime');
                }}>
                All Time
              </Button>,
              <Button
                onClick={() => {
                  this.handleButtonClick('thisMonth');
                }}>
                This Month
              </Button>,
              <Button
                onClick={() => {
                  this.handleButtonClick('thisYear');
                }}>
                This Year
              </Button>,
              <Button onClick={this.showModal}>Custom</Button>,
            ]}
          />
          <Modal
            visible={this.state.visible}
            title="Select Range"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <div>
                <Button
                  key="back"
                  type="primary"
                  onClick={this.handleCancel}
                  style={{
                    backgroundColor: '#f5f3ff',
                    borderRadius: '10px',
                    color: 'red',
                    borderColor: 'white',
                  }}>
                  Cancel
                </Button>
                <Button
                  key="submit"
                  style={{
                    backgroundColor: '#e03b3b',
                    borderRadius: '10px',
                    borderColor: 'red',
                  }}
                  type="primary"
                  loading={this.state.loading}
                  onClick={this.handleOk}>
                  Submit
                </Button>
                ,
              </div>,
            ]}>
            <div style={{ marginTop: '15px' }}>
              <RangePicker
                onChange={(moment) => {
                  const startDate = moment[0]._d;
                  const EndDate = moment[1]._d;
                  this.setState({
                    ...this.state,
                    start_date: `${startDate.getFullYear()}-${
                      startDate.getMonth() + 1
                    }-${startDate.getDate()}`,
                    end_date: `${EndDate.getFullYear()}-${
                      EndDate.getMonth() + 1
                    }-${EndDate.getDate()}`,
                  });
                }}
              />
            </div>
          </Modal>
          <Spin spinning={this.state.loading}>
            <div className="chart-container">
              <Line
                data={chartData}
                options={{
                  maintainAspectRatio: false,
                  pointRadius: 2,
                  pointHoverRadius: 3,
                  layout: {
                    padding: {
                      left: 10,
                      right: 20,
                      top: 0,
                      bottom: 0,
                    },
                  },
                  scales: {
                    xAxes: [
                      {
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                    yAxes: [
                      {
                        stacked: true,
                        gridLines: {
                          display: false,
                        },
                      },
                    ],
                  },
                }}
              />
            </div>
          </Spin>
        </div>
        <div className="table-wrapper">
          <TableComponent
            data={this.state.table_data}
            loading={this.state.loading}></TableComponent>
        </div>
      </>
    );
  }
}

export default Analysis;
