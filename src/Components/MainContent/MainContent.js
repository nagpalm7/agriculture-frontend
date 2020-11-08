import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent/TableComponent';
import { PageHeader, Input } from 'antd';
import './MainContent.css';
import MyButton from '../ButtonComponent/MyButton';
import { Modal, Button } from 'antd';
import { axiosInstance } from '../../utils/axiosIntercepter';
import cloud_logo from '../../assets/images/cloud.png';
import { Progress } from 'antd';
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
                console.log(res);
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
  render() {
    const uploadUrl = this.props.addlink
      ? this.props.addlink.split('/')[1]
      : null;
    console.log(this.state);
    const err_text = () => {
      if (this.state.file_upload_err) {
        console.log(this.state.file_upload_err.name);
        console.log(this.state.file_upload_err.message);
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
    return (
      <div style={{ backgroundColor: '#fff', borderRadius: 'inherit' }}>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title={title}
          subTitle=""
          style={{ borderRadius: '20px' }}
          extra={[
            !this.props.isLocation ? (
              <Link to={addlink} key="1">
                <MyButton
                  text="Add"
                  className="filled"
                  style={{
                    color: '#e03b3b',
                    backgroundColor: '#f5f3ff',
                    border: '0px',
                  }}
                />
              </Link>
            ) : null,
            <MyButton
              key="2"
              text="Add Bulk"
              className="filled"
              style={{
                color: '#e03b3b',
                backgroundColor: '#f5f3ff',
                border: '0px',
              }}
              onClick={this.showModal}
            />,
            !this.props.isBlock ? (
              <Search
                placeholder="Search"
                onSearch={(value) => onSearch(value)}
                className="search-bar-style"
                style={{ width: 200, color: '#000' }}
              />
            ) : null,
          ]}
        />
        <Modal
          title="You can upload a CSV file"
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
                    {this.state.isUploaded != null ? text() : 'Upload'}
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
                Cancel
              </Button>
            </div>,
            <div className="new_locations">
              {this.state.location_update_count
                ? `${this.state.location_update_count} new ${uploadUrl} successfully added`
                : ''}
            </div>,
          ]}>
          <p>click on upload button or drag & drop</p>
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
            Select File
          </Button>
          <div className="file_name">{this.state.file_name}</div>
          <div className="err_mess">{err_text()}</div>
        </Modal>

        <TableComponent
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
}

export default MainContent;
