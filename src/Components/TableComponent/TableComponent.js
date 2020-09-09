import React, { Component } from 'react';
import { Table } from 'antd';

class TableComponent extends Component {
  render() {
    const { columns, dataSource, loading } = this.props;
    return (
      <Table
        dataSource={dataSource}
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        loading={loading}
        size="small"
        style={{ padding: '16px 24px' }}
      />
    );
  }
}

export default TableComponent;
