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
      visible: false,
      file_name: '',
      selectedFile: null,
      isUploaded: null,
    });
  };
  fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    console.log(file);
    this.setState({
      ...this.state,
      selectedFile: file,
      file_name: file.name,
    });
  };
  fileUploadHandler = () => {
    const formData = new FormData();
    formData.append(
      'location_csv',
      this.state.selectedFile,
      this.state.selectedFile.name,
    );
    axiosInstance
      .post('/api/upload/locations/', formData, {
        onDownloadProgress: (progressEvent) => {
          console.log((progressEvent.loaded / progressEvent.total) * 100);
          this.setState({
            ...this.state,
            uploadPercent: (progressEvent.loaded / progressEvent.total) * 100,
          });
        },
      })
      .then((res) => {
        console.log('success');
        this.setState({
          ...this.state,
          isUploaded: true,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          isUploaded: false,
        });
      });
  };
  render() {
    console.log(this.state);
    const text = () => {
      if (this.state.isUploaded == true) {
        return 'Uploaded';
      } else if (this.state.isUploaded == true) {
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
            </Link>,
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

            <Search
              placeholder="Search"
              onSearch={(value) => onSearch(value)}
              className="search-bar-style"
              style={{ width: 200, color: '#000' }}
            />,
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
            <Button
              key="upload"
              className="modal-button"
              onClick={this.fileUploadHandler}
              style={{
                color: '#e03b3b',
                backgroundColor: '#f5f3ff',
                border: '0px',
                width: '120px',
              }}>
              <div>
                <img src={cloud_logo} />
                <span>{this.state.isUploaded ? text() : 'Upload'}</span>
              </div>
            </Button>,
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
            </Button>,
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
          <Progress
            type="circle"
            width={40}
            percent={this.state.uploadPercent}
          />
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
