import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Tooltip, Button, Space, Modal, message } from 'antd';
import pencil from '../../assets/images/edit.png';
import delete_logo from '../../assets/images/trash-can.png';
import cloud_logo from '../../assets/images/uploadCloud.png';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import DDALocFilter from './dda_location_filter.js';
import '../../Pages/Locations/location.css';
import { Link } from 'react-router-dom';
const { confirm } = Modal;

class DDA_Ongoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      locationsData: [],
      loading: false,
      ddaInfo: null,
      filters: {
        village: null,
        ado: null,
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
        return <span>{vill ? vill.village : ''}</span>;
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
        return (
          <span>{ado ? ado.user.name : 'No Data'}</span>
        );
      },
    },
    {
      title: 'DATE',
      dataIndex: 'acq_date',
      key: 'acq_date',
    },
    {
      title: 'STATUS',
      dataIndex: 'id',
      key: 'id',
      render: (loc_id) => {
        return (
          <Link to={`/locations/ongoing/${loc_id}`}>
            <Button
              style={{
                backgroundColor: 'rgb(245, 243, 255)',
                borderRadius: '15px',
                color: 'red',
                textAlign: 'center',
                border: '0px',
              }}
              className="upload_button">
              <img src={cloud_logo} />
              View Report
            </Button>
          </Link>
        );
      },
    },
  ];
  onSearch = (value) => {
    const { assignment, village, ado } = this.state.filters;
    let villName, adoId;

    if (village) {
      villName = village;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }

    this.props.history.push({
      pathname: '/locations/pending',
      search: `?page=${1}&search=${value}`,
    });
    this.fetchLocations(1, value, villName, adoId, assignment);
  };
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

  onPageChange = (page) => {
    console.log('page = ', page);
    const { assignment, village, ado } = this.state.filters;
    let villName, adoId;
    if (village) {
      villName = village;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(search);
    this.props.history.push({
      pathname: '/locations/pending',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchLocations(page, search, villName, adoId, assignment);
  };

  fetchLocations = (page, search = '', villName, adoId, assign) => {
    let url = `/api/locations/dda/ongoing?page=${page}&search=${search}`;

    if (villName) {
      url += `&village_name__village=${villName}`;
    }
    if (adoId) {
      url += `&ado=${adoId}`;
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
  removeFilter = (key) => {
    console.log(this.state.filters);
    let filterObj = this.state.filters;
    filterObj[key] = null;

    this.setState({ ...this.state, filters: filterObj }, () => {
      this.applyFilter(this.state.filters);
    });
  };
  applyFilter = (filters) => {
    console.log(filters);
    const { assignment, village, ado } = filters;
    let distName, villName, ddaId, adoId;
    if (village) {
      villName = village;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }
    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchLocations(1, '', villName, adoId, assignment);
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
    console.log(ddaInfo);
    this.setState({ ...this.state, ddaInfo: ddaInfo, loading: true }, () => {
      this.fetchLocations(1, this.state.search);
    });
  }

  render() {
    return (
      <>
        <MainContent
          title="Pending Locations"
          addlink="/locations/add"
          loading={this.state.loading}
          dataSource={this.state.locationsData}
          columns={this.columns}
          filter={() => {
            if (this.state.ddaInfo) {
              return (
                <DDALocFilter
                  applyFilters={this.applyFilter}
                  filters={this.state.filters}
                  removeFilter={this.removeFilter}
                  status="Pending"
                  type="ongoing_loc"
                  ddaInfo={this.state.ddaInfo}></DDALocFilter>
              );
            }
          }}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
          isLocation="true"
        />
      </>
    );
  }
}

export default DDA_Ongoing;
