import React, { Component } from 'react';
import { Button, Drawer } from 'antd';
import moment from 'moment';
import NasaData from './NasaData.js';
import ComparisonData from './ComparisonData.js';
import './Comparison.css';
class ComparisonDrawer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isComparisonVisible: false,
    };
  }
  showDrawer = () => {
    this.setState({
      ...this.setState({
        isComparisonVisible: true,
      }),
    });
  };
  onDrawerClose = () => {
    this.setState({
      ...this.setState({
        isComparisonVisible: false,
      }),
    });
  };
  render() {
    return (
      <div className="option_drawer_wrapper">
        <Button
          style={{
            color: '#e03b3b',
            backgroundColor: '#f5f3ff',
            border: '0px',
            width: '100%',
            borderRadius: '10px',
          }}
          id="time_range"
          onClick={this.showDrawer}>
          Action
        </Button>
        <Drawer
          placement="bottom"
          id="pick_options"
          headerStyle={{
            textAlign: 'center',
            color: 'rgba(0, 0, 0, 0.63)',
          }}
          closable={true}
          onClose={this.onDrawerClose}
          visible={this.state.isComparisonVisible}>
          <div className="bottom_drawer_btns">
            <Button
              style={{
                color: '#e03b3b',
                backgroundColor: '#f5f3ff',
                border: '0px',

                borderRadius: '10px',
              }}
              defaultValue={moment()}
              onClick={() => {
                this.setState(
                  {
                    ...this.state,
                    isComparisonVisible: false,
                  },
                  () => {
                    this.props.showModal();
                  },
                );
              }}>
              Upload
            </Button>
            <NasaData closeDrawer={this.onDrawerClose}></NasaData>
            <ComparisonData
              closeDrawer={this.onDrawerClose}
              style={{ textAlign: 'right' }}></ComparisonData>
          </div>
        </Drawer>
      </div>
    );
  }
}

export default ComparisonDrawer;
