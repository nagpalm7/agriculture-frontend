import React, { Component, createRef } from 'react';
import {
  Checkbox,
  Form,
  Input,
  Row,
  Col,
  Typography,
  message,
  Button,
  Spin,
} from 'antd';
import '../../formStyle.css';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MyButton from '../../../Components/ButtonComponent/MyButton';
import '../components/EditDistrict.css';
import '../../formStyle.css';
import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../../languages.json';

const { Title } = Typography;
const layout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 18 },
  },
};
const formTailLayout = {
  wrapperCol: { span: 24 },
};
class EditDistrict extends Component {
  constructor() {
    super();
    this.state = {
      formLoading: false,
      btnLoading: false,
    };
    this.formRef = createRef();
    this.districtId = '';
  }

  fetchDistrictInfo = () => {
    this.setState({ ...this.state, formLoading: true });
    this.districtId = this.props.history.location.pathname.split('/')[3];
    axiosInstance
      .get(`/api/district/${this.districtId}/`)
      .then((res) => {
        this.formRef.current.setFieldsValue({
          district_name: res.data.district,
          has_blocks: res.data.has_blocks,
        });
        this.setState({ ...this.state, formLoading: false });
      })
      .catch((err) => {
        this.setState({ ...this.state, formLoading: false });
        if (err.response) {
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  handleEditDistrict = (e) => {
    this.setState({ ...this.state, btnLoading: true });
    const { district_name, has_blocks } = e;
    axiosInstance
      .put(`/api/district/${this.districtId}/`, {
        district: district_name,
        has_blocks: has_blocks,
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        message.success('District updated successfully');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        if (err.response) {
          message.error('Unable to update district');
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };

  componentDidMount() {
    this.fetchDistrictInfo();
  }

  render() {
    return (
      <IntlProvider
      locale={this.props.lang}
      messages={Languages[this.props.lang]}>
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <Row style={{ marginBottom: '20px' }}>
            <Col
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="edit-fix-button"> <FormattedMessage
                id="edit"
                defaultMessage="some default one"
                values={this.props.lang}
              /></div>
            </Col>
            <Col md={18} md={18}>
              <Title level={3}>
              <FormattedMessage
                id="edit_dist"
                defaultMessage="some default one"
                values={this.props.lang}
              />
              </Title>
            </Col>
          </Row>
          <Row>
            <Form
              name="edit_district"
              className="edit-district"
              ref={this.formRef}
              {...layout}
              colon={false}
              style={{ width: '100%' }}
              onFinish={this.handleEditDistrict}>
              <Form.Item
                label={<FormattedMessage
                  id="dist_name"
                  defaultMessage="some default one"
                  values={this.props.lang}
                />}
                name="district_name"
                style={{ marginBottom: '10px' }}
                rules={[
                  {
                    required: true,
                    message:  <FormattedMessage
                    id="provide_dist_name"
                    defaultMessage="some default one"
                    values={this.props.lang}
                  /> 
                  },
                ]}>
                <Input placeholder="District name" />
              </Form.Item>
              <Form.Item
                label={
                  <FormattedMessage
              id="has_block"
              defaultMessage="some default one"
              values={this.props.lang}
            />
                }
                name="has_blocks"
                valuePropName="checked"
                style={{ marginTop: '24px' }}
                className="has_blocks">
                <Checkbox></Checkbox>
              </Form.Item>
              <Form.Item
                {...formTailLayout}
                style={{ marginBottom: '10px', textAlign: 'right' }}>
                <Button
                  htmlType="submit"
                  className="filled"
                  loading={this.state.btnLoading}
                  style={{
                    textAlign: 'right',
                    background: 'rgb(224,59,59)',
                    borderColor: 'rgb(224,59,59)',
                    color: '#ffffff',
                    fontWeight: '500',
                  }}
                >
                    <FormattedMessage
              id="update"
              defaultMessage="some default one"
              values={this.props.lang}
            />
                </Button>
              </Form.Item>
            </Form>
          </Row>
        </div>
      </Spin>
      </IntlProvider>
    );
  }
}

export default EditDistrict;
