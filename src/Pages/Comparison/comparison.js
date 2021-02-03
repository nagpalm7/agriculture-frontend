import React, { Component } from 'react';
import {
  Row,
  Col,
  Spin,
  message,
  DatePicker,
  Checkbox,
  Select,
  Button,
  Modal,
} from 'antd';
import Map from '../Home/Map';
import { axiosInstance } from '../../utils/axiosIntercepter';
import ComparisonMap from './ComparisonMap.js';
import './Comparison.css';
import { Upload } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import Uploader from './ComparisonModal.js';
import moment from 'moment';
import NasaData from './NasaData.js';
import ComparisonData from './ComparisonData.js';
const dateFormat = 'YYYY-MM-DD';
const { Option } = Select;
const children = [];
children.push(
  <Option selected={true} key="harsac_points">
    Harsac Points
  </Option>,
);
children.push(<Option key="modis_points">Modis Points</Option>);
children.push(<Option key="viirs_noaa_points">Viirs Noaa Points</Option>);
children.push(<Option key="viirs_npp1_points">Viirs NPP1 Points</Option>);

class Comparison extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locations: null,
      loading: null,
      selectedSatellites: [],
      date: null,
      isModalOpen: false,
      selectedFiles: null,
      file_upload_err: null,
      uploadDate: null,
      btnLoading: false,
      forceUpdate: false,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  addFiles = (file, type) => {
    const obj = new Object();
    obj[type] = file;
    var files = obj;
    this.setState({ selectedFiles: files });
  };
  showModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  handleOk = (e) => {
    this.setState({ ...this.state, isModalOpen: false });
  };
  handleCancel = (e) => {
    this.setState({
      ...this.state,
      selectedFiles: null,
      isModalOpen: false,
      file_upload_err: null,
      forceUpdate: false,
    });
  };
  handleChange(value) {
    let arr = [];
    arr = value.toString().split(',');
    this.setState(
      { ...this.state, selectedSatellites: arr, loading: true },
      () => {
        this.fetchLocsData(this.state.date, arr);
      },
    );
  }
  componentDidMount() {
    const dateString = moment().format(dateFormat);
    this.setState(
      {
        ...this.state,
        selectedSatellites: [
          'harsac_points',
          'modis_points',
          'viirs_noaa_points',
          'viirs_npp1_points',
        ],
      },
      () => {
        this.fetchLocsData(dateString.toString());
      },
    );
  }
  fetchLocsData = (
    dateString,
    selectedSatellites = [
      'harsac_points',
      'modis_points',
      'viirs_noaa_points',
      'viirs_npp1_points',
    ],
  ) => {
    console.log(dateString, selectedSatellites);
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`https://api.aflmonitoring.com/api/compare-data/?date=${dateString}`)
      .then((res) => {
        console.log(res);
        let locs = [];
        if (selectedSatellites) {
          selectedSatellites.map((satellite) => {
            if (satellite == 'harsac_points') {
              locs.push(res.data.HARSAC_points);
            } else if (satellite == 'modis_points') {
              locs.push(res.data.MODIS_points);
            } else if (satellite == 'viirs_noaa_points') {
              locs.push(res.data.NOAA_points);
            } else if (satellite == 'viirs_npp1_points') {
              locs.push(res.data.NPP_points);
            }
          });
        }
        this.setState({ ...this.state, loading: false, locations: locs });
      })
      .catch((err) => {
        message.error('No data found');
        this.setState({ ...this.state, loading: false });
        if (err.response) {
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };
  handleDateChange = (date, dateString) => {
    console.log(this.state.selectedSatellites);
    this.setState({ ...this.state, loading: true, date: dateString }, () => {
      this.fetchLocsData(dateString, this.state.selectedSatellites);
    });
  };
  handleUploadDateChange = (date, dateString) => {
    console.log(dateString);
    this.setState({ ...this.state, uploadDate: dateString });
  };
  selectedFileName = (type) => {
    return this.state.selectedFiles.map((file) => {
      if (file[type]) {
        console.log(file[type].name);
        return file[type].name;
      } else {
        return null;
      }
    });
  };
  fileUploadHandler = () => {
    this.setState({ ...this.state, btnLoading: true });
    try {
      if (this.state.selectedFiles) {
        if (
          this.state.selectedFiles.harsac.name
            .toString()
            .match(/\.(xls|xlsx)$/g) != null
        ) {
          const formData = new FormData();
          console.log(this.state.selectedFiles.harsac);
          formData.append(
            'harsac_file',
            this.state.selectedFiles.harsac,
            this.state.selectedFiles.harsac.name,
          );
          formData.append('force-update', this.state.forceUpdate);
          console.log(formData);
          axiosInstance
            .post('api/compare-data/', formData, {
              onDownloadProgress: (progressEvent) => {
                this.setState({
                  ...this.state,
                  file_upload_err: null,
                  uploadPercent: Math.round(
                    (progressEvent.loaded * 100) / progressEvent.total,
                  ),
                });
              },
            })
            .then((res) => {
              console.log(res);
              this.setState({
                ...this.state,
                btnLoading: false,
                isModalOpen: false,
                selectedFiles: null,
                file_upload_err: null,
                forceUpdate: false,
              });
              message.success(
                `Uploaded Successfully\nNewly Added - ${res.data['NEW ADDED']}\n Already Existed - ${res.data['ALREADY EXIST']}`,
              );
            })
            .catch((err) => {
              console.log(err.response.data);
              message.warning(err.message);
              this.setState({
                ...this.state,
                file_upload_err: err.response.data,
                btnLoading: false,
              });
              throw err;
            });
        } else {
          var error2 = new Error('Only .xls or .xlsx format can be uploaded');
          error2.name = 'file_type_error';
          throw error2;
        }
      } else {
        var error = new Error('Select the file before uploading');
        error.name = 'file_not_selected';
        throw error;
      }
    } catch (err) {
      message.warning(err.message);
      console.log(err.name);
      this.setState({
        file_upload_err: err.message,
        btnLoading: false,
      });
    }
  };
  handleForceUpdate = (e) => {
    console.log(e.target.checked);
    this.setState({
      ...this.state,
      forceUpdate: e.target.checked,
    });
  };
  render() {
    return (
      <div className="comparison-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>
            Comparison
          </h2>
        </Row>
        <Row justify="space-between">
          <Col lg={10} md={14} sm={14} xs={24}>
            <Select
              mode="tags"
              defaultValue={[
                'harsac_points',
                'modis_points',
                'viirs_noaa_points',
                'viirs_npp1_points',
              ]}
              style={{ width: '100%', marginRight: '10px' }}
              placeholder="Select Satellites"
              onChange={this.handleChange}>
              {children}
            </Select>
          </Col>
          <Col lg={6} md={10} sm={10} xs={24}>
            <div className="date_pick">
              <DatePicker
                style={{ width: '100%' }}
                onChange={this.handleDateChange}
                defaultValue={moment()}
                format={dateFormat}></DatePicker>
            </div>
          </Col>
          <Col lg={8} md={24} sm={24} xs={24}>
            <div
              className="bottom_btns"
              style={{
                display: 'flex',
                justifyContent: 'space-around',
              }}>
              <Button
                style={{
                  color: '#e03b3b',
                  backgroundColor: '#f5f3ff',
                  border: '0px',

                  borderRadius: '10px',
                }}
                defaultValue={moment()}
                onClick={this.showModal}>
                Upload
              </Button>
              <NasaData></NasaData>
              <ComparisonData style={{ textAlign: 'right' }}></ComparisonData>
              <Modal
                visible={this.state.isModalOpen}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
                style={{ width: '80vw' }}
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
                      key="Upload"
                      onClick={this.fileUploadHandler}
                      loading={this.state.btnLoading}>
                      Upload
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
                <div className="data">
                  <div className="modal_header">
                    You can upload Excel(.xls or .xlsx) file
                  </div>
                  <div
                    className="modal_sub_head"
                    style={{ marginBottom: '20px' }}>
                    Select the files you want to upload
                  </div>
                  <Uploader
                    type="Upload HARSAAC Files"
                    style={{ marginTop: '20px' }}
                    addFiles={this.addFiles}
                    file_type="harsac"
                    file_err={this.state.file_upload_err}
                    file_name={
                      this.state.selectedFiles
                        ? this.state.selectedFiles.harsac.name
                        : null
                    }></Uploader>
                  {/* <div className="date">Select Date*</div> */}
                  {/* <DatePicker
                style={{
                  width: '70%',
                  borderRadius: '20px',
                }}
                onChange={this.handleUploadDateChange}></DatePicker> */}
                </div>
                <div className="force_update">
                  <div>Force Update</div>
                  <Checkbox
                    onChange={this.handleForceUpdate}
                    checked={this.state.forceUpdate}></Checkbox>
                </div>
              </Modal>
            </div>
          </Col>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          {!this.state.loading ? (
            <>
              <Col span={24}>
                <ComparisonMap locations={this.state.locations}></ComparisonMap>
              </Col>
            </>
          ) : (
            <Spin />
          )}
        </Row>
      </div>
    );
  }
}

export default Comparison;
