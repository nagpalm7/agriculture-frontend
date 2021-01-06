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
        onRow={(record, rowIndex) => {
          return {
            onDoubleClick: (event) => {
              console.log(record);
              if (this.props.onRowClick) {
                this.props.onRowClick(record);
              }
            },
          };
        }}
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
        style={{ padding: '16px 24px', overflowX: 'scroll' }}
      />
    );
  }
}

export default TableComponent;
