import React, { Component, createRef } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';

const { Title } = Typography;
class EditVillage extends Component {
  constructor() {
    super();
    this.formRef = createRef();
  }

  componentDidMount() {
    // console.log(this.formRef.current);
    console.log('mounted');
    // console.log(this.props.match);
    // const {
    //   match: { params },
    // } = this.props;
    // axiosInstance
    //   .get(`/api/village/${params.villageId}`)
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     if (err.response) {
    //       console.log(err.response);
    //     } else {
    //       console.log(err.message);
    //     }
    //   });
  }

  render() {
    return (
      <div className="edit-village-container">
        <div>
          <Title level={3}>Edit Village</Title>
        </div>
        <Form
          ref={this.formRef}
          name="edit_village"
          className="edit-village"
          onFinish={this.handleEditVillage}>
          <h3>
            <b>Village</b>
          </h3>
          <Form.Item name="village_name" style={{ marginBottom: '10px' }}>
            <Input
              placeholder="Village name"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <h3>
            <b>Village Code</b>
          </h3>
          <Form.Item name="village_code" style={{ marginBottom: '10px' }}>
            <Input
              placeholder="Village Code"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <h3>
            <b>Village Sub Code</b>
          </h3>
          <Form.Item name="village_subcode" style={{ marginBottom: '10px' }}>
            <Input
              placeholder="Village Sub Code"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <h3>
            <b>Block</b>
          </h3>
          <Form.Item name="block" style={{ marginBottom: '16px' }}>
            <Input
              placeholder="Block"
              style={{ borderRadius: '7px', borderColor: '#707070' }}
            />
          </Form.Item>
          <Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <Button
                htmlType="submit"
                className="edit-village-btn"
                style={{
                  background: '#3d0098',
                  borderColor: '#3d0098',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                Update
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default EditVillage;
