import React, { Component } from 'react';
import { Layout, Button, Space,Avatar,Modal,Popover, Divider } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined,RightOutlined,LogoutOutlined } from '@ant-design/icons';
import './Header.css';
import MyButton from '../ButtonComponent/MyButton';
import { Link } from 'react-router-dom';
import PopOver from '../../Components/PopOver/Popover.js';

const { Header } = Layout;

class Headers extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginData: null,
      lang:null,
      isModalVisible:false,
      isPopOverVisible:false,
    };
    this.setModalVisible=this.setModalVisible.bind(this);
  }
  hide = () => {
    this.setState({
      isPopOverVisible: false,
    });
  };

  handleVisibleChange = visible => {
    this.setState({isPopOverVisible:visible});
  };
  setModalVisible(){
    this.setState({
      ...this.state,isModalVisible:!this.state.isModalVisible,
    })
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
      ...this.state,loginData:loginData,lang:lang,
    });
    console.log(loginData, lang);
  }
  render() {
    return (
      
      <Header
        className="site-layout-background"
        style={{ padding: '0 20px', background: '#fff', overflowX: 'auto' }}>
          <Modal visible={this.state.isModalVisible}
          onOk={this.setModalVisible}
          onCancel={this.setModalVisible}
          style={{ width: '80vw' }}
          footer={[]}
          >
            {
              (this.state.loginData)?(
                <div className="pop_dda_disp">
                <Avatar src={this.state.loginData.user.image} style={{width:'100px',height:'100px'}}/>
                <Divider></Divider>
                <div>Name - {this.state.loginData.user.name}</div>
                <div>Email - {this.state.loginData.user.email}</div>
                {(this.state.loginData.user.phone_number)?<div>Phone No - {this.state.loginData.user.phone_number}</div>:<></>}
                <div>State - {this.state.loginData.user.state.state}</div>
              </div>
              ):('')
            }
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
          <PopOver logout={this.props.logout}></PopOver>
          <div className="largeScreenIcons">
            <Space>
              <Link to="/comparison">
                <MyButton 
                  text="Comparison"
                  className="outlined"
                  style={{
                    color: '#e03b3b',
                    backgroundColor: '#f5f3ff',
                    border: '0px',
                  }}
                />
              </Link>
              <Link to="/Analysis">
                <MyButton
                  text="Analysis"
                  className="outlined"
                  style={{
                    color: '#e03b3b',
                    backgroundColor: '#f5f3ff',
                    border: '0px',
                  }}
                />
              </Link>
              {
                (this.state.loginData)?( 
                <Popover
                content={
                  <div className="pop_overContent">
                    <div>
                    {
                      (this.state.loginData)?(
                        <div onClick={()=>{
                          this.hide();
                          this.setModalVisible();
                        }}>
                        {/* <Avatar src={this.state.loginData.user.image} /> */}
                        <RightOutlined></RightOutlined><span>  </span><span>{this.state.loginData.user.username}</span>
                      </div>
                      ):('')
                   }
                  </div>
                   
                    <div
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
                     <span>    </span>
                    <span style={{marginLeft:'7px'}}>Logout</span>
                    </div>
                    </div>
                }
                style={{overflowY:'auto',marginBottom:'-80px'}}
                trigger="click"
                visible={this.state.isPopOverVisible}
                onVisibleChange={this.handleVisibleChange}
              >
                {
                  (this.state.loginData)?(
                    <div className="user_info_avtar">
                    <Avatar src={this.state.loginData.user.image} />
                    <span>{this.state.loginData.user.username}</span>
                   </div>
                  ):('')
                }
              </Popover>):('')
              }
            </Space>
          </div>
        </div>
      </Header>
    );                                            
  }                                            
}                                            
                                            
export default Headers;
              