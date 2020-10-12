import React, { Component } from 'react';
import MainContent from '../../Components/MainContent/MainContent';
import { axiosInstance } from '../../utils/axiosIntercepter';

class Block extends Component {
  constructor(props) {
    super(props);
    this.state = {
      blockData: [],
      loading: false,
    };
  }
  componentDidMount() {
    this.setState({ ...this.state, loading: true });
    this.fetchBlockList();
  }
  fetchBlockList() {
    const district_id = this.props.history.location.pathname.split('/')[2];
    console.log(district_id);
    axiosInstance
      .get(`api/blocks-list/district/${district_id}/`)
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          blockData: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        }
      });
  }
  columns = [
    {
      title: 'Block',
      dataIndex: 'block',
      key: 'block',
    },
    {
      title: 'Block Code',
      dataIndex: 'block_code',
      key: 'block_code',
    },
    {
      title: 'District',
      dataIndex: 'district',
      key: 'district',
      render: (district) => {
        return district.district;
      },
    },
  ];
  render() {
    return (
      <MainContent
        title="Block"
        loading={this.state.loading}
        dataSource={this.state.blockData.results}
        columns={this.columns}
      />
    );
  }
}

export default Block;
