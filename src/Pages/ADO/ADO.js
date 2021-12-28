import React, { Component } from 'react';
import { PageHeader, Table, Space, Button, Input } from 'antd';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Menu, Dropdown, Modal, message, Select } from 'antd';
import MenuItem from 'antd/lib/menu/MenuItem';
import { DownOutlined } from '@ant-design/icons';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './ADO.css';
import ADOFilter from './Components/ADOFilter';
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
      filters: {
        dda: null,
      },
      ddaInfo: null,
    };
    this.applyFilter = this.applyFilter.bind(this);
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
      title: 'Villages',
      dataIndex: 'village_ado',
      key: 'village_ado',
      render: (villages) => {
        const menu = villages
          ? villages.map((village) => {
              return <Menu.Item>{village.village}</Menu.Item>;
            })
          : null;
        return villages.length != 0 ? (
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
        ) : (
          'No Villages'
        );
      },
    },
    {
      title: 'Phone',
      dataIndex: 'user',
      key: 'user',
      render: (user) => {
        if (user.phone_number == '') {
          return '------';
        } else {
          return user.phone_number;
        }
      },
    },
    {
      title: 'Email',
      key: 'user',
      dataIndex: 'user',
      render: (user) => {
        return user.email;
      },
    },
    {
      title: 'Options',
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
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    this.props.history.push({
      pathname: '/ado/',
      search: `?page=${1}&search=${value}`,
    });
    const { district } = this.state.filters;
    let distId;
    if(this.props.length==0)
    {
      if (currentPage === undefined) {
        instance.fetchADO(1);
      } else {
        instance.fetchADO(currentPage);
      }

    }
    if (district) {
      distId = district.split('_')[1];
    }
    if (this.props.type == 'dda_villages' && this.state.ddaInfo) {
      distId = this.state.ddaInfo.district.id;
    }
    this.fetchADO(1, value, distId);
  };
  onPageChange = (page) => {
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    const { district } = this.state.filters;
    let distId;
    if (district) {
      distId = district.split('_')[1];
    }
    if (this.props.type == 'dda_villages' && this.state.ddaInfo) {
      distId = this.state.ddaInfo.district.id;
    }
    this.props.history.push({
      pathname: '/ado/',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchADO(page, search, distId);
  };
  applyFilter(filters) {
    let { district } = filters;
    let distName, distId;

    if (district) {
      distName = district.split('_')[0];
      distId = district.split('_')[1];
      message.success(`Showing ADO's under ${distName}`);
    }

    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchADO(1, '', distId);
    });
  }
  removeFilter = (key) => {
    console.log(this.state.filters);
    let filterObj = this.state.filters;
    filterObj[key] = null;

    this.setState({ ...this.state, filters: filterObj }, () => {
      this.applyFilter(this.state.filters);
    });
  };
  fetchADO = (page, search = '', distId) => {
    if (search == 'undefined') {
      search = undefined;
    }
    if (this.props.type == 'dda_villages' && this.state.ddaInfo) {
      distId = this.state.ddaInfo.district.id;
    }
    let url = `/api/users-list/ado/?page=${page}&search=${search}`;

    if (distId) {
      url += `&district=${distId}`;
    }
    this.setState({ ...this.state, loading: true });

    axiosInstance
      .get(url)
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
    let ddaInfo = null;
    if (this.props.loginData) {
      ddaInfo = this.props.loginData;
    }
    if (sessionStorage.getItem('loginData')) {
      ddaInfo = sessionStorage.getItem('loginData');
    }
    if (localStorage.getItem('loginData')) {
      ddaInfo = localStorage.getItem('loginData');
    }
    ddaInfo = JSON.parse(ddaInfo);

    this.setState({ ...this.state, ddaInfo: ddaInfo, loading: true }, () => {
      if (this.props.type == 'dda_villages') {
        let dist = ddaInfo.district.id;
        this.fetchADO(1, this.state.search, dist);
      } else if (this.props.type == 'admin_villages') {
        this.fetchADO(1, this.state.search);
      }
      document.title = 'AFL - DDA';
    });
  }
  render() {
    return (
      <>
        <MainContent
          title=" List of ADO"
          addlink="/ado/addAdo"
          filter={() => {
            if (this.props.type == 'dda_villages') {
              return '';
            } else if (this.props.type == 'admin_villages') {
              return (
                <ADOFilter
                  applyFilters={this.applyFilter}
                  filters={this.state.filters}
                  removeFilter={this.removeFilter}></ADOFilter>
              );
            }
          }}
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
