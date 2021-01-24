import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import More from '../../assets/images/more.svg';
class PopOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  render() {
    return (
      <Popover
        content={<a onClick={this.hide}>Close</a>}
        title="Title"
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft">
        <img
          className="popover_btn"
          src={More}
          style={{ width: '30px', cursor: 'pointer' }}></img>
      </Popover>
    );
  }
}
export default PopOver;
