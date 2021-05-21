import React, { Component } from 'react';
import ChartComponent from './ChartComponent';
import { axiosInstance } from '../../utils/axiosIntercepter';
import moment from 'moment';
import './charts.css';
const dateFormat = 'YYYY-MM-DD';
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
    console.log(this.props.selectedDist);
    try {
      let startDate = '2019-02-01';
      let EndDate = moment().format(dateFormat);
      let count = await axiosInstance.get(
        `https://api.aflmonitoring.com/api/countReportBtwDates/?start_date=${startDate}&end_date=${EndDate}&points=15`,
      );
      console.log(count);
      this.setState({
        ...this.state,
        loading: false,
      });
      if (status == 'pending') {
        if (this.props.selectedDist == 'ALL DISTRICTS') {
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
        } else {
          const rec = count.data.results;
          for (var val in rec) {
            if (rec.hasOwnProperty(val)) {
              if (val == this.props.selectedDist) {
                console.log(rec[val]);
                this.setState((prevState) => ({
                  ...this.state,
                  pending_chart_data: {
                    labels: [...prevState.pending_chart_data.labels, val],
                    data: [
                      ...prevState.pending_chart_data.data,
                      rec[val].pending,
                    ],
                  },
                }));
              }
            }
          }
        }
      } else if (status == 'ongoing') {
        if (this.props.selectedDist == 'ALL DISTRICTS') {
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
        } else {
          const rec = count.data.results;
          for (var val in rec) {
            if (rec.hasOwnProperty(val)) {
              if (val == this.props.selectedDist) {
                console.log(rec[val]);
                this.setState((prevState) => ({
                  ...this.state,
                  ongoing_chart_data: {
                    labels: [...prevState.ongoing_chart_data.labels, val],
                    data: [
                      ...prevState.ongoing_chart_data.data,
                      rec[val].ongoing,
                    ],
                  },
                }));
              }
            }
          }
        }
      } else if (status == 'completed') {
        if (this.props.selectedDist == 'ALL DISTRICTS') {
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
        } else {
          const rec = count.data.results;
          for (var val in rec) {
            if (rec.hasOwnProperty(val)) {
              if (val == this.props.selectedDist) {
                console.log(rec[val]);
                this.setState((prevState) => ({
                  ...this.state,
                  completed_chart_data: {
                    labels: [...prevState.completed_chart_data.labels, val],
                    data: [
                      ...prevState.completed_chart_data.data,
                      rec[val].completed,
                    ],
                  },
                }));
              }
            }
          }
        }
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
            lang={this.props.lang}
            processData={this.processData}
            count={this.state.pending_chart_data}
            loading={this.state.loading}
            allFlag={
              this.props.selectedDist == 'ALL DISTRICTS' ? true : false
            }></ChartComponent>
        </div>
        <div>
          <ChartComponent
            status="ongoing"
            lang={this.props.lang}
            processData={this.processData}
            count={this.state.ongoing_chart_data}
            loading={this.state.loading}
            allFlag={this.props.selectedDist == 'ALL DISTRICTS' ? true : false}
          />
        </div>
        <div>
          <ChartComponent
            status="completed"
            lang={this.props.lang}
            processData={this.processData}
            count={this.state.completed_chart_data}
            loading={this.state.loading}
            allFlag={this.props.selectedDist == 'ALL DISTRICTS' ? true : false}
          />
        </div>
      </div>
    );
  }
}

export default Charts;
