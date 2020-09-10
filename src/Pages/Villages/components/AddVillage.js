import React, { Component } from 'react';
import { Form, Input, Button, Typography } from 'antd';
import './addvillage.css';

const { Title } = Typography;

class AddVillages extends Component {
  render() {
    return (
      <div className="add-village-container">
        <div>
          <Title level={3}>Add Village</Title>
        </div>
        <Form name="add_village" className="add-village">
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
                className="add-village-btn"
                style={{
                  background: '#3d0098',
                  borderColor: '#3d0098',
                  color: '#ffffff',
                  fontWeight: '500',
                }}>
                ADD
              </Button>
            </Form.Item>
          </Form.Item>
        </Form>
      </div>
    );
  }
}

export default AddVillages;
