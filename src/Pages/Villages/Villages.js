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
        <a href="">
          <img src={edit} alt="edit" className="icons" />
        </a>
        <a href="">
          <img src={garbage} alt="delete" className="icons" />
        </a>
      </Space>
    ),
  },
];

const data = [
  {
    key: '1',
    village: 'village name',
  },
  {
    key: '2',
    village: 'village name',
  },
  {
    key: '3',
    village: 'village name',
  },
  {
    key: '4',
    village: 'village name',
  },
  {
    key: '5',
    village: 'village name',
  },
  {
    key: '6',
    village: 'village name',
  },
  {
    key: '7',
    village: 'village name',
  },
  {
    key: '8',
    village: 'village name',
  },
];

class Villages extends Component {
  render() {
    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title="Villages"
            subTitle=""
            extra={[
              <Button key="1" shape="round">
                Add
              </Button>,
              <Button key="2" shape="round">
                Add Bulk
              </Button>,
              <Search
                placeholder="Search"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
              />,
            ]}>
            <Table columns={columns} dataSource={data} size="small" />
          </PageHeader>
        </div>
      </>
    );
  }
}

export default Villages;
