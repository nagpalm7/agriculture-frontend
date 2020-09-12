import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import TableComponent from '../TableComponent/TableComponent';
import { PageHeader, Button, Input } from 'antd';
import './MainContent.css';
import MyButton from '../ButtonComponent/MyButton';

const { Search } = Input;

class MainContent extends Component {
  render() {
    const {
      title,
      addlink,
      loading,
      dataSource,
      columns,
      totalPages,
      onPageChange,
    } = this.props;
    return (
      <div>
        <PageHeader
          className="site-page-header"
          ghost={false}
          title={title}
          subTitle=""
          style={{ borderRadius: '20px' }}
          extra={[
            <Link to={addlink} key="1">
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
          loading={loading}
          dataSource={dataSource}
          columns={columns}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    );
  }
}

export default MainContent;
