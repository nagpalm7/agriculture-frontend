import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Modal, message } from 'antd';
import './Villages.css';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import {
  ExclamationCircleOutlined,
  DeleteFilled,
  AlertTwoTone,
} from '@ant-design/icons';
import VillageFilter from './VillageFilter';
const { confirm } = Modal;

class ADO_Villages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: null,
      villageData: [],
      loading: false,
      adoInfo: null,
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
            {/*<Link to={`/villages/edit/${record.id}`}>
              <img src={edit} alt="edit" className="icons" />
        </Link>*/}
            <img
              src={garbage}
              className="icons"
              alt="delete"
              onClick={() => this.showDeleteConfirm(record.village, record.id)}
            />
          </Space>
        );
      }
    },
  ];

  onSearch = (value) => {
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${1}&search=${value}`,
    });
    this.fetchVillageList(1, value);
  };

  showDeleteConfirm = (villlageName, villageId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this village?',
      icon: <AlertTwoTone />,
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
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchVillageList(page, search);
  };

  fetchVillageList = (page, search = '') => {
    var url = `/api/villages-list/?page=${page}&search=${search}`;
    if (this.state.adoInfo) {
      url = url + `&ado=${this.state.adoInfo.id}`;
    }
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
    this.setState({ ...this.state, adoInfo: adoInfo }, () => {
      this.fetchVillageList(1, '');
      document.title = 'AFL-Villages';
    });
  }

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

export default ADO_Villages;
