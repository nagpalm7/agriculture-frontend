import React, { Component } from 'react';
import {
  Layout,
  Button,
  Space,
  Avatar,
  Modal,
  Popover,
  Divider,
  Select,
  Row,
  Col,
} from 'antd';
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  RightOutlined,
  LogoutOutlined,
  SettingOutlined,
} from '@ant-design/icons';
import './Header.css';
import MyButton from '../ButtonComponent/MyButton';
import { Link } from 'react-router-dom';
import PopOver from '../../Components/PopOver/Popover.js';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';

const { Header } = Layout;
const { Option } = Select;
class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: null,
      lang: null,
      isModalVisible: false,
      isPopOverVisible: false,
      isLangModalVisible:false
    };
    this.setModalVisible = this.setModalVisible.bind(this);
    this.setLangModalVisible=this.setLangModalVisible.bind(this);
  }
  hide = () => {
    this.setState({
      isPopOverVisible: false,
    });
  };

  handleVisibleChange = (visible) => {
    this.setState({ isPopOverVisible: visible });
  };
  setModalVisible() {
    this.setState({
      ...this.state,
      isModalVisible: !this.state.isModalVisible,
    });
  }
 
  setLangModalVisible(){
    this.setState({
      ...this.state,
      isLangModalVisible: !this.state.isLangModalVisible,
    });
  }
  componentDidMount() {
    let loginData = null;
    let lang = null;
    if (this.props.lang) {
      lang = this.props.lang;
    }
    if (sessionStorage.getItem('lang')) {
      lang = sessionStorage.getItem('lang');
    }
    if (localStorage.getItem('lang')) {
      lang = localStorage.getItem('lang');
    }
    if (this.props.loginData) {
      loginData = this.props.loginData;
    }
    if (sessionStorage.getItem('loginData')) {
      loginData = sessionStorage.getItem('loginData');
    }
    if (localStorage.getItem('loginData')) {
      loginData = localStorage.getItem('loginData');
    }
    loginData = JSON.parse(loginData);
    this.setState({
      ...this.state,
      loginData: loginData,
      lang: lang,
    });
    console.log(loginData, lang);
  }
  render() {
    console.log(this.state.loginData);
    return this.state.lang ? (
      <IntlProvider
        locale={this.state.lang}
        messages={Languages[this.state.lang]}>
        <Header
          className="site-layout-background"
          style={{ padding: '0 20px', background: '#fff', overflowX: 'auto' }}>
          <Modal
            visible={this.state.isLangModalVisible}
            onOk={this.setLangModalVisible}
            onCancel={this.setLangModalVisible}
            footer={[]} 
      >
        <div style={{paddingTop:'20px'}}>
        <span>Select Language :</span>{' '}
            <Select
              style={{ width: '100px' }}
              defaultValue={this.state.lang}
              onChange={(e) => {
                console.log(e);
                this.setState({ ...this.state, lang: e });
                this.props.setLang(e);
              }}>
              <Option value="hi">हिंदी</Option>
              <Option value="en">English</Option>
            </Select> 
        </div>
            
          </Modal>
          <Modal
            visible={this.state.isModalVisible}
            onOk={this.setModalVisible}
            onCancel={this.setModalVisible}
            footer={[]}>
            {this.state.loginData ? (
              <div className="pop_dda_disp">
                <Avatar
                  src={this.state.loginData.user.image}
                  style={{ width: '100px', height: '100px' }}
                />
                <Divider></Divider>
                <div id="dividing_line"></div>
                <Row>
                  <Col md={8} span={8}>
                    {' '}
                    <FormattedMessage
                      id="name"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Col>
                  <Col md={16} span={16}>
                    {this.state.loginData.user.name}
                  </Col>
                  <Divider></Divider>
                  <Col span={8}>
                    {' '}
                    <FormattedMessage
                      id="email"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Col>
                  <Col span={16}>{this.state.loginData.user.email}</Col>
                  <Divider></Divider>
                  <Col span={8}>
                    {' '}
                    <FormattedMessage
                      id="phone"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Col>
                  <Col span={16}>
                    {this.state.loginData.user.phone_number
                      ? this.state.loginData.user.phone_number
                      : 'NA'}
                  </Col>
                  <Divider></Divider>
                  <Col span={8}>
                    {' '}
                    <FormattedMessage
                      id="state"
                      defaultMessage="some default one"
                      values={this.state.localeLang}
                    />
                  </Col>
                  <Col span={16}>{this.state.loginData.user.state.state}</Col>
                </Row>
              </div>
            ) : (
              ''
            )}
          </Modal>
          <div className="header-style">
            <div>
              {React.createElement(
                this.props.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
                {
                  className: 'trigger',
                  onClick: this.props.toggle,
                  style: { fontSize: '20px' },
                },
              )}
            </div>
            <div className="afl_name">AFL Monitoring</div>
            <PopOver
              logout={this.props.logout}
              hide={this.hide}
              setModalVisible={this.setModalVisible}
              loginData={this.state.loginData}
              setLangModalVisible={this.setLangModalVisible}></PopOver>
            <div className="largeScreenIcons">
              <Space>
                <Link to="/comparison">
                  <Button
                    text="Comparison"
                    className="outlined"
                    style={{
                      color: '#e03b3b',
                      backgroundColor: '#f5f3ff',
                      border: '0px',
                    }}>
                    <FormattedMessage
                      id="comparison"
                      defaultMessage="Comparison"
                      values={this.state.lang}></FormattedMessage>
                  </Button>
                </Link>
                <Link to="/Analysis">
                  <Button
                    text="Analysis"
                    className="outlined"
                    style={{
                      color: '#e03b3b',
                      backgroundColor: '#f5f3ff',
                      border: '0px',
                    }}>
                    <FormattedMessage
                      id="analysis"
                      defaultMessage="Analysis"
                      values={this.state.lang}></FormattedMessage>
                  </Button>
                </Link>
                {this.state.loginData ? (
                  <Popover
                    content={
                      <div className="pop_overContent">
                        <div tabIndex="0">
                          {this.state.loginData ? (
                            <div
                              onClick={() => {
                                this.hide();
                                this.setModalVisible();
                              }}>
                              {/* <Avatar src={this.state.loginData.user.image} /> */}
                              <RightOutlined></RightOutlined>
                              <span> </span>
                              <span>{this.state.loginData.user.username}</span>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                        <div tabIndex="0" className="lang_select">
                          <SettingOutlined></SettingOutlined>

                          <Select
                            style={{ width: '100px' }}
                            defaultValue={this.state.lang}
                            onChange={(e) => {
                              console.log(e);
                              this.setState({ ...this.state, lang: e });
                              this.props.setLang(e);
                            }}>
                            <Option value="hi">हिंदी</Option>
                            <Option value="en">English</Option>
                          </Select>
                        </div>
                        <div
                          tabIndex="0"
                          // className="outlined"
                          id="pop_logout-button"
                          onClick={this.props.logout}
                          // style={{
                          //   textAlign:'center',
                          //   color: 'black',
                          //   // backgroundColor: 'hsl(209,100%,99%)',
                          //   fontWeight: '500',
                          // }}
                        >
                          <LogoutOutlined></LogoutOutlined>
                          <span> </span>
                          <span style={{ marginLeft: '7px' }}>
                            <FormattedMessage
                              id="logout"
                              defaultMessage="Logout"
                              values={this.state.lang}></FormattedMessage>
                          </span>
                        </div>
                      </div>
                    }
                    style={{ overflowY: 'auto', marginBottom: '-80px' }}
                    trigger="click"
                    visible={this.state.isPopOverVisible}
                    onVisibleChange={this.handleVisibleChange}>
                    {this.state.loginData ? (
                      <div className="user_info_avtar">
                        <Avatar src={this.state.loginData.user.image} />
                        <span>{this.state.loginData.user.username}</span>
                      </div>
                    ) : (
                      ''
                    )}
                  </Popover>
                ) : (
                  ''
                )}
              </Space>
            </div>
          </div>
        </Header>
      </IntlProvider>
    ) : (
      ''
    );
  }
}

export default Headers;
