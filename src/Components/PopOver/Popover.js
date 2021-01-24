import React, { Component } from 'react';
import { Popover, Button } from 'antd';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import More from '../../assets/images/more (1).svg';
import { Link } from 'react-router-dom';
import './Popover.css';
class PopOver extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      moreActive: false,
    };
  }
  hide = () => {
    this.setState({
      visible: false,
      com_click: false,
      analysis_click: false,
      logout_click: false,
    });
  };
  handleVisibleChange = (visible) => {
    this.setState({ visible });
  };
  render() {
    return (
      <Popover
        content={
          <div className="popover_content">
            <Link to="/comparison">
              <div
                className={this.state.com_click ? 'active' : null}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    com_click: true,
                    analysis_click: false,
                    logout_click: false,
                  });
                }}>
                Comparison
              </div>
            </Link>
            <Link to="/Analysis">
              <div
                className={this.state.analysis_click ? 'active' : null}
                onClick={() => {
                  this.setState({
                    ...this.state,
                    analysis_click: true,
                    com_click: false,
                    logout_click: false,
                  });
                }}>
                Analysis
              </div>
            </Link>
            <div
              className={this.state.logout_click ? 'active' : null}
              onClick={() => {
                this.setState(
                  {
                    ...this.state,
                    logout_click: true,
                    analysis_click: false,
                    com_click: false,
                  },
                  () => {
                    this.props.logout();
                  },
                );
              }}>
              Logout
            </div>
          </div>
        }
        trigger="click"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
        placement="bottomLeft">
        <img
          className={this.state.visible ? 'popover_btn active' : 'popover_btn'}
          src={More}
          style={{ width: '30px', cursor: 'pointer' }}></img>
      </Popover>
    );
  }
}
export default PopOver;
