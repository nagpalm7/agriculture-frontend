import React, { Component } from 'react';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import cross from '../../../assets/images/cross-remove-sign.png';
import { Link } from 'react-router-dom';
import { Button, loading } from 'antd';

class BlockInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoaing: true,
      blockdata: null,
    };
  }
  componentDidMount() {
    this.setState({ ...this.state, isloading: true });
    axiosInstance
      .get(`api/blocks-list/district/${this.props.district_id}/`)
      .then((res) => {
        this.setState({ isLoaing: false, blockdata: res.data });
      })
      .catch((err) => {
        this.setState({ ...this.state, isLoaing: false });
        if (err.response) {
          console.log(err.response);
        }
      });
  }
  render() {
    const blocks = this.state.blockdata;
    const district_id = this.props.district_id;
    if (this.state.isLoaing) {
      return <loading></loading>;
    } else {
      if (
        blocks.count == 0 ||
        (blocks.count == 1 &&
          blocks.results[0].block_code ==
            blocks.results[0].district.district_code)
      ) {
        return (
          <span style={{ paddingLeft: '40px' }}>
            <img src={cross} width={15}></img>
          </span>
        );
      } else {
        return (
          <Link to={`/block/${district_id}`}>
            <Button
              type="primary"
              className="block-button"
              loading={this.loading}
              style={{
                color: 'crimson',
                backgroundColor: '#f5f3ff',
                border: '0px',
                borderRadius: '20px',
              }}>
              View Block
            </Button>
          </Link>
        );
      }
    }
  }
}
export default BlockInfo;
