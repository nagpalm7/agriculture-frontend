import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent.js';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { Space, Modal, message } from 'antd';
import { Link } from 'react-router-dom';
import { ExclamationCircleOutlined } from '@ant-design/icons';
const { confirm } = Modal;

class villageUnderDistrict extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      villageData: [],
      totalCount: null,
      districtName: null,
      distId: null,
    };
  }
  fetchVillages(page, search = '') {
    const villageId = this.state.distId;

    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(
        `api/villages-list/district/${villageId}/?page=${page}&search=${search}`,
      )
      .then((res) => {
        this.setState({
          loading: false,
          districtName: res.data.results[0].district,
          totalCount: res.data.count,
          villageData: res.data.results,
        });
      })
      .catch((err) => {
        this.setState({
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
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
    let search = this.props.history.location.search.split('/')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(search);
    this.props.history.push({
      pathname: `/district/village/${this.state.distId}`,
      search: `?page=${page}&search=${search}`,
    });
    this.fetchVillages(page, search);
    console.log(page, search);
  };
  onSearch = (value) => {
    this.fetchVillages(1, value);
    this.props.history.push({
      pathname: '/district/village/${this.state.distId}',
      search: `?page=${1}&search=${value}`,
    });
  };
  componentDidMount() {
    const distId = this.props.history.location.pathname.split('/')[3];
    this.setState({ ...this.state, loading: true, distId: distId }, () => {
      this.fetchVillages(1, '');
    });
  }
  render() {
    return (
      <>
        <MainContent
          title={`Villages (${this.state.districtName})`}
          isVillageUnderDistrict={true}
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
export default villageUnderDistrict;
