import React, { Component } from 'react';
import { Table } from 'antd';

class TableComponent extends Component {
  render() {
    const { columns, dataSource, loading } = this.props;
    console.log(dataSource);
    return (
      <Table
        dataSource={dataSource}
        pagination={{ position: ['bottomCenter'] }}
        columns={columns}
        loading={loading}
        size="small"></Table>
    );
  }
}

export default TableComponent;
