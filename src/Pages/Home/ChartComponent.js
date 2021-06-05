import React, { Component } from 'react';
import { Line } from 'react-chartjs-2';
import './charts.css';
class ChartComponent extends Component {
  constructor(props) {
    super(props);
  }
  componentDidMount() {
    console.log(this.props.selectedDist);
    const { processData } = this.props;
    processData(this.props.status,this.props.selectedDist);
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
  getLable(status,lang){
    let lable;
   
    if(lang=="hi"){
      if (status == 'pending') {
        lable='अनिर्णीत';
      } else if (status == 'ongoing') {
        lable='चल रही है';
      } else if (status == 'completed') {
        lable ='पूरित';
      }
    }
    else{
      lable=status.toUpperCase();
    }
    return lable;
  }
  render() {
  
    const chartData = {
      labels: !this.props.loading ? this.props.count.labels : null,
      datasets: [
        {
          label: [this.getLable(this.props.status,this.props.lang)],
          data: !this.props.loading ? this.props.count.data : null,
          backgroundColor: ['transparent'],
          borderColor: [this.borderColor(this.props.status)],
        },
      ],
    };

    if (this.props.allFlag) {
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
    } else {
      return (
        <div className={this.props.status}>
          <div className="header">{this.props.status}</div>
          <div className="count">{this.props.count.data[0]}</div>
        </div>
      );
    }
  }
}
export default ChartComponent;
