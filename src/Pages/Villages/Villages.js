import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Modal, message } from 'antd';
import './Villages.css';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class Villages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      villageData: [],
      loading: false,
    };
  }
  columns = [
    {
      title: 'VILLAGES',
      dataIndex: 'village',
      key: 'name',
    },
    {
      title: 'VILLAGE CODE',
      dataIndex: 'village_code',
      key: 'village_code',
    },
    {
      title: 'VILLAGE SUBCODE',
      dataIndex: 'village_subcode',
      key: 'village_subcode',
    },
    {
      title: 'BLOCK',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'ADO',
      dataIndex: 'ado',
      key: 'ado',
    },
    {
      title: 'OPTIONS',
      key: 'operation',
      render: (text, record) => {
        return (
          <Space size="large">
            <Link to={`/villages/edit/${record.id}`}>
              <img src={edit} alt="edit" className="icons" />
            </Link>
            <img
              src={garbage}
              className="icons"
              alt="delete"
              onClick={() => this.showDeleteConfirm(record.village, record.id)}
            />
          </Space>
        );
      },
    },
  ];

  onSearch = (value) => {
    this.setState({ ...this.state, search: value });
    let currentPage = this.props.history.location.search.split('=')[1];
    if (currentPage === undefined) {
      this.fetchVillageList(1, value);
    } else {
      this.fetchVillageList(currentPage, value);
    }
  };

  showDeleteConfirm = (villlageName, villageId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this village?',
      icon: <ExclamationCircleOutlined />,
      content: villlageName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axiosInstance
          .delete(`/api/village/${villageId}/`)
          .then((res) => {
            console.log(res);
            message.success('Village deleted successfully');
            if (currentPage === undefined) {
              instance.fetchVillageList(1);
            } else {
              instance.fetchVillageList(currentPage);
            }
          })
          .catch((err) => {
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
  };

  onPageChange = (page) => {
    console.log('page = ', page);
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${page}`,
    });
    this.fetchVillageList(page, this.state.search);
  };

  fetchVillageList = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/villages-list/?page=${page}&search=${search}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          villageData: res.data.results,
          loading: false,
          totalCount: res.data.count,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.fetchVillageList(1, this.state.search);
  }

  render() {
    return (
      <>
        <MainContent
          title="Villages"
          addlink="/villages/add"
          loading={this.state.loading}
          dataSource={this.state.villageData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

export default Villages;
