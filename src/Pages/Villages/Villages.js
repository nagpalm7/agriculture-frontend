import React, { Component } from 'react';
import { PageHeader, Button, Input, Space } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './Villages.css';
import TableComponent from '../../Components/TableComponent/TableComponent';
import { Link } from 'react-router-dom';
import { axiosInstance } from '../../utils/axiosIntercepter';

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
    render: (text, record) => {
      console.log(record);
      return (
        <Space size="large">
          <Link to={`villages/edit/${record.id}`}>
            <img src={edit} alt="" className="icons" />
          </Link>
          <img src={garbage} alt="" className="icons" />
        </Space>
      );
    },
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

  componentDidMount() {
    this.setState({ ...this.state, loading: true });

    axiosInstance
      .get('/api/villages-list')
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
            <Link to="/villages/add">
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
              </Button>
            </Link>,
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
