import React, { Component } from 'react';
import { PageHeader, Button, Input, Table, Space } from 'antd';
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
            <Table
              pagination={{ position: ['bottomCenter'] }}
              columns={columns}
              size="small"
            />
          </PageHeader>
        </div>
      </>
    );
  }
}

export default District;
