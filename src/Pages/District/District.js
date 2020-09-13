import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './District.css';
import MainContent from '../../Components/MainContent/MainContent';

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
        <Link to="/district/edit">
          <img src={edit} className="icons" />
        </Link>
        <img src={garbage} className="icons" />
      </Space>
    ),
  },
];
class District extends Component {
  constructor() {
    super();
    this.state = {
      districtData: [],
      loading: false,
    };
  }

  render() {
    return (
      <>
        <MainContent
          title="Villages"
          addlink="/district/add"
          loading={this.state.loading}
          dataSource={this.state.districtData}
          columns={columns}
        />
      </>
    );
  }
}

export default District;
