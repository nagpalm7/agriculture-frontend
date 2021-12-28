import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent/TableComponent';
import { PageHeader, Input } from 'antd';
import './MainContent.css';
import MyButton from '../ButtonComponent/MyButton';
import { Modal, Button } from 'antd';
import { axiosInstance } from '../../utils/axiosIntercepter';
import cloud_logo from '../../assets/images/cloud.png';
import search_solid from '../../assets/images/search-solid.svg';
import { Progress } from 'antd';
import LocationReport from './LocationReportModal';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';
import {
  SearchOutlined,
  FilterOutlined,
  CaretLeftOutlined,
  ArrowLeftOutlined,
} from '@ant-design/icons';
import FilterComponent from './FilterComponent';
import { Row, Col } from 'antd';

const { Search } = Input;

class MainContent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      selectedFile: null,
      file_name: '',
      isUploaded: null,
      uploadPercent: 0,
      file_upload_err: null,
      location_update_count: '',
      searchValue: '',
      isSearchVisible: false,
      isFocused: false,
    };
  }

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOK = (event) => {
    this.setState({
      visible: false,
    });
  };

  handleCancel = (event) => {
    this.setState({
      ...this.state,
      visible: false,
      selectedFile: null,
      file_name: '',
      isUploaded: null,
      uploadPercent: 0,
      file_upload_err: null,
    });
  };
  fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.setState({
        ...this.state,
        selectedFile: file,
        file_name: file.name,
        file_upload_err: null,
        visible: true,
        isUploaded: null,
        uploadPercent: 0,
        file_upload_err: null,
        location_update_count: '',
      });
    }
  };
  fileUploadHandler = () => {
    const uploadUrl = this.props.addlink.split('/')[1];
    try {
      if (!this.state.isUploaded) {
        if (this.state.selectedFile) {
          if (this.state.file_name.toString().match(/\.csv$/g) != null) {
            const formData = new FormData();
            formData.append(
              'location_csv',
              this.state.selectedFile,
              this.state.selectedFile.name,
            );
            axiosInstance
              .post(`/api/upload/${uploadUrl}/`, formData, {
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
                this.setState({
                  ...this.state,
                  isUploaded: true,
                  location_update_count: res.data.count,
                });
              })
              .catch((err) => {
                console.log(err);
                this.setState({
                  ...this.state,
                  isUploaded: false,
                  file_upload_err: err,
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
        var error = new Error('File Alreay Uploaded');
        error.name = 'already_uploaded';
        throw error;
      }
    } catch (err) {
      console.log(err);
      this.setState({
        ...this.state,
        file_upload_err: err,
      });
    }
  };
  _handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      this.props.onSearch(this.state.searchValue);
    }
  };
  render() {
    const uploadUrl = this.props.addlink
      ? this.props.addlink.split('/')[1]
      : null;

    const err_text = () => {
      if (this.state.file_upload_err) {
        if (
          this.state.file_upload_err.name == 'file_not_selected' &&
          !this.state.selectedFile
        ) {
          return this.state.file_upload_err.message;
        } else if (this.state.file_upload_err.name == 'file_type_error') {
          return this.state.file_upload_err.message;
        } else if (this.state.file_upload_err.name == 'Error') {
          return this.state.file_upload_err.message;
        }
      } else {
        return '';
      }
    };
    const text = () => {
      if (this.state.isUploaded == true) {
        return 'Uploaded';
      } else if (this.state.isUploaded == false) {
        return 'Failed';
      }
    };
    const {
      title,
      addlink,
      loading,
      dataSource,
      columns,
      totalPages,
      onPageChange,
      onSearch,
    } = this.props;
    const searchClass = this.state.isFocused ? 'focused' : 'notFocused';
    return (
      <IntlProvider
      locale={this.props.lang}
      messages={Languages[this.props.lang]}>
      <div style={{ backgroundColor: '#fff', borderRadius: 'inherit' }}>
        <Row className="header_wrapper">
          <Col xs={24} sm={24} lg={4} md={3} style={{ marginBottom: '5px' }}>
            <span className="header_title">{title}</span>
          </Col>
          <Col xs={24} sm={24} lg={20} md={21} className="seconday_header">
            <div
              className={
                this.state.isSearchVisible ? 'option_inactive' : 'option_active'
              }>
              {!this.props.isLocation ? (
                !this.props.isVillageUnderDistrict ? (
                  <Link to={addlink} key="1">
                    <MyButton
                      text={ <FormattedMessage
                        id="add"
                        defaultMessage="Add"
                        values={this.props.lang}
                      />}
                      className="filled"
                      style={{
                        color: '#e03b3b',
                        backgroundColor: '#f5f3ff',
                        border: '0px',
                        marginRight: '10px',
                      }}
                    />
                  </Link>
                ) : null
              ) : (
                <span style={{ marginRight: '10px' }}>
                  <LocationReport
                    status={this.props.locStatus}></LocationReport>
                </span>
              )}
              {!this.props.isVillageUnderDistrict ? (
                <MyButton
                  key="2"
                  text={<FormattedMessage
                    id="add_bulk"
                    defaultMessage="Add Bulk"
                    values={this.props.lang}
                  />}
                  className="filled"
                  style={{
                    color: '#e03b3b',
                    backgroundColor: '#f5f3ff',
                    border: '0px',
                    marginRight: '10px',
                  }}
                  onClick={this.showModal}
                />
              ) : null}
            </div>
            {!this.props.isBlock ? (
              <>
                <div
                  className={
                    this.state.isSearchVisible
                      ? 'search_btn inactive'
                      : 'search_btn active'
                  }
                  onClick={() => {
                    this.setState({
                      ...this.state,
                      isSearchVisible: !this.state.isSearchVisible,
                    });
                  }}>
                  <SearchOutlined />
                </div>

                <div
                  id={
                    this.state.isSearchVisible
                      ? 'large_screen_search_active'
                      : 'large_screen_search_inactive'
                  }
                  className={`large_screen_search search-wrapper ${searchClass}`}>
                  <div className="left-wrapper">
                    <div
                      className="back"
                      onClick={() => {
                        this.setState({
                          ...this.state,
                          isSearchVisible: !this.state.isSearchVisible,
                        });
                      }}>
                      <ArrowLeftOutlined />{' '}
                    </div>
                    <input
                      type="text"
                      id="fname"
                      name="fname"
                      placeholder={(this.props.lang=="hi")?("खोजें .."):("Search ..")}
                      onChange={(e) => {
                        this.setState({
                          ...this.state,
                          searchValue: e.target.value,
                        });
                      }}
                      onKeyDown={this._handleKeyDown}
                      onBlur={() => {
                        this.setState({
                          ...this.state,
                          isFocused: false,
                        });
                      }}
                      onFocus={() => {
                        this.setState({
                          ...this.state,
                          isFocused: true,
                        });
                      }}
                      className="search-Input"></input>
                  </div>

                  <div className="search_options">
                    {/* <div
                        className="search-filter"
                        style={{ display: 'inline-block' }}>
                        <FilterOutlined />
                      </div>
                       */}
                    <FilterComponent
                      filter={this.props.filter}></FilterComponent>
                    <div
                      style={{ display: 'inline-block', marginLeft: '3px' }}
                      className="search-button"
                      onClick={() => {
                        onSearch(this.state.searchValue);
                      }}>
                      <SearchOutlined />
                    </div>
                  </div>
                </div>
              </>
            ) : null}
          </Col>
        </Row>
        <Modal
          title={<FormattedMessage
            id="uploadText"
            defaultMessage="You can upload a CSV file"
            values={this.props.lang}
          />}
          centered
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          width={400}
          footer={[
            <div className="footer_buttons">
              <Button
                key="upload"
                className="modal-button"
                onClick={this.fileUploadHandler}
                style={{
                  color: '#e03b3b',
                  backgroundColor: '#f5f3ff',
                  border: '0px',
                  width: '150px',
                }}>
                <div>
                  <img src={cloud_logo} />
                  <span>
                    {this.state.isUploaded != null ? text() : <FormattedMessage
            id="upload"
            defaultMessage="Upload"
            values={this.props.lang}
          />}
                  </span>
                  <Progress
                    type="circle"
                    width={30}
                    sty
                    percent={this.state.uploadPercent}
                  />
                </div>
              </Button>
              <Button
                key="back"
                type="primary"
                className="modal-button"
                loading={loading}
                onClick={this.handleCancel}
                style={{
                  color: 'black',
                  backgroundColor: 'white',
                  border: '0px',
                }}>
                <FormattedMessage
            id="cencel"
            defaultMessage="Cancel"
            values={this.props.lang}
          />
              </Button>
            </div>,
            <div className="new_locations">
              {this.state.location_update_count
                ? `${this.state.location_update_count} new ${uploadUrl} successfully added`
                : ''}
            </div>,
          ]}>
          <p><FormattedMessage
            id="uploadLowerText"
            defaultMessage="click on upload button"
            values={this.props.lang}
          /></p>
          <input
            type="file"
            id="myfile"
           
            style={{ display: 'none' }}
            ref={(inputFile) => (this.inputFile = inputFile)}
            name="myfile"
            onChange={this.fileSelectedHandler}
            accept=".csv"
          />
          <Button
            key="upload"
            className="modal-button"
            onClick={() => {
              this.inputFile.click();
            }}
            style={{
              color: '#e03b3b',
              backgroundColor: '#f5f3ff',
              border: '0px',
              width: '200px',
            }}>
            <FormattedMessage
            id="selectFile"
            defaultMessage="Select File"
            values={this.props.lang}
          />
          </Button>
          <div className="file_name">{this.state.file_name}</div>
          <div className="err_mess">{err_text()}</div>
        </Modal>

        <TableComponent
          onRowClick={this.props.onRowClick}
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
      </IntlProvider>
    );
  }
}

export default MainContent;
