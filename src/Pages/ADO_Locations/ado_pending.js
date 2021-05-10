import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Tooltip, Button, Space, Modal, message } from 'antd';
import pencil from '../../assets/images/edit.png';
import delete_logo from '../../assets/images/trash-can.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
// import AdoLocFilter from './dda_location_filter.js';
import '../../Pages/Locations/location.css';
import { Link } from 'react-router-dom';
const { confirm } = Modal;

class AdoPending extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      locationsData: [],
      loading: false,
      adoInfo: null,
      filters: {
        village: null,
        assignment: null,
      },
    };
  }
  columns = [
    {
      title: 'STATE',
      dataIndex: 'state',
      key: 'state',
    },
    {
      title: 'BLOCK',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'VILLAGE',
      dataIndex: 'village_name',
      key: 'village_name',
      render: (vill) => {
        return vill ? <span>{vill.village}</span> : '';
      },
    },
    {
      title: 'DDA',
      dataIndex: 'dda',
      key: 'dda',
      render: (dda) => {
        return <span>{dda ? dda.user.name : 'No Data'}</span>;
      },
    },
    {
      title: 'ADO',
      dataIndex: 'ado',
      key: 'ado',
      render: (ado) => {
        return <span>{ado ? ado.user.name : 'No Data'}</span>;
      },
    },
    {
      title: 'DATE',
      dataIndex: 'acq_date',
      key: 'acq_date',
    },
    {
      title: 'OPTIONS',
      key: 'operation',
      render: (text, record) => {
        return (
          <Space size="large">
            <Link to={`/locations/pending/edit/${record.id}`}>
              <img src={pencil} alt="edit" className="icons" />
            </Link>
            <img
              src={delete_logo}
              className="icons"
              alt="delete"
              onClick={() => this.showDeleteConfirm(record.village, record.id)}
            />
          </Space>
        );
      },
    },
  ];
  showDeleteConfirm = (villlageName, locationId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this location?',
      icon: <ExclamationCircleOutlined />,
      content: villlageName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        console.log('OK');
        axiosInstance
          .delete(`/api/location/${locationId}/`)
          .then((res) => {
            console.log(res);
            message.success('Location deleted successfully');
            if (currentPage === undefined) {
              instance.fetchLocations(1);
            } else {
              instance.fetchLocations(currentPage);
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
  fetchLocations = (page, search = '', villName, adoId, assign) => {
    let url = `/api/locations/ado/pending?page=${page}&search=${search}`;
    if (villName) {
      url += `&village_name__village=${villName}`;
    }
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(url)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          locationsData: res.data.results,
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
    let adoInfo = null;
    if (this.props.loginData) {
      adoInfo = this.props.loginData;
    }
    if (sessionStorage.getItem('loginData')) {
      adoInfo = sessionStorage.getItem('loginData');
    }
    if (localStorage.getItem('loginData')) {
      adoInfo = localStorage.getItem('loginData');
    }
    adoInfo = JSON.parse(adoInfo);
    console.log(adoInfo);
    this.setState({ ...this.state, adoInfo: adoInfo, loading: true }, () => {
      this.fetchLocations(1, this.state.search);
    });
    document.title = 'AFL-Pending';
  }
  onPageChange = (page) => {
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(search);
    this.props.history.push({
      pathname: '/locations/pending',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchLocations(page, search);
  };
  onSearch = (value) => {
    this.props.history.push({
      pathname: '/locations/pending',
      search: `?page=${1}&search=${value}`,
    });
    this.fetchLocations(1, value);
  };
  render() {
    return (
      <MainContent
        title="Pending Locations"
        addlink="/locations/add"
        loading={this.state.loading}
        dataSource={this.state.locationsData}
        columns={this.columns}
        //   filter={() => {
        //     if (this.state.ddaInfo) {
        //       return (
        //         <DDALocFilter
        //           applyFilters={this.applyFilter}
        //           filters={this.state.filters}
        //           removeFilter={this.removeFilter}
        //           status="Pending"
        //           type="pending_loc"
        //           ddaInfo={this.state.ddaInfo}></DDALocFilter>
        //       );
        //     }
        //   }}
        totalPages={this.state.totalCount}
        onPageChange={this.onPageChange}
        onSearch={this.onSearch}
        isLocation="true"
      />
    );
  }
}
export default AdoPending;
