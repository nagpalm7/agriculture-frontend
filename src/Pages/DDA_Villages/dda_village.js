import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, message, Modal } from 'antd';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';

const { confirm } = Modal;

class Dda_villages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      totalCount: null,
      ddaData: null,
      villageData: [],
      loading: false,
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
  onSearch = (value) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    console.log(currentPage);
    if (currentPage === undefined) {
      this.fetchVillageList(this.state.ddaData.ddaData.district.id, 1, value);
    } else {
      this.fetchVillageList(
        this.state.ddaData.ddaData.district.id,
        currentPage,
        value,
      );
    }
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${currentPage}&search=${value}`,
    });
  };
  onPageChange = (page) => {
    console.log('page = ', page);

    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(search);
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchVillageList(this.state.ddaData.district.id, page, search);
    console.log(page, search);
  };
  componentDidMount() {
    let ddaId =
      localStorage.getItem('dda_id') == null
        ? sessionStorage.getItem('dda_id')
        : localStorage.getItem('dda_id');
    console.log(ddaId);
    this.setState({ ...this.state, loading: true });
    this.fetchDetails(ddaId, 1);
  }
  fetchDetails = (ddaId, page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`api/user/${ddaId}/`)
      .then((res) => {
        this.setState({
          ...this.state,
          ddaData: res.data,
          loading: false,
        });
        if (res.data.district) {
          this.fetchVillageList(res.data.district.id, page, search);
        }
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

  fetchVillageList = (district_id, page, search = '') => {
    console.log(district_id);
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(
        `/api/villages-list/district/${district_id}?page=${page}&search=${search}`,
      )
      .then((res) => {
        console.log(res);
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
  render() {
    return (
      <>
        <MainContent
          title="Villages"
          addlink="/villages/add"
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

export default Dda_villages;
