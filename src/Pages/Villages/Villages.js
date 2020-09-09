import React, { Component } from 'react';
import { PageHeader, Button, Input, Space } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './Villages.css';
import axios from 'axios';
import TableComponent from '../../Components/TableComponent/TableComponent';

const { Search } = Input;

const columns = [
  {
    title: 'VILLAGES',
    dataIndex: 'village',
    key: 'name',
  },
  {
    title: 'OPTIONS',
    key: 'operation',
    render: (text, record) => (
      <Space size="large">
        <a>
          <img src={edit} className="icons" />
        </a>
        <a>
          <img src={garbage} className="icons" />
        </a>
      </Space>
    ),
  },
];

class Villages extends Component {
  constructor() {
    super();
    this.state = {
      villageData: [],
      loading: false,
    };
  }
  token = localStorage.getItem('Token') || sessionStorage.getItem('Token');
  config = {
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      Authorization: `Token ${this.token}`,
    },
  };

  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    axios
      .get('https://api.aflmonitoring.com/api/villages-list', this.config)
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          villageData: res.data.results,
          loading: false,
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
  }

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title="Villages"
          subTitle=""
          style={{ borderRadius: '20px' }}
          extra={[
            <Button
              key="1"
              shape="round"
              className="add-btn-style"
              style={{
                color: '#fff',
                backgroundColor: '#3d0098',
                border: '1px solid #3d0098',
              }}>
              Add
            </Button>,
            <Button
              key="2"
              shape="round"
              className="add-btn-style"
              style={{
                color: '#fff',
                backgroundColor: '#3d0098',
                border: '1px solid #3d0098',
              }}>
              Add Bulk
            </Button>,
            <Search
              placeholder="Search"
              onSearch={(value) => console.log(value)}
              className="search-bar-style"
              style={{ width: 200, color: '#000' }}
            />,
          ]}
        />
        <TableComponent
          loading={this.state.loading}
          dataSource={this.state.villageData}
          columns={columns}
        />
      </>
    );
  }
}

export default Villages;
