import React, { Component } from 'react';
import { Table } from 'antd';

class TableComponent extends Component {
  render() {
    const {
      columns,
      dataSource,
      loading,
      totalPages,
      onPageChange,
    } = this.props;
    return (
      <Table
        dataSource={dataSource}
        pagination={{
          position: ['bottomCenter'],
          pageSize: '20',
          showSizeChanger: false,
          showQuickJumper: true,
          total: totalPages,
          onChange: onPageChange,
          showTotal: (total) => `Total ${total} items`,
        }}
        columns={columns}
        loading={loading}
        size="small"
        style={{ padding: '16px 24px' }}
      />
    );
  }
}

export default TableComponent;
