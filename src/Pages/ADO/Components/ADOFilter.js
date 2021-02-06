import React, { Component } from 'react';
import { Form, Select, Spin, Divider, Button, Modal, Tag } from 'antd';
// import { axiosInstance } from '../../utils/axiosIntercepter';
import { FilterOutlined, RedditCircleFilled } from '@ant-design/icons';
class ADOFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false,
    };
  }
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleOk = () => {
    this.setState({ isModalVisible: false });
  };
  render() {
    return (
      <>
        <div
          className="search-filter"
          style={{ display: 'inline-block' }}
          onClick={() => {
            this.setState({ ...this.state, isModalVisible: true });
          }}>
          <FilterOutlined />
        </div>
        <Modal
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{
            padding: '10px',
            fontSize: '1.2em',
            color: 'black',
          }}
          footer={[]}></Modal>
      </>
    );
  }
}

export default ADOFilter;
