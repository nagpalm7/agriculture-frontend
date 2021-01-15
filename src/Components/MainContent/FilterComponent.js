import React, { Component } from 'react';
import { FilterOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
class FilterComponent extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    var filter;
    if (this.props.filter) {
      filter = this.props.filter();
    }
    return <>{filter}</>;
  }
}
export default FilterComponent;
