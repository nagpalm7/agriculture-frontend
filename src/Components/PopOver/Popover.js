import React, { Component } from 'react';
import { Popover, Button,Select,Modal } from 'antd';
import { MenuOutlined, MoreOutlined } from '@ant-design/icons';
import More from '../../assets/images/more (1).svg';
import { Link } from 'react-router-dom';
import './Popover.css';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RightOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';
const { Option } = Select;

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
      <IntlProvider
      locale={this.state.lang}
      messages={Languages[this.props.lang]}>
      <Popover
        content={
          <div className="popover_content">
              {this.props.loginData ? (
                <div
                  onClick={() => {
                    this.props.hide();
                    this.props.setModalVisible();
                  }}>
                  <RightOutlined></RightOutlined>
                  {' '}
                  <span>{this.props.loginData.user.username}</span>
                </div>
              ) : (
                ''
              )}  

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
                <LogoutOutlined></LogoutOutlined>{' '}
              Logout
            </div>
            <div tabIndex="0" className="lang_select_small" onClick={()=>{
              this.props.setLangModalVisible();
            }}>
              <SettingOutlined></SettingOutlined>
              {' '}Settings
              {/* <Select
                style={{ width: '90%' }}
                defaultValue={this.state.lang}
                onChange={(e) => {
                  console.log(e);
                  this.setState({ ...this.state, lang: e });
                  this.props.setLang(e);
                }}>
                <Option value="hi">हिंदी</Option>
                <Option value="en">English</Option>
              </Select> */}
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
      </IntlProvider>
    );
  }
}
export default PopOver;
