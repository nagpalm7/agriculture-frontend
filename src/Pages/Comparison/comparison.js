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
const { Option } = Select;
const children = [];
children.push(<Option key="harsac_points">Harsac Points</Option>);
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
  fetchLocsData = (dateString, selectedSatellites) => {
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
              locs.push(res.data.harsac_points);
            } else if (satellite == 'modis_points') {
              locs.push(res.data.modis_points);
            } else if (satellite == 'viirs_noaa_points') {
              locs.push(res.data.viirs_noaa_points);
            } else if (satellite == 'viirs_npp1_points') {
              locs.push(res.data.viirs_npp1_points);
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
    console.log(dateString);
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
      if (!this.state.isUploaded) {
        if (this.state.uploadDate) {
          if (this.state.selectedFiles) {
            console.log(this.state.selectedFiles.harsac.name);
            if (
              this.state.selectedFiles.harsac.name
                .toString()
                .match(/\.csv$/g) != null
            ) {
              const formData = new FormData();
              formData.append(
                'harsac_file',
                this.state.selectedFiles.harsac,
                this.state.selectedFiles.harsac.name,
              );
              formData.append('date', this.state.date);
              formData.append('force-update', this.state.forceUpdate);
              axiosInstance
                .post(`api/compare-data/`, formData, {
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
                    isUploaded: true,
                    btnLoading: false,
                    isModalOpen: false,
                  });
                  message.success('Uploaded Successfully');
                })
                .catch((err) => {
                  console.log(err.message);
                  this.setState({
                    ...this.state,
                    isUploaded: false,
                    file_upload_err: err,
                    btnLoading: false,
                  });
                  throw err;
                });
            } else {
              var error2 = new Error('Only .csv format can be uploaded');
              error2.name = 'file_type_error';
              throw error2;
            }
          } else {
            var error = new Error('Select the file before uploading');
            error.name = 'file_not_selected';
            throw error;
          }
        } else {
          var error = new Error('Select the date before Uploading');
          error.name = 'date_not_selected';
          throw error;
        }
      } else {
        var error = new Error('File Alreay Uploaded');
        error.name = 'already_uploaded';
        throw error;
      }
    } catch (err) {
      message.warning(err.message);
      this.setState({
        file_upload_err: err,
        btnLoading: false,
      });
      console.log(err);
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
    console.log(this.state.uploadDate);
    return (
      <div className="comparison-wrapper">
        <Row style={{ marginBottom: '10px' }}>
          <h2 style={{ fontWeight: 'bold', flex: 1, fontSize: 26 }}>
            Comparison
          </h2>
        </Row>
        <Row justify="space-around">
          <Select
            mode="tags"
            style={{ width: '60%', marginRight: '10px' }}
            placeholder="Select Satellites"
            onChange={this.handleChange}>
            {children}
          </Select>

          <DatePicker
            style={{ width: '20%' }}
            onChange={this.handleDateChange}></DatePicker>
          <Button
            style={{
              color: '#e03b3b',
              backgroundColor: '#f5f3ff',
              border: '0px',
              width: '10%',
              borderRadius: '10px',
            }}
            onClick={this.showModal}>
            Upload
          </Button>
          <Modal
            visible={this.state.isModalOpen}
            onOk={this.handleOk}
            onCancel={this.handleCancel}
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
              <div className="modal_header">You can upload csv files</div>
              <div className="modal_sub_head" style={{ marginBottom: '20px' }}>
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
              <div className="date">Select Date*</div>
              <DatePicker
                style={{
                  width: '70%',
                  borderRadius: '20px',
                }}
                onChange={this.handleUploadDateChange}></DatePicker>
            </div>
            <div className="force_update">
              <div>Force Update</div>
              <Checkbox
                onChange={this.handleForceUpdate}
                checked={this.state.forceUpdate}></Checkbox>
            </div>
          </Modal>
        </Row>
        <Row justify="center" style={{ marginTop: '20px' }}>
          {!this.state.loading ? (
            <>
              <Col lg={24} sm={24}>
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
