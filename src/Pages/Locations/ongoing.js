import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Tooltip, Button, message } from 'antd';
import cloud_logo from '../../assets/images/uploadCloud.png';
import './location.css';
import { Link } from 'react-router-dom';
import LocationFilter from './LocationFilter';
class Ongoing extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      locationsData: [],
      loading: false,
      filters: {
        village: null,
        dda: null,
        ado: null,
        district: null,
      },
    };
  }
  applyFilter = (filters) => {
    console.log(filters);
    const { district, village, dda, Ado } = filters;
    let distName, assign, villName, ddaId, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (village) {
      villName = village;
    }
    if (Ado) {
      adoId = Ado.split('_')[1];
    }
    if (dda) {
      ddaId = dda.split('_')[1];
    }
    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchLocations(1, '', distName, villName, ddaId, adoId);
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
  fetchLocations = (page, search = '', distName, villageName, ddaId, adoId) => {
    console.log(distName, villageName, ddaId, adoId);
    var url = `/api/locations/ongoing?page=${page}&search=${search}`;

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
  removeFilter = () => {
    this.setState({ ...this.state, filters: null }, () => {
      this.fetchLocations(1, '', null, null);
    });
  };
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
        console.log(dda);
        // let tooltipText = '';
        // if (dda) {
        //   tooltipText = () => {
        //     return (
        //       <>
        //         <div className="tooltip-text">
        //           Name : {dda.user.name}
        //           <br></br>
        //           Email : {dda.user.email}
        //           <br></br>
        //           District :{' '}
        //           {dda.district.district ? dda.district.district : 'null'}
        //           <br></br>
        //           State : {dda.district.state.state}
        //         </div>
        //       </>
        //     );
        //   };
        // }
        return (
          // <Tooltip placement="bottom" title={tooltipText}>
          <span>{dda ? dda.user.name : 'No Data'}</span>
          // </Tooltip>
        );
      },
    },
    {
      title: 'ADO',
      dataIndex: 'ado',
      key: 'ado',
      render: (ado) => {
        // let tooltipText = '';
        // if (ado) {
        //   tooltipText = () => {
        //     return (
        //       <>
        //         <div className="tooltip-text">
        //           Name : {ado.user.name}
        //           <br></br>
        //           Email : {ado.user.email}
        //           <br></br>
        //           State : {ado.user.state ? ado.user.state.state : 'null'}
        //         </div>
        //       </>
        //     );
        //   };
        // }
        return (
          // <Tooltip placement="bottom" title={tooltipText}>
          <span>{ado ? ado.user.name : 'No Data'}</span>
          // </Tooltip>
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
  onPageChange = (page) => {
    console.log('page = ', page);
    const { district, village, dda, Ado } = this.state.filters;
    let distName, villName, ddaId, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (village) {
      villName = village;
    }
    if (Ado) {
      adoId = Ado.split('_')[1];
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
      pathname: '/locations/ongoing',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchLocations(page, search, distName, villName, adoId, ddaId);
  };

  onSearch = (value) => {
    const { district, village, dda, Ado } = this.state.filters;
    let distName, villName, ddaId, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (village) {
      villName = village;
    }
    if (Ado) {
      adoId = Ado.split('_')[1];
    }
    if (dda) {
      ddaId = dda.split('_')[1];
    }

    this.props.history.push({
      pathname: '/locations/ongoing',
      search: `?page=${1}&search=${value}`,
    });
    this.fetchLocations(1, value, distName, villName, adoId, ddaId);
  };
  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.fetchLocations(1, this.state.search);
    document.title = 'AFL - Ongoing Locations';
  }
  render() {
    return (
      <>
        <MainContent
          title="Ongoing Locations"
          addlink="/locations/add"
          loading={this.state.loading}
          dataSource={this.state.locationsData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
          isLocation="true"
          filter={() => {
            return (
              <LocationFilter
                applyFilters={this.applyFilter}
                filters={this.state.filters}
                removeFilter={this.removeFilter}
                status="Ongoing"></LocationFilter>
            );
          }}
          locStatus="Ongoing"
        />
      </>
    );
  }
}

export default Ongoing;
