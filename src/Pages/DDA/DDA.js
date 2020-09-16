import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, message, Modal } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class DDA extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      totalCount: null,
      ddaData: [],
      loading: false,
    };
  }

  columns = [
    {
      title: 'DDA',
      dataIndex: 'dda',
      key: 'dda',
    },
    {
      title: 'DISTRICT',
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: 'PHONE',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'EMAIL',
      key: 'email',
      dataIndex: 'email',
    },
    {
      title: 'OPTIONS',
      key: 'option',
      render: (text, record) => {
        return (
          <Space size="large">
            <Link to={`/dda/edit/${record.id}`}>
              <img src={edit} alt="edit" className="icons" />
            </Link>
            <img
              src={garbage}
              className="icons"
              alt="delete"
              onClick={() => this.showDeleteConfirm(record.dda, record.id)}
            />
          </Space>
        );
      },
    },
  ];

  onSearch = (value) => {
    console.log(value);
    this.setState({ ...this.state, search: value });
    let currentPage = this.props.history.location.search.split('=')[1];
    if (currentPage === undefined) {
      this.fetchDdaList(1, value);
    } else {
      this.fetchDdaList(currentPage, value);
    }
  };

  showDeleteConfirm = (ddaName, ddaId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this dda?',
      icon: <ExclamationCircleOutlined />,
      content: ddaName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axiosInstance
          .delete(`/api/user/${ddaId}/`)
          .then((res) => {
            console.log(res);
            message.success('Dda deleted successfully');
            if (currentPage === undefined) {
              instance.fetchDdaList(1);
            } else {
              instance.fetchDdaList(currentPage);
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
      pathname: '/dda/',
      search: `?page=${page}`,
    });
    this.fetchDdaList(page, this.state.search);
  };

  fetchDdaList = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/users-list/dda/?page=${page}&search=${search}`)
      .then((res) => {
        console.log(res.data);
        const ddaData = res.data.results.map((item) => {
          return {
            id: item.user.id,
            dda: item.user.name,
            district: item.district.district,
            email: item.user.email,
            phone: item.user.phone,
          };
        });
        this.setState({
          ...this.state,
          ddaData: ddaData,
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
    this.fetchDdaList(1, this.state.search);
  }

  render() {
    return (
      <>
        <MainContent
          title="Dda"
          addlink="/dda/add"
          loading={this.state.loading}
          dataSource={this.state.ddaData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

export default DDA;
