import React from 'react';
import { Table } from 'antd';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Pending',
    dataIndex: 'pending',
    key: 'pending',
  },
  {
    title: 'ongoing',
    dataIndex: 'ongoing',
    key: 'ongoing',
  },
  {
    title: 'completed',
    dataIndex: 'completed',
    key: 'completed',
  },
];

const TableComponent = (props) => {
  console.log(props.data);
  return (
    <Table
      dataSource={props.data}
      columns={columns}
      size="small"
      pagination={false}
      scroll={{ y: 300 }}
    />
  );
};

export default TableComponent;
