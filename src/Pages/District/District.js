import React, { Component } from 'react';
import { PageHeader, Button, Input, Table, Tag, Space } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './District.css';

const { Search } = Input;

const columns = [
  {
    title: 'DISTRICTS',
    dataIndex: 'district',
    key: 'name',
  },
  {
    title: 'OPTIONS',
    key: 'option',
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

const data = [
  {
    key: '1',
    district: 'village name',
  },
  {
    key: '2',
    district: 'village name',
  },
  {
    key: '3',
    district: 'village name',
  },
  {
    key: '4',
    district: 'village name',
  },
  {
    key: '5',
    district: 'village name',
  },
  {
    key: '6',
    district: 'village name',
  },
  {
    key: '7',
    district: 'village name',
  },
  {
    key: '8',
    district: 'village name',
  },
];

class District extends Component {
  render() {
    return (
      <>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title="District"
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

export default District;
