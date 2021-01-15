import React, { Component } from 'react';
import { Form, Select, Spin, Divider, Button, Modal, Tag } from 'antd';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { FilterOutlined, RedditCircleFilled } from '@ant-design/icons';
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};

class villageFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      district: [],
      isModalVisible: false,
      tags: [],
    };
  }
  fetchDistricts = () => {
    this.setState({
      ...this.state,
      loading: true,
    });
    axiosInstance
      .get('/api/district/')
      .then((res) => {
        this.setState({
          ...this.state,
          loading: false,
          district: res.data,
        });
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        console.log(err);
      });
  };
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleOk = () => {
    this.setState({ isModalVisible: false });
  };
  componentDidMount() {
    this.fetchDistricts();
  }
  render() {
    console.log(this.props.filters);
    let tags = [];
    const x = this.props.filters
      ? Object.keys(this.props.filters).forEach((key, idx) => {
          var dist = this.props.filters[key];
          tags.push(<Tag>{dist}</Tag>);
        })
      : 'No filters active';
    return (
      <>
        <div
          className="search-filter"
          style={{ display: 'inline-block' }}
          onClick={() => {
            this.setState({ ...this.state, isModalVisible: true });
          }}>
          <FilterOutlined />
        </div>
        <Modal
          visible={this.state.isModalVisible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          style={{
            padding: '10px',
            fontSize: '1.2em',
            color: 'black',
          }}
          footer={[]}>
          <div
            className="filters"
            style={{ minHeight: '25px', marginBottom: '10px' }}>
            <div
              style={{
                fontWeight: 400,
                color: 'black',
                marginBottom: '12px',
                paddingTop: '10px',
              }}>
              Filters Active
            </div>
            {this.props.filters ? (
              <div>
                {tags.map((tag) => {
                  return tag;
                })}
              </div>
            ) : (
              <span
                style={{
                  fontSize: '15px',
                  color: '#e03b3b',
                  padding: '5px',
                  borderRadius: '5px',

                  border: '1px solid #e03b3b',
                  backgroundColor: 'white',
                }}>
                No active filters
              </span>
            )}
          </div>
          <div
            class="removefilter-modal-footer"
            style={{
              marginBottom: '20px',
            }}>
            {this.props.filters ? (
              <Button
                onClick={() => {
                  this.setState(
                    {
                      ...this.state,
                      isModalVisible: false,
                    },
                    () => {
                      this.props.removeFilter();
                    },
                  );
                }}
                style={{
                  color: 'white',
                  backgroundColor: 'rgb(224, 59, 59)',
                  borderRadius: '20px',
                  fontSize: '12px',
                  height: '26px',
                  border: '0px',
                }}>
                Remove Filters
              </Button>
            ) : null}
          </div>
          <Divider></Divider>
          <div
            style={{
              fontWeight: 400,
              color: 'black',
            }}>
            Add Filters
          </div>
          <Form
            name="villageFilter"
            {...layout}
            style={{ marginTop: '10px' }}
            onFinish={(e) => {
              this.setState(
                {
                  ...this.state,
                  isModalVisible: false,
                },
                () => {
                  this.props.applyFilters(e);
                },
              );
            }}>
            <Form.Item label="Select District" name="district">
              <Select showSearch placeholder="Select District">
                {!this.state.loading ? (
                  this.state.district.map((district) => {
                    return (
                      <Option
                        key={district.id}
                        value={`${district.district} ${district.id}`}>
                        {district.district}
                      </Option>
                    );
                  })
                ) : (
                  <Option style={{ textAlign: 'center' }}>
                    <Spin spinning={true}></Spin>
                  </Option>
                )}
              </Select>
            </Form.Item>
            <Form.Item
              wrapperCol={{ span: 24, offset: 0 }}
              labelCol={{ span: 0 }}
              style={{
                marginTop: '10px',
                marginBottom: '-20px',
              }}>
              <div class="add-filter-modal-footer">
                <Button
                  htmlType="submit"
                  key="submit"
                  type="primary"
                  style={{
                    color: 'white',
                    backgroundColor: 'rgb(224, 59, 59)',
                    borderRadius: '20px',
                    height: '26px',
                    border: '0px',
                    fontSize: '12px',
                  }}>
                  Add Filters
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Modal>
      </>
    );
  }
}
export default villageFilter;
