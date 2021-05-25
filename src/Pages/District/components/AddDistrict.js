import React, { Component } from 'react';
import { Form, Input, Typography, message,Button } from 'antd';
import '../../formStyle.css';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../../languages.json';
import { axiosInstance } from '../../../utils/axiosIntercepter';


const { Title } = Typography;

class AddDistrict extends Component {
  constructor() {
    super();
    this.state = {
      btnLoading: false,
    };
  }

  handleAddDistrict = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const { district_name, district_code } = event;

    axiosInstance
      .post('/api/district/', {
        district: district_name,
        district_code: district_code,
        state: 1,
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        console.log(res);
        message.success('District added');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        if (err.response) {
          console.log(err.response);
          message.error('Unable to add district');
        } else {
          message.error('Unable to add district');
          console.log(err.message);
        }
      });
  };

  render() {
    return (
      <IntlProvider
        locale={this.props.lang}
        messages={Languages[this.props.lang]}>
        <div className="form-container">
          <div>
            <Title level={3}>
              <FormattedMessage
                id="add_dist"
                defaultMessage="some default one"
                values={this.props.lang}
              />
            </Title>
          </div>
          <Form
            name="add_district"
            className="add-district"
            onFinish={this.handleAddDistrict}>
            <h3>
              <b>
                {' '}
                <FormattedMessage
                  id="dist_name"
                  defaultMessage="some default one"
                  values={this.props.lang}
                />
              </b>
            </h3>
            <Form.Item
              name="district_name"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage
                  id="provide_dist_name"
                  defaultMessage="some default one"
                  values={this.props.lang}
                />,
                },
              ]}>
              <Input placeholder="District name" />
            </Form.Item>
            <h3>
              <b>
                {' '}
                <FormattedMessage
                  id="dist_code"
                  defaultMessage="some default one"
                  values={this.props.lang}
                />
              </b>
            </h3>
            <Form.Item
              name="district_code"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: <FormattedMessage
                  id="provide_dist_code"
                  defaultMessage="some default one"
                  values={this.props.lang}
                />,
                },
              ]}>
              <Input placeholder="District Code" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Button
                htmlType="submit"
                className="filled"
                loading={this.state.btnLoading}
                style={{
                  background: 'crimson',
                  borderColor: 'crimson',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                <FormattedMessage
                  id="add"
                  defaultMessage="some default one"
                  values={this.props.lang}
                />
              </Button>
            </Form.Item>
          </Form>
        </div>
      </IntlProvider>
    );
  }
}

export default AddDistrict;
