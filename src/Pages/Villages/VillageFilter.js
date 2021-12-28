import React, { Component } from 'react';
import { Form, Select, Spin, Divider, Button, Modal, Tag } from 'antd';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { FilterOutlined, RedditCircleFilled } from '@ant-design/icons';
import RemoveIco from '../../assets/images/letterX.svg';
const { Option } = Select;
const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
var ado_children = [];
ado_children.push(<Option value={undefined}>No ADO</Option>);

class villageFilter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      district: [],
      isModalVisible: false,
      tags: [],
      ado_loading: false,
      ado: [],
      ado_children: ado_children,
      isAdoRendered: false,
      adoPage: 1,
    };
  }

  fetchAdoList = (page) => {
    axiosInstance
      .get(`/api/users-list/ado/?page=${page}`)
      .then((res) => {
        this.setState({ ...this.state, ado_loading: false });
        const adoData = res.data.results.map((item) => {
          return {
            ado: item.user.username,
            id: item.id,
          };
        });
        var ado_children = [...this.state.ado_children];
        var length = ado_children.length;

        adoData.map((ado) => {
          ado_children.push(
            <Option key={ado.id} value={`${ado.ado}_${ado.id}`}>
              {ado.ado}
            </Option>,
          );
        });
        this.setState({ ado_children: ado_children }, () => {
          console.log(length);
          let next = res.data.next;
          if (next == null) {
            this.setState({ ...this.state, isAdoRendered: true });
          }

          this.setState({ ado_loading: false });
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, ado_loading: false });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  };
  onAdoScroll = (event) => {
    var target = event.target;
    if (
      !this.state.ado_loading &&
      !this.state.isAdoRendered &&
      Math.ceil(target.scrollTop) + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ ado_loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchAdoList(this.state.adoPage + 1);
        this.setState({ ...this.state, adoPage: this.state.adoPage + 1 });
      });
    }
  };
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
    this.fetchAdoList(1);
  }
  render() {
    let tags = [];
    const x = this.props.filters
      ? Object.keys(this.props.filters).forEach((key, idx) => {
          if (this.props.filters[key]) {
            var val = this.props.filters[key].split('_')[0];
            var str = `${key} : ${val}`;
            tags.push(
              <div className="filter_tag">
                <span>{str}</span>
                <div
                  onClick={() => {
                    this.props.removeFilter(key);
                  }}>
                  <img style={{ width: '10px' }} src={RemoveIco}></img>
                </div>
              </div>,
            );
          }
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
            {this.props.filters.district || this.props.filters.ado ? (
              <div>
                {tags.map((tag) => {
                  return tag;
                })}
              </div>
            ) : (
              <span className="no_filter_disp">No active filters</span>
            )}
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
              console.log(e);
              this.props.applyFilters(e);
            this.handleOk();
            }}>
            {this.props.type == 'dda_villages' ? (
              ''
            ) : (
              <Form.Item label="Select District" name="district">
                <Select showSearch placeholder="Select District">
                  <Option value={undefined}>No District</Option>
                  {!this.state.loading ? (
                    this.state.district.map((district) => {
                      return (
                        <Option
                          key={district.id}
                          value={`${district.district}_${district.id}`}>
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
            )}

            <Form.Item label="Select Ado" name="ado">
              <Select
                showSearch
                style={{ borderRadius: '7px', borderColor: '#707070' }}
                optionFilterProp="children"
                onPopupScroll={this.onAdoScroll}
                placeholder="select ADO">
                {!this.state.ado_loading && !this.state.isAdoRendered
                  ? this.state.ado_children
                  : this.state.isAdoRendered == true
                  ? [...this.state.ado_children]
                  : [
                      ...this.state.ado_children,
                      <Option key="loading" style={{ textAlign: 'center' }}>
                        <Spin spinning={true}></Spin>
                      </Option>,
                    ]}
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
                    color: '#e03b3b',
                    backgroundColor: '#f6f6f6',
                    borderRadius: '20px',
                    height: '26px',
                    border: '0px',
                    fontSize: '15px',
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
