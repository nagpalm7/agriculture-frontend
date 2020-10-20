import React, { Component } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { Space, Modal, message } from 'antd';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
const { confirm } = Modal;

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockData: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.fetchBlockList();
  }
  fetchBlockList() {
    const district_id = this.props.history.location.pathname.split('/')[2];
    console.log(district_id);
    axiosInstance
      .get(`api/blocks-list/district/${district_id}/`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          blockData: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        }
      });
  }
  showDeleteConfirm(block_code) {
    let instance = this;
    confirm({
      title: 'Are you sure delete this block?',
      icon: <ExclamationCircleOutlined />,
      content: block_code,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axiosInstance
          .delete(`api/block/${block_code}/`)
          .then((res) => {
            console.log(res);
            message.success('District deleted successfully');
            instance.fetchBlockList();
          })
          .catch((err) => {
            message.success('Unable to delete block');
            if (err.response) {
              console.log(err.response);
            } else {
              message.error(err.message);
              console.log(err.message);
            }
          });
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }
  columns = [
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'Block Code',
      dataIndex: 'block_code',
      key: 'block_code',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      render: (district) => {
        return district.district;
      },
    },
    {
      title: 'OPTIONS',
      key: 'id',
      dataIndex: 'id',
      render: (blockId) => {
        const district_id = this.props.history.location.pathname.split('/')[2];
        return (
          <Space size="large">
            <Link to={`/block/${district_id}/edit/${blockId}`}>
              <img src={edit} alt="edit" className="icons" />
            </Link>
            <img
              src={garbage}
              className="icons"
              alt="delete"
              onClick={() => this.showDeleteConfirm(blockId)}
            />
          </Space>
        );
      },
    },
  ];
  render() {
    console.log(this.state);
    const district_id = this.props.history.location.pathname.split('/')[2];
    return (
      <MainContent
        title="Block"
        loading={this.state.loading}
        dataSource={this.state.blockData.results}
        columns={this.columns}
        isBlock={true}
        addlink={`/block/${district_id}/add`}
      />
    );
  }
}

export default Block;
