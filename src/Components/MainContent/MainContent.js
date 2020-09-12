import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent/TableComponent';
import { PageHeader, Button, Input } from 'antd';
import './MainContent.css';
import MyButton from '../ButtonComponent/MyButton';

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
            <Link to={this.props.addlink} key="1">
              <MyButton
                text="Add"
                type="filled"
                extraStyle={{
                  color: '#fff',
                  backgroundColor: '#3d0098',
                  border: '1px solid #3d0098',
                }}
              />
            </Link>,
            <MyButton
              key="2"
              text="Add Bulk"
              type="filled"
              extraStyle={{
                color: '#fff',
                backgroundColor: '#3d0098',
                border: '1px solid #3d0098',
              }}
            />,
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
