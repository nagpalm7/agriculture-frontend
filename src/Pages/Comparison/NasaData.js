import React, { Component } from 'react';
import { Button, DatePicker, Modal, Empty, Spin, message } from 'antd';
import { axiosInstance } from '../../utils/axiosIntercepter';
import moment from 'moment';

const dateFormat = 'YYYY-MM-DD';

class NasaData extends Component {
  constructor(props) {
    super(props);
    this.state = {
      NasaLinks: null,
      Loading: false,
      isModalOpen: false,
      date: null,
    };
    this.handleOpen = this.handleOpen.bind(this);
    this.handleGetData = this.handleGetData.bind(this);
    this.fetchNasaData = this.fetchNasaData.bind(this);
  }
  fetchNasaData = (dateString = moment().format(dateFormat)) => {
    this.setState({
      ...this.state,
      Loading: true,
    });
    axiosInstance
      .get(`api/NasaData/?date=${dateString}`)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          Loading: false,
          NasaLinks: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          Loading: false,
        });
        console.log(err);
      });
  };

  handleOk = () => {
    this.setState({
      ...this.state,
      NasaLinks: null,
      isModalOpen: false,
    });
  };
  handleCancel = () => {
    this.setState({
      ...this.state,
      NasaLinks: null,
      isModalOpen: false,
    });
  };
  handleDateChange = (date, dateString) => {
    console.log(dateString);
    this.setState({
      ...this.state,
      date: dateString,
    });
  };
  handleGetData = () => {
    this.fetchNasaData(this.state.date);
  };
  handleOpen() {
    this.setState(
      {
        ...this.state,
        isModalOpen: true,
      },
      () => {
        this.fetchNasaData(moment().format(dateFormat));
      },
    );
  }
  render() {
    return (
      <div style={{ width: '10%' }}>
        <Modal
          visible={this.state.isModalOpen}
          onOk={this.handleOk}
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
                onClick={this.handleGetData}
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
          <div className="com_header">
            Get common location of different Satellites
          </div>

          <DatePicker
            style={{
              width: '70%',
              borderRadius: '20px',
            }}
            defaultValue={moment()}
            format={dateFormat}
            onChange={this.handleDateChange}></DatePicker>
          {this.state.Loading == false ? (
            <div className="nasa_wrapper">
              {this.state.NasaLinks ? (
                <div className="nasa_links">
                  <div>
                    MODIS 1KM :
                    {this.state.NasaLinks['MODIS_1km'] != 'NOT AVAILABLE' ? (
                      <a
                        href={this.state.NasaLinks['MODIS_1km']}
                        target="_blank">
                        {this.state.NasaLinks['MODIS_1km']}
                      </a>
                    ) : (
                      'NOT AVAILABLE'
                    )}
                  </div>
                  <div>
                    VIIRS 375 S NPP:
                    {this.state.NasaLinks['VIIRS_375_S-NPP'] !=
                    'NOT AVAILABLE' ? (
                      <a href={this.state.NasaLinks['VIIRS_375_S-NPP']}>
                        {this.state.NasaLinks['VIIRS_375_S-NPP']}
                      </a>
                    ) : (
                      'NOT AVAILABLE'
                    )}
                  </div>
                  <div>
                    VIIRS 375m NOAA:
                    {this.state.NasaLinks['VIIRS_375m_NOAA'] !=
                    'NOT AVAILABLE' ? (
                      <a href={this.state.NasaLinks['VIIRS_375m_NOAA']}>
                        {this.state.NasaLinks['VIIRS_375m_NOAA']}
                      </a>
                    ) : (
                      'NOT AVAILABLE'
                    )}
                  </div>
                  <div>
                    HARSAC :
                    {this.state.NasaLinks['HARSAC'] != 'NOT AVAILABLE' ? (
                      <a href={this.state.NasaLinks['HARSAC']}>
                        {this.state.NasaLinks['HARSAC']}
                      </a>
                    ) : (
                      <span style={{ color: '#1890ff' }}> NOT AVAILABLE</span>
                    )}
                  </div>
                </div>
              ) : (
                <Empty></Empty>
              )}
            </div>
          ) : (
            <div style={{ paddingTop: '20px' }}>
              <Spin spinning={true}></Spin>
            </div>
          )}
        </Modal>
        <Button
          onClick={this.handleOpen}
          style={{
            color: '#e03b3b',
            backgroundColor: '#f5f3ff',
            border: '0px',
            width: '100%',
            borderRadius: '10px',
          }}>
          Nasa Data
        </Button>
      </div>
    );
  }
}
export default NasaData;
