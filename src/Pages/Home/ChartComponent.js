import React, { Component } from 'react';
import { Bar, Line } from 'react-chartjs-2';

class ChartComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    const { processData } = this.props;
    processData(this.props.status);
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
  render() {
    const chartData = {
      labels: !this.props.loading ? this.props.count.labels : null,
      datasets: [
        {
          label: this.props.status.toUpperCase(),
          data: !this.props.loading ? this.props.count.data : null,
          backgroundColor: ['transparent'],
          borderColor: [this.borderColor(this.props.status)],
        },
      ],
    };
    return (
      <Line
        data={chartData}
        options={{
          maintainAspectRatio: true,
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
                ticks: {
                  display: false,
                },
                gridLines: {
                  display: false,
                },
              },
            ],
            yAxes: [
              {
                gridLines: {
                  display: false,
                },
              },
            ],
          },
        }}
      />
    );
  }
}
export default ChartComponent;
