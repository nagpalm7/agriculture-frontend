import React from 'react';
import { PageHeader, Table, Space, Button, Input } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';

const { Search } = Input;

const columns = [
  {
    title: 'DDA',
    dataIndex: 'dda',
    key: 'dda',
  },
  {
    title: 'ADO',
    dataIndex: 'ado',
    key: 'ado',
  },
  {
    title: 'VILLAGES',
    dataIndex: 'villages',
    key: 'villages',
  },
  {
    title: 'PHONE',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'EMAIL',
    key: 'email',
    dataIndex: 'email',
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
    dda: 'village name',
    ado: 'village name',
    villages: 'village name',
    phone: 1111111111,
    email: 'village name',
  },
  {
    key: '2',
    dda: 'village name',
    ado: 'village name',
    villages: 'village name',
    phone: 1111111111,
    email: 'village name',
  },
  {
    key: '3',
    dda: 'village name',
    ado: 'village name',
    villages: 'village name',
    phone: 1111111111,
    email: 'village name',
  },
  {
    key: '4',
    dda: 'village name',
    ado: 'village name',
    villages: 'village name',
    phone: 1111111111,
    email: 'village name',
  },
  {
    key: '5',
    dda: 'village name',
    ado: 'village name',
    villages: 'village name',
    phone: 1111111111,
    email: 'village name',
  },
  {
    key: '6',
    dda: 'village name',
    ado: 'village name',
    villages: 'village name',
    phone: 1111111111,
    email: 'village name',
  },
];

const ADO = () => {
  return (
    <>
      <div className="site-page-header-ghost-wrapper">
        <PageHeader
          ghost={false}
          title="List of ADO"
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
            dataSource={data}
            size="small"
          />
        </PageHeader>
      </div>
    </>
  );
};

export default ADO;
