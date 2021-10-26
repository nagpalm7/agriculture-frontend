import React, { Component } from 'react';
import { Button, Modal, DatePicker, Spin, message } from 'antd';
import './Comparison.css';
import { axiosInstance } from '../../utils/axiosIntercepter';
import moment from 'moment';
const { RangePicker } = DatePicker;

const dateFormat = 'YYYY-MM-DD';
class ComparisonData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      links: null,
      loading: false,
      isModalOpen: false,
      startDate: null,
      endDate: null,
    };
  }

  fetchComparisonData = (startDate, EndDate) => {
    this.setState({
      ...this.state,
      loading: true,
    });
    axiosInstance
      .get(`api/comparison-report/?Start date=${startDate}&End date=${EndDate}`)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          loading: false,
          links: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        console.log(err);
      });
  };
  handleDateChange = (e) => {
    console.log(e);
    if (e) {
      var start = e[0].format(dateFormat);
      var end = e[1].format(dateFormat);
      this.setState({
        ...this.state,
        startDate: start,
        endDate: end,
      });
    }
  };
  handleOk = () => {
    this.setState({
      ...this.state,
      NasaLinks: null,
      isModalOpen: false,
     // startDate: "",
     // endDate: "",
    });
  };
  handleCancel = () => {
    this.setState({
      ...this.state,
      links: null,
      isModalOpen: false,
      //startDate: "",
      //endDate: "",
    });
  };
  handleOpen = () => {
    this.setState({
      ...this.state,
      isModalOpen: true,
    });
  };
  render() {
    return (
      <div className="comparison-data-wrapper">
        <Button
          style={{
            color: '#e03b3b',
            backgroundColor: '#f5f3ff',
            border: '0px',
            width: '100%',
            borderRadius: '10px',
          }}
          onClick={() => {
            if (this.props.closeDrawer) {
              this.props.closeDrawer();
            }
            this.handleOpen();
          }}>
          Comparison
        </Button>
        <Modal
          visible={this.state.isModalOpen}
          //onOk={this.handleOk}
          onCancel={this.handleCancel}
          onOk={this.handleOk}
          footer={[
            <div style={{ display: 'flex' }}>
              <Button
                style={{
                  color: '#e03b3b',
                  backgroundColor: '#f5f3ff',
                  border: '0px',
                  width: '100%',
                  borderRadius: '10px',
                }}
                onClick={() => {
                  if (this.state.startDate && this.state.endDate) {
                    this.fetchComparisonData(
                      this.state.startDate,
                      this.state.endDate,
                    );
                  } else {
                    message.warning('Please Choose Start and end dates!');
                  }
                }}
                key="Upload">
                Get Data
              </Button>
              <Button
                style={{
                  color: 'white',
                  backgroundColor: '#e03b3b',
                  border: '0px',
                  width: '100%',
                  borderRadius: '20px',
                }}
                key="cancel"
                onClick={this.handleCancel}>
                Cancel
              </Button>
            </div>,
          ]}>
          <div className="com_header">Get comparison data</div>
          <RangePicker
            onChange={this.handleDateChange}
            style={{
              width: '70%',
              borderRadius: '20px',
            }}></RangePicker>
          <div>
            {!this.state.loading ? (
              <div>
                {this.state.links ? (
                  <div className="com_links">
                    Comparison Data :{' '}
                    <a href={this.state.links.ComparisonReport}>
                      {this.state.links.ComparisonReport}
                    </a>
                  </div>
                ) : null}
              </div>
            ) : (
              <Spin spinning={true}></Spin>
            )}
          </div>
        </Modal>
      </div>
    );
  }
}

export default ComparisonData;
