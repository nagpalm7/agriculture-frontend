import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space } from 'antd';
import './Villages.css';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';

const columns = [
  {
    title: 'VILLAGES',
    dataIndex: 'village',
    key: 'name',
  },
  {
    title: 'OPTIONS',
    key: 'operation',
    render: (text, record) => {
      return (
        <Space size="large">
          <Link to={`villages/edit/${record.id}`}>
            <img src={edit} alt="" className="icons" />
          </Link>
          <img src={garbage} alt="" className="icons" />
        </Space>
      );
    },
  },
];

class Villages extends Component {
  constructor() {
    super();
    this.state = {
      villageData: [],
      loading: false,
    };
  }

  componentDidMount() {
    this.setState({ ...this.state, loading: true });

    axiosInstance
      .get('/api/villages-list')
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          villageData: res.data.results,
          loading: false,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  }

  render() {
    return (
      <>
        <MainContent
          title="Villages"
          addlink="/villages/add"
          loading={this.state.loading}
          dataSource={this.state.villageData}
          columns={columns}
        />
      </>
    );
  }
}

export default Villages;
