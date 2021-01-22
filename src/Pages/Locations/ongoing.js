import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Tooltip, Button, message } from 'antd';
import cloud_logo from '../../assets/images/cloud-computing.png';
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
      filters: null,
    };
  }
  applyFilter = (filters) => {
    console.log(filters);
    const { district, assignment } = filters;
    console.log(assignment);
    const distName = district.split('_')[0];
    const distId = district.split('_')[1];
    const assign = assignment ? 'assigned' : 'unassigned';
    message.success(`Showing Ongoing locations under ${distName}`);
    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchLocations(1, '', distId);
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
      dataIndex: 'district',
      key: 'block',
    },
    {
      title: 'VILLAGE',
      dataIndex: 'village_name',
      key: 'village_name',
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
      render: () => {
        return (
          <Link to="/locations/ongoing/1601">
            <Button
              style={{
                backgroundColor: '#e03b3b',
                borderRadius: '15px',
                color: 'white',
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
  fetchLocations = (page, search = '', distId) => {
    var url;
    if (distId) {
      url = `/api/location/district/${distId}/ongoing?page=${page}&search=${search}`;
    } else {
      url = `/api/locations/ongoing?page=${page}&search=${search}`;
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
  onPageChange = (page) => {
    console.log('page = ', page);

    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(search);
    if (this.state.filters) {
      var distId = this.state.filters.district.split('_')[1];
      this.props.history.push({
        pathname: '/locations/ongoing',
        search: `?page=${page}&search=${search}`,
      });
      this.fetchLocations(page, search, distId);
    } else {
      this.props.history.push({
        pathname: '/locations/ongoing',
        search: `?page=${page}&search=${search}`,
      });
      this.fetchLocations(page, search, null);
    }
    this.props.history.push({
      pathname: '/locations/ongoing',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchLocations(page, search);
    console.log(page, search);
  };
  onSearch = (value) => {
    if (this.state.filters) {
      var distId = this.state.filters.district.split('_')[1];
      this.props.history.push({
        pathname: '/locations/ongoing',
        search: `?page=${1}&search=${value}`,
      });
      this.fetchLocations(1, value, distId);
    } else {
      this.props.history.push({
        pathname: '/locations/ongoing',
        search: `?page=${1}&search=${value}`,
      });
      this.fetchLocations(1, value, null);
    }
  };
  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.fetchLocations(1, this.state.search);
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
