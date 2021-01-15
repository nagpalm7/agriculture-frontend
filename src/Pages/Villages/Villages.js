import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Modal, message } from 'antd';
import './Villages.css';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import VillageFilter from './VillageFilter';
const { confirm } = Modal;

class Villages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: null,
      villageData: [],
      loading: false,
      filters: null,
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
      render: (ado) => {
        return ado ? ado.user.name : '';
      },
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
    if (this.state.filters) {
      var distId = this.state.filters.district.split(' ')[1];

      this.props.history.push({
        pathname: '/villages/',
        search: `?page=${1}&search=${value}`,
      });
      this.fetchVillageList(1, value, distId);
    } else {
      this.props.history.push({
        pathname: '/villages/',
        search: `?page=${1}&search=${value}`,
      });
      this.fetchVillageList(1, value, null);
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
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(this.state.filters);
    if (this.state.filters) {
      var distId = this.state.filters.district.split(' ')[1];
      this.props.history.push({
        pathname: `/villages/`,
        search: `?page=${page}&search=${search}`,
      });
      this.fetchVillageList(page, search, distId);
    } else {
      console.log(search);
      this.props.history.push({
        pathname: '/villages/',
        search: `?page=${page}&search=${search}`,
      });
      this.fetchVillageList(page, search);
      console.log(page, search, null);
    }
  };

  fetchVillageList = (page, search = '', district) => {
    var url = district
      ? `/api/villages-list/district/${district}/?page=${page}&search=${search}`
      : `/api/villages-list/?page=${page}&search=${search}`;
    console.log(page);
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(url)
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
  applyFilter = (filters) => {
    console.log(filters);
    const { district } = filters;
    const distName = district.split(' ')[0];
    const distId = district.split(' ')[1];
    message.success(`Showing villages under ${distName}`);
    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchVillageList(1, '', distId);
    });
  };
  removeFilter = () => {
    this.setState({ ...this.state, filters: null }, () => {
      this.fetchVillageList(1, '', null);
    });
  };
  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.fetchVillageList(1, '');
  }

  render() {
    return (
      <>
        <MainContent
          title="Villages"
          addlink="/villages/add"
          filter={() => {
            return (
              <VillageFilter
                applyFilters={this.applyFilter}
                filters={this.state.filters}
                removeFilter={this.removeFilter}></VillageFilter>
            );
          }}
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
