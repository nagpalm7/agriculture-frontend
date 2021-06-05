import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, Modal, message } from 'antd';
import './Villages.css';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined, AlertTwoTone } from '@ant-design/icons';
import VillageFilter from './VillageFilter';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';
const { confirm } = Modal;

class Villages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      totalCount: null,
      villageData: [],
      loading: false,
      ddaInfo: null,
      filters: {
        district: null,
        ado: null,
      },
    };
  }
  columns = [
    {
      title: (
        <FormattedMessage
          id="village"
          defaultMessage="some default one"
          values={this.props.lang}
        />
      ),
      dataIndex: 'village',
      key: 'name',
    },
    {
      title: (
        <FormattedMessage
          id="village_code"
          defaultMessage="some default one"
          values={this.props.lang}
        />
      ),
      dataIndex: 'village_code',
      key: 'village_code',
    },
    {
      title: (
        <FormattedMessage
          id="village_subcode"
          defaultMessage="some default one"
          values={this.props.lang}
        />
      ),
      dataIndex: 'village_subcode',
      key: 'village_subcode',
    },
    {
      title: (
        <FormattedMessage
          id="block"
          defaultMessage="some default one"
          values={this.props.lang}
        />
      ),
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: (
        <FormattedMessage
          id="ado"
          defaultMessage="some default one"
          values={this.props.lang}
        />
      ),
      dataIndex: 'ado',
      key: 'ado',
      render: (ado) => {
        return ado ? ado.user.name : '';
      },
    },
    {
      title: <FormattedMessage id="option" defaultMessage="some default one" />,
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

  onSearch = (value) => {
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${1}&search=${value}`,
    });
    const { district, ado } = this.state.filters;
    let distName, adoId;
    if (district) {
      distName = district.split('_')[0];
    }

    if (this.props.type == 'dda_villages' && this.state.ddaInfo) {
      distName = this.state.ddaInfo.district.district;
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }
    this.fetchVillageList(1, value, distName, adoId);
  };

  showDeleteConfirm = (villlageName, villageId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this village?',
      icon: <AlertTwoTone />,
      content: villlageName,
      okText: 'Yes',
      id: 'confirm_modal',
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
    const { district, ado } = this.state.filters;
    let distName, adoId;
    if (district) {
      distName = district.split('_')[0];
    }
    if (ado) {
      adoId = ado.split('_')[1];
    }

    if (this.props.type == 'dda_villages' && this.state.ddaInfo) {
      distName = this.state.ddaInfo.district.district;
    }
    this.props.history.push({
      pathname: '/villages/',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchVillageList(page, search, distName, adoId);
  };

  fetchVillageList = (page, search = '', district, ado) => {
    var url = `/api/villages-list/?page=${page}&search=${search}`;
    if (this.props.type == 'dda_villages' && this.state.ddaInfo) {
      district = this.state.ddaInfo.district.district;
    }
    if (district) {
      url = url + `&block__district__district=${district}`;
    }
    if (ado) {
      url = url + `&ado=${ado}`;
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
  applyFilter = (filters) => {
    console.log(filters);
    const { district, ado } = filters;
    let distName, distId, adoName, adoId;
    if (district) {
      distName = district.split('_')[0];
      distId = district.split('_')[1];
    }
    if (ado) {
      adoName = ado.split('_')[0];
      adoId = ado.split('_')[1];
    }

    if (district && ado) {
      message.success(`Showing villages under ${distName} and ADO ${adoName}`);
    } else if (district) {
      message.success(`Showing villages under ${distName}`);
    } else if (ado) {
      message.success(`Showing villages under ADO ${adoName}`);
    }

    this.setState({ ...this.state, filters: filters }, () => {
      this.fetchVillageList(1, '', distName, adoId);
    });
  };
  removeFilter = (key) => {
    console.log(key);
    console.log(this.state.filters);
    let filterObj = this.state.filters;
    filterObj[key] = null;

    this.setState({ ...this.state, filters: filterObj }, () => {
      this.applyFilter(this.state.filters);
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
      if (this.props.type == 'dda_villages') {
        let dist = ddaInfo.district.district;
        this.fetchVillageList(1, '', dist);
      } else if (this.props.type == 'admin_villages') {
        this.fetchVillageList(1, '');
      }
      document.title = 'AFL - Villages';
    });
  }

  render() {
    return (
      <IntlProvider
        locale={this.props.lang}
        messages={Languages[this.props.lang]}>
        <MainContent
          title={
            <FormattedMessage
              id="village"
              defaultMessage="some default one"
              values={this.props.lang}
            />
          }
          lang={this.props.lang}
          addlink="/villages/add"
          filter={() => {
            return (
              <VillageFilter
                type={this.props.type}
                applyFilters={this.applyFilter}
                filters={this.state.filters}
                removeFilter={this.removeFilter}></VillageFilter>
            );
          }}
          loading={this.state.loading}
          dataSource={this.state.villageData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        />
      </IntlProvider>
    );
  }
}

export default Villages;
