import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import './Analysis.css';
class OptionDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOptionVisible: false,
    };
  }
  showDrawer = () => {
    this.setState({
      ...this.setState({
        isOptionVisible: true,
      }),
    });
  };
  onDrawerClose = () => {
    this.setState({
      ...this.setState({
        isOptionVisible: false,
      }),
    });
  };
  render() {
    return (
      <div className="option_drawer_wrapper">
        <Button id="time_range" onClick={this.showDrawer}>
          Time Range
        </Button>
        <Drawer
          title="Pick Time Range"
          placement="bottom"
          id="pick_slots"
          headerStyle={{
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.63)',
          }}
          closable={true}
          onClose={this.onDrawerClose}
          visible={this.state.isOptionVisible}>
          <div className="drawer_buttons">
            <Button
              onClick={() => {
                this.setState({ ...this.state, isOptionVisible: false }, () => {
                  this.props.handleButtonClick('allTime');
                });
              }}>
              All Time
            </Button>
            <Button
              onClick={() => {
                this.setState({ ...this.state, isOptionVisible: false }, () => {
                  this.props.handleButtonClick('thisMonth');
                });
              }}>
              This Month
            </Button>
            <Button
              onClick={() => {
                this.setState({ ...this.state, isOptionVisible: false }, () => {
                  this.props.handleButtonClick('thisYear');
                });
              }}>
              This Year
            </Button>
            <Button
              onClick={() => {
                this.setState({ ...this.state, isOptionVisible: false }, () => {
                  this.props.showModal();
                });
              }}>
              Custom
            </Button>
          </div>
        </Drawer>
      </div>
    );
  }
}
export default OptionDrawer;
