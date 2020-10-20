import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import { axiosInstance } from '../../utils/axiosIntercepter';
import './charts.css';
const style = {
  ChartComponent: {
    height: 220,
    width: 180,
    backgroundColor: 'white',
    margin: '10px 10px 30px 30px',
    borderRadius: 30,
    padding: '15px',
  },
};

class Charts extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      pending_chart_data: {
        labels: [],
        data: [],
      },
      ongoing_chart_data: { labels: [], data: [] },
      completed_chart_data: { labels: [], data: [] },
    };
  }

  processData = async (status) => {
    try {
      let count = await axiosInstance.get(
        'https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=2019-02-01&end_date=2019-12-12&points=5',
      );
      this.setState({
        ...this.state,
        loading: false,
      });
      if (status == 'pending') {
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
      } else if (status == 'ongoing') {
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
      } else if (status == 'completed') {
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
      }
    } catch {
      this.setState({
        ...this.state,
        loading: false,
      });
    }
  };

  render() {
    return (
      <div className="charts-wrapper">
        <div>
          <ChartComponent
            status="pending"
            processData={this.processData}
            count={this.state.pending_chart_data}
            loading={this.state.loading}></ChartComponent>
        </div>
        <div>
          <ChartComponent
            status="ongoing"
            processData={this.processData}
            count={this.state.ongoing_chart_data}
            loading={this.state.loading}
          />
        </div>
        <div>
          <ChartComponent
            status="completed"
            processData={this.processData}
            count={this.state.completed_chart_data}
            loading={this.state.loading}
          />
        </div>
      </div>
    );
  }
}

export default Charts;
