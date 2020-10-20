import React, { Component } from 'react';
import { PageHeader, Table, Space, Button, Input } from 'antd';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Menu, Dropdown, Modal, message } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { DownOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';

const { confirm } = Modal;
const { Search } = Input;

class ADO extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      adoData: [],
      loading: false,
    };
  }

  columns = [
    {
      title: 'DDA',
      dataIndex: 'dda',
      key: 'dda.username',
      render: (dda) => {
        return dda.name;
      },
    },
    {
      title: 'ADO',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return user.name;
      },
    },
    {
      title: 'VILLAGES',
      dataIndex: 'village_ado',
      key: 'village_ado',
      render: (villages) => {
        const menu = villages
          ? villages.map((village) => {
              return <Menu.Item>{village.village}</Menu.Item>;
            })
          : null;
        return (
          <Dropdown overlay={<Menu>{menu}</Menu>} placement="bottomCenter">
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}>
              <span style={{ color: 'black' }}>View Villages</span>{' '}
              <DownOutlined
                style={{
                  color: 'black',
                }}
              />
            </a>
          </Dropdown>
        );
      },
    },
    {
      title: 'PHONE',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        return user.phone_number;
      },
    },
    {
      title: 'EMAIL',
      key: 'user',
      dataIndex: 'user',
      render: (user) => {
        return user.email;
      },
    },
    {
      title: 'OPTIONS',
      key: 'user',
      dataIndex: 'user',
      render: (user) => {
        return (
          <Space size="large">
            <Link to={`/ado/edit/${user.id}`}>
              <img src={edit} className="icons" />
            </Link>
            <span
              onClick={() => {
                this.showDeleteConfirm(user.name, user.id);
              }}>
              <img src={garbage} className="icons" />
            </span>
          </Space>
        );
      },
    },
  ];
  onSearch = (value) => {
    console.log('search = ', value);
    this.setState({ ...this.state, search: value });
    console.log(this.props.history);
    let currentPage = this.props.history.location.search.split('=')[1];
    console.log(currentPage);
    if (currentPage === undefined) {
      this.fetchADO(1, value);
    } else {
      this.fetchADO(currentPage, value);
    }
  };
  onPageChange = (page) => {
    this.props.history.push({
      pathname: '/ado/',
      search: `?page=${page}`,
    });
    this.fetchADO(page, this.state.search);
  };
  fetchADO = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/users-list/ado?page=${page}&search=${search}`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          adoData: res.data.results,
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
  showDeleteConfirm = (adoName, adoId) => {
    console.log(adoName);
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this district?',
      icon: <ExclamationCircleOutlined />,
      content: adoName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axiosInstance
          .delete(`/api/user/${adoId}/`)
          .then((res) => {
            console.log(res);
            message.success('ADO deleted successfully');
            if (currentPage === undefined) {
              instance.fetchADO(1);
            } else {
              instance.fetchADO(currentPage);
            }
          })
          .catch((err) => {
            message.success('Unable to delete ADO');
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
  componentDidMount() {
    this.fetchADO(1, this.state.search);
  }
  render() {
    return (
      <>
        <MainContent
          title=" List of ADO"
          loading={this.state.loading}
          dataSource={this.state.adoData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

export default ADO;
