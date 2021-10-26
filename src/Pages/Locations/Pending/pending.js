import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Modal, message } from 'antd';
import '../location.css';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MainContent from '../../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import pencil from '../../../assets/images/edit.png';
import delete_logo from '../../../assets/images/trash-can.png';
import LocationFilter from '../LocationFilter';
const { confirm } = Modal;

class Pending extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      totalCount: null,
      locationsData: [],
      loading: false,
      ddaInfo: null,
      filters: {
        village: null,
        dda: null,
        ado: null,
        district: null,
        assignment: null,
      },
    };
  }
  columns = [
    
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'Village',
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
        return <span>{ado ? ado.user.name : 'No Data'}</span>;
      },
    },
    {
      title: 'Date',
      dataIndex: 'acq_date',
      key: 'acq_date',
    },
    {
      title: 'Edit',
      key: 'operation',
      render: (text, record) => {
        return (
          <Space size="large">
            <Link to={`/locations/pending/edit/${record.id}`}>
              <img src={pencil} alt="edit" className="icons" />
            </Link>
           
          </Space>
        );
      },
    },
  ];

  onSearch = (value) => {
    const { district, assignment, village, dda, ado } = this.state.filters;
    let distName, assign, villName, ddaId, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (village) {
      villName = village;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }
    if (dda) {
      ddaId = dda.split('_')[1];
    }

    this.props.history.push({
      pathname: '/locations/pending',
      search: `?page=${1}&search=${value}`,
    });
    this.fetchLocations(1, value, distName, villName, ddaId, adoId, assignment);
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
    const { district, assignment, village, dda, ado } = this.state.filters;
    let distName, villName, ddaId, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (village) {
      villName = village;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }
    if (dda) {
      ddaId = dda.split('_')[1];
    }
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(this.state.filters);

    this.props.history.push({
      pathname: '/locations/pending',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchLocations(
      page,
      search,
      distName,
      villName,
      ddaId,
      adoId,
      assignment,
    );
  };

  fetchLocations = (
    page,
    search = '',
    distName,
    villageName,
    ddaId,
    adoId,
    assign,
  ) => {
    console.log(distName, villageName, ddaId, adoId, assign);
    console.log(this.state.ddaInfo);
    var url = `/api/locations/pending?page=${page}&search=${search}`;
    if (assign == 'a') {
      url = `/api/locations/pending?page=${page}&search=${search}`;
    } else if (assign == 'b') {
      url = `/api/locations/assigned?page=${page}&search=${search}`;
    } else if (assign == 'c') {
      url = `/api/locations/unassigned?page=${page}&search=${search}`;
    }

    if (distName) {
      url += `&district__district=${distName}`;
    }
    if (villageName) {
      url += `&village_name__village=${villageName}`;
    }
    if (ddaId) {
      url += `&dda=${ddaId}`;
    }
    if (adoId) {
      url += `&ado=${adoId}`;
    }

    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(url)
      .then((res) => {
        console.log(res.data);
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
    this.setState({ ...this.state, loading: true }, () => {
      this.fetchLocations(1, this.state.search, null, null, null, null, null);
      document.title = 'AFL - Pending Locations';
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
  applyFilter = (filters) => {
    const { district, assignment, village, dda, ado } = filters;
    let distName, villName, ddaId, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (village) {
      villName = village;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }
    if (dda) {
      ddaId = dda.split('_')[1];
    }
    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchLocations(1, '', distName, villName, ddaId, adoId, assignment);
    });
  };
  render() {
    return (
      <>
        <MainContent
          title="Pending Locations"
          addlink="/locations/add"
          loading={this.state.loading}
          filter={() => {
            return (
              <LocationFilter
                applyFilters={this.applyFilter}
                filters={this.state.filters}
                removeFilter={this.removeFilter}
                status="Pending"></LocationFilter>
            );
          }}
          dataSource={this.state.locationsData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
          isLocation="true"
          locStatus="Pending"
        />
      </>
    );
  }
}

export default Pending;
