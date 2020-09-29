import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { Tooltip } from 'antd';
class Completed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      locationsData: [],
      loading: false,
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
        let tooltipText = '';
        if (dda) {
          tooltipText = () => {
            return (
              <>
                <div className="tooltip-text">
                  Usename : {dda.user.name}
                  <br></br>
                  Email : {dda.user.email}
                  <br></br>
                  District :{' '}
                  {dda.district.district ? dda.district.district : 'null'}
                  <br></br>
                  State : {dda.district.state.state}
                </div>
              </>
            );
          };
        }
        return (
          <Tooltip placement="bottom" title={tooltipText}>
            <span>{dda ? dda.user.username : 'No Data'}</span>
          </Tooltip>
        );
      },
    },
    {
      title: 'ADO',
      dataIndex: 'ado',
      key: 'ado',
      render: (ado) => {
        let tooltipText = '';
        if (ado) {
          tooltipText = () => {
            return (
              <>
                <div className="tooltip-text">
                  Usename : {ado.user.name}
                  <br></br>
                  Email : {ado.user.email}
                  <br></br>
                  State : {ado.user.state ? ado.user.state.state : 'null'}
                </div>
              </>
            );
          };
        }
        return (
          <Tooltip placement="bottom" title={tooltipText}>
            <span>{ado ? ado.user.username : 'No Data'}</span>
          </Tooltip>
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
    },
  ];
  fetchLocations = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/locations/completed?page=${page}&search=${search}`)
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
  onPageChange = (page) => {
    console.log('page = ', page);
    this.props.history.push({
      pathname: '/locations/pending/',
      search: `?page=${page}`,
    });
    this.fetchLocations(page, this.state.search);
  };
  onSearch = (value) => {
    this.setState({ ...this.state, search: value });
    let currentPage = this.props.history.location.search.split('=')[1];
    if (currentPage === undefined) {
      this.fetchLocations(1, value);
    } else {
      this.fetchLocations(currentPage, value);
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
          title="Completed Locations"
          addlink="/locations/add"
          loading={this.state.loading}
          dataSource={this.state.locationsData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        />
      </>
    );
  }
}

export default Completed;
