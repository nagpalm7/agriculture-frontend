import React, { Component, createRef } from 'react';
import { Form, Input, Row, Col, Typography, message, Select, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import MyButton from '../../../Components/ButtonComponent/MyButton';
import '../../formStyle.css';

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
const { Title } = Typography;
class EditBlock extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      btnLoading: false,
    };
    this.formRef = createRef();
    this.blockId = '';
    this.districtId = '';
  }

  fetchBlockInfo = () => {
    this.setState({ ...this.state, formLoading: true });
    axiosInstance
      .get(`api/block/${this.blockId}/`)
      .then((res) => {
        console.log(res);
        this.formRef.current.setFieldsValue({
          block_name: res.data.block,
          block_code: res.data.block_code,
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
  handleEditBlock = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const { block_name, block_code } = event;
    console.log(block_code);
    console.log(block_name);
    axiosInstance
      .put(`api/block/${this.blockId}/`, {
        id: this.blockId,
        block: block_name,
        block_code: block_code,
        district: this.districtId,
      })
      .then((res) => {
        console.log(res);
        this.setState({ ...this.state, btnLoading: false });
        message.success('Block updated sucessfully');
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        if (err.response) {
          message.error('Unable to update Block');
          console.log(err.response);
        } else {
          message.error(err.message);
          console.log(err.message);
        }
      });
  };
  componentDidMount() {
    const block_id = this.props.history.location.pathname.split('/')[4];
    const district_id = this.props.history.location.pathname.split('/')[2];
    this.blockId = block_id;
    this.districtId = district_id;
    this.fetchBlockInfo();
  }
  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <Row style={{ marginBottom: '20px' }}>
            <Col
              sm={6}
              md={6}
              style={{ display: 'flex', justifyContent: 'center' }}>
              <div className="edit-fix-button">Edit</div>
            </Col>
            <Col md={18} md={18}>
              <Title level={3}>Edit Block</Title>
            </Col>
          </Row>
          <Row>
            <Form
              colon={false}
              style={{
                width: '100%',
              }}
              name="edit_block"
              className="edit-block"
              {...layout}
              ref={this.formRef}
              onFinish={this.handleEditBlock}>
              <Form.Item
                label="Block Name"
                name="block_name"
                style={{ marginBottom: '10px', color: 'crimson' }}
                rules={[
                  {
                    required: true,
                    message: 'Please provide Block name!',
                  },
                ]}>
                <Input placeholder="Block Name" />
              </Form.Item>

              <Form.Item
                label="Block Code"
                name="block_code"
                style={{ marginBottom: '10px' }}>
                <Input placeholder="Block Code" />
              </Form.Item>
              <Form.Item
                {...formTailLayout}
                style={{ marginBottom: '10px', textAlign: 'right' }}>
                <MyButton
                  htmlType="submit"
                  text="UPDATE"
                  className="filled"
                  loading={this.state.btnLoading}
                  style={{
                    background: '#e03b3b',
                    borderColor: '#e03b3b',
                    color: '#ffffff',
                    fontWeight: '500',
                  }}
                />
              </Form.Item>
            </Form>
          </Row>
        </div>
      </Spin>
    );
  }
}

export default EditBlock;
