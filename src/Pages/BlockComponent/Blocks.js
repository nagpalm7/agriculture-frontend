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
    this.fetchBlockList();
  }
  fetchBlockList() {
    const filterBlock = (block_data) => {
      const district_id = this.props.history.location.pathname.split('/')[2];
      return block_data.filter((block) => {
        return block.district.district_code == district_id;
      });
    };
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get('api/block/')
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          blockData: filterBlock(res.data),
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
    console.log(this.state);
    return (
      <MainContent
        title="Block"
        loading={this.state.loading}
        dataSource={this.state.blockData}
        columns={this.columns}
      />
    );
  }
}

export default Block;
