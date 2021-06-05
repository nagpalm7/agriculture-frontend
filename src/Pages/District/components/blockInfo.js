import React, { Component } from 'react';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import cross from '../../../assets/images/cross-remove-sign.png';
import { Link } from 'react-router-dom';
import { Button, loading } from 'antd';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../../languages.json';

class BlockInfo extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    const district_id = this.props.district_id;
    const has_blocks = this.props.has_blocks;
    if (has_blocks == false) {
      return (
        <span style={{ paddingLeft: '40px' }}>
          <img src={cross} width={10}></img>
        </span>
      );
    } else {
      return this.props.lang ? (
        <IntlProvider
          locale={this.props.lang}
          messages={Languages[this.props.lang]}>
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
              <FormattedMessage
                id="view_block"
                defaultMessage="some default one"
                values={this.props.lang}
              />
            </Button>
          </Link>
        </IntlProvider>
      ) : (
        ''
      );
    }
  }
}
export default BlockInfo;
