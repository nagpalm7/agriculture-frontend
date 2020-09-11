import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent/TableComponent';
import { PageHeader, Button, Input } from 'antd';
import './MainContent.css';

const { Search } = Input;

class MainContent extends Component {
  render() {
    return (
      <>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title={this.props.title}
          subTitle=""
          style={{ borderRadius: '20px' }}
          extra={[
            <Link to={this.props.addlink}>
              <Button
                key="1"
                shape="round"
                className="add-btn-style"
                style={{
                  color: '#fff',
                  backgroundColor: '#3d0098',
                  border: '1px solid #3d0098',
                }}>
                Add
              </Button>
            </Link>,
            <Button
              key="2"
              shape="round"
              className="add-btn-style"
              style={{
                color: '#fff',
                backgroundColor: '#3d0098',
                border: '1px solid #3d0098',
              }}>
              Add Bulk
            </Button>,
            <Search
              placeholder="Search"
              onSearch={(value) => console.log(value)}
              className="search-bar-style"
              style={{ width: 200, color: '#000' }}
            />,
          ]}
        />
        <TableComponent
          loading={this.props.loading}
          dataSource={this.props.dataSource}
          columns={this.props.columns}
        />
      </>
    );
  }
}

export default MainContent;
