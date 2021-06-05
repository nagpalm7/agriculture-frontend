import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, message, Modal, Button } from 'antd';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import './District.css';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';
import { axiosInstance } from '../../utils/axiosIntercepter';
import cross from '../../assets/images/cross-remove-sign.png';
import BlockInfo from './components/blockInfo';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';

const { confirm } = Modal;
let lang;
class District extends Component {
  constructor() {
    super();
    this.state = {
      search: '',
      totalCount: null,
      districtData: [],
      loading: false,
      block_data: [],
    };
  }
  columns = [
    {
      title: (
        <FormattedMessage id="districts" defaultMessage="some default one" />
      ),
      dataIndex: 'district',
      key: 'district',
    },
    {
      title: (
        <FormattedMessage
          id="district_code"
          defaultMessage="some default one"
        />
      ),
      dataIndex: 'district_code',
      key: 'district_code',
    },
    {
      title: (
        <FormattedMessage id="has_block" defaultMessage="some default one" />
      ),
      dataIndex: '',
      key: '',
      render: (district) => {
        return (
          <BlockInfo
            district_id={district.id}
            lang={lang}
            has_blocks={district.has_blocks}></BlockInfo>
        );
      },
    },
    {
      title: <FormattedMessage id="option" defaultMessage="some default one" />,
      key: 'option',
      render: (text, record) => (
        <Space size="large">
          <Link to={`/district/edit/${record.id}`}>
            <img src={edit} alt="edit" className="icons" />
          </Link>
          <img
            src={garbage}
            className="icons"
            alt="delete"
            onClick={() => this.showDeleteConfirm(record.district, record.id)}
          />
        </Space>
      ),
    },
  ];
  onSearch = (value) => {
    this.fetchDistrictList(1, value);
    this.props.history.push({
      pathname: '/district/',
      search: `?page=${1}&search=${value}`,
    });
  };
  onPageChange = (page) => {
    let search = this.props.history.location.search.split('=')[2];
    if (search == 'undefined') {
      search = undefined;
    }
    console.log(search);
    this.props.history.push({
      pathname: '/district/',
      search: `?page=${page}&search=${search}`,
    });
    this.fetchDistrictList(page, search);
    console.log(page, search);
  };
  showDeleteConfirm = (districtName, districtId) => {
    let currentPage = this.props.history.location.search.split('=')[1];
    let instance = this;
    confirm({
      title: 'Are you sure delete this district?',
      icon: <ExclamationCircleOutlined />,
      content: districtName,
      okText: 'Yes',
      okType: 'danger',
      cancelText: 'No',
      onOk() {
        axiosInstance
          .delete(`/api/district/${districtId}/`)
          .then((res) => {
            console.log(res);
            message.success('District deleted successfully');
            if (currentPage === undefined) {
              instance.fetchDistrictList(1);
            } else {
              instance.fetchDistrictList(currentPage);
            }
          })
          .catch((err) => {
            message.success('Unable to delete district');
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
  fetchBlockData = (district_id) => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`api/blocks-list/district/${district_id}/`)
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        }
      });
  };
  fetchDistrictList = (page, search = '') => {
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`/api/district/?page=${page}&search=${search}`)
      .then((res) => {
        console.log(res);
        this.setState({
          ...this.state,
          districtData: res.data,
          loading: false,
          totalCount: res.data.length,
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
    this.fetchDistrictList(this.state.search, 1);
    document.title = 'AFL - Districts';
  }
  onRowClick = (record) => {
    this.props.history.push(`/district/village/${record.id}`);
  };
  render() {
    lang=this.props.lang;
    return this.props.lang ? (
      <IntlProvider
        locale={this.props.lang}
        messages={Languages[this.props.lang]}>
        <MainContent
          lang={this.props.lang}
          title={
            <FormattedMessage
              id="district"
              defaultMessage="some default one"
              values={this.props.lang}
            />
          }
          addlink="/district/add"
          loading={this.state.loading}
          dataSource={this.state.districtData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
          onRowClick={this.onRowClick}
        />
      </IntlProvider>
    ) : (
      ''
    );
  }
}

export default District;
