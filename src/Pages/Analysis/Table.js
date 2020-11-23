import React, { Component } from 'react';
import { Table, Spin } from 'antd';
import TableComponent from '../../Components/TableComponent/TableComponent';

const columns = [
  {
    title: 'District',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: 'Pending',
    dataIndex: 'pending',
    key: 'pending',
  },
  {
    title: 'Ongoing',
    dataIndex: 'ongoing',
    key: 'ongoing',
  },
  {
    title: 'Completed',
    dataIndex: 'completed',
    key: 'completed',
  },
];

class AnalysisTableComponent extends Component {
  constructor(props) {
    super(props);
  }
  refactorDistrictData = (rec) => {
    const data = [];
    console.log(rec);
    for (var val in rec) {
      if (rec.hasOwnProperty(val)) {
        data.push({
          name: val,
          pending: rec[val].pending,
          ongoing: rec[val].ongoing,
          completed: rec[val].completed,
        });
      }
    }
    return data;
  };
  render() {
    return (
      <Spin spinning={this.props.loading}>
        <TableComponent
          loading={this.props.loading}
          dataSource={this.refactorDistrictData(this.props.data)}
          columns={columns}
        />
      </Spin>
    );
  }
}

export default AnalysisTableComponent;
