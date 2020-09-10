import React from 'react';
import { Form, Input, Button } from 'antd';

const EditDistrict = () => {
  return (
    <Form
      name="basic"
      initialValues={{
        remember: true,
      }}>
      <Form.Item
        label="State"
        name="state"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="District"
        name="district"
        rules={[
          {
            required: true,
            message: 'Please input your username!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item
        label="District_code"
        name="district_code"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}>
        <Input />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditDistrict;
