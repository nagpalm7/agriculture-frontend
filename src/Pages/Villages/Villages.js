import React, { Component } from 'react';
import { PageHeader, Button, Input, Table, Space } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './Villages.css';

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
      data: [],
    };
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title="Villages"
          subTitle=""
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
              style={{ width: 200 }}
            />,
          ]}
        />
        <Table
          pagination={{ position: ['bottomCenter'] }}
          columns={columns}
          size="small"
        />
      </>
    );
  }
}

export default Villages;
