import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, message, Modal } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './District.css';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../utils/axiosIntercepter';

const { confirm } = Modal;

class District extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      totalCount: null,
      dsitrictData: [],
      loading: false,
    };
  }

  columns = [
    {
      title: 'DISTRICTS',
      dataIndex: 'district',
      key: 'district_name',
    },
    {
      title: 'DISTRICT CODE',
      dataIndex: 'district_code',
      key: 'district_code',
    },
    {
      title: 'OPTIONS',
      key: 'option',
      render: (text, record) => (
        <Space size="large">
          <Link to={`/district/edit/${record.id}`}>
            <img src={edit} alt="edit" className="icons" />
          </Link>
          <img
            src={garbage}
            className="icons"
            alt="delete"
            onClick={() => this.showDeleteConfirm(record.district, record.id)}
          />
        </Space>
      ),
    },
  ];

  showDeleteConfirm = (districtName, districtId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this district?',
      icon: <ExclamationCircleOutlined />,
      content: districtName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axiosInstance
          .delete(`/api/district/${districtId}/`)
          .then((res) => {
            console.log(res);
            message.success('District deleted successfully');
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

  fetchDistrictList = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/district/?page=${page}&search=${search}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          districtData: res.data,
          loading: false,
          totalPages: res.data.length,
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
    this.fetchDistrictList(1, this.state.search);
  }

  render() {
    return (
      <>
        <MainContent
          title="District"
          addlink="/district/add"
          loading={this.state.loading}
          dataSource={this.state.districtData}
          columns={this.columns}
          totalPages={this.state.totalPages}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

export default District;
