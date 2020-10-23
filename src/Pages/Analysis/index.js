import React, { Component } from 'react';
import { Spin } from 'antd';
import { Line } from 'react-chartjs-2';
import { axiosInstance } from '../../utils/axiosIntercepter';
import './Analysis.css';
import { PageHeader, Button } from 'antd';
import Table from './Table';

class Analysis extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      startDate: '2019-02-01',
      EndDate: '2019-12-12',
      active: 'allTime',
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
  changeActive(status) {
    this.setState({
      ...this.state,
      active: status,
    });
  }
  fetchData = async () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    let count = await axiosInstance.get(
      `https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=${this.state.startDate}&end_date=${this.state.EndDate}&points=5`,
    );
    this.setState({
      ...this.state,
      loading: false,
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
  };

  componentDidMount() {
    this.fetchData();
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
  buttonStyle(status) {
    const cond = this.state.active == status;
    if (cond) {
      return {
        color: 'white',
        backgroundColor: '#e66060',
        borderRadius: '10px',
        borderColor: '#e66060',
        fontWeight: '2em',
      };
    } else {
      return {
        color: '#e03b3b',
        backgroundColor: 'white',
        borderRadius: '10px',
      };
    }
  }
  handleButtonClick(status, startDate, EndDate) {
    this.setState({
      active: status,
      startDate: startDate,
      EndDate: EndDate,
    });
    this.fetchData();
  }
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
      <div className="analysis-wrapper">
        <PageHeader
          className="analysis-page-header"
          ghost={false}
          title="Analysis"
          style={{ borderRadius: '20px' }}
          extra={[
            <Button
              style={this.buttonStyle('allTime')}
              onClick={() => {
                this.handleButtonClick('allTime');
              }}>
              All Time
            </Button>,
            <Button
              style={this.buttonStyle('thisMonth')}
              onClick={() => {
                this.handleButtonClick('thisMonth');
              }}>
              This Month
            </Button>,
            <Button
              style={this.buttonStyle('thisYear')}
              onClick={() => {
                this.handleButtonClick('thisYear');
              }}>
              This Year
            </Button>,
            <Button
              style={this.buttonStyle('custom')}
              onClick={() => {
                this.handleButtonClick('custom');
              }}>
              Custom
            </Button>,
          ]}
        />
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
    );
  }
}

export default Analysis;
