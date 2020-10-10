import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Modal, message } from 'antd';
import './location.css';
import edit from '../../assets/images/edit.svg';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import pencil from '../../assets/images/edit.png';
import delete_logo from '../../assets/images/trash-can.png';
const { confirm } = Modal;

class Pending extends Component {
  constructor() {
    super();
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
      dataIndex: 'block',
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
          //</Tooltip>
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

  onSearch = (value) => {
    this.setState({ ...this.state, search: value });
    let currentPage = this.props.history.location.search.split('=')[1];
    if (currentPage === undefined) {
      this.fetchLocations(1, value);
    } else {
      this.fetchLocations(currentPage, value);
    }
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
    this.props.history.push({
      pathname: '/locations/pending/',
      search: `?page=${page}`,
    });
    this.fetchLocations(page, this.state.search);
  };

  fetchLocations = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/locations/pending?page=${page}&search=${search}`)
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
    this.setState({ ...this.state, loading: true });
    this.fetchLocations(1, this.state.search);
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
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
          isLocation="true"
        />
      </>
    );
  }
}

export default Pending;
