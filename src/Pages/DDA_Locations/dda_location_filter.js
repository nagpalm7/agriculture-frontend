import React, { Component } from 'react';
import {
  Form,
  Select,
  Spin,
  Divider,
  Radio,
  Switch,
  Button,
  Modal,
  Tag,
} from 'antd';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { FilterOutlined, RedditCircleFilled } from '@ant-design/icons';
import RemoveIco from '../../assets/images/letterX.svg';

const layout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 18 },
};
const { Option } = Select;

class DDALocFilter extends Component {
  constructor(props) {
    super(props);
    var villageChildren = [];
    villageChildren.push(<Option value={undefined}>No Village</Option>);

    var ado_children = [];
    ado_children.push(<Option value={undefined}>No ADO</Option>);

    this.state = {
      loading: false,
      isModalVisible: false,
      ado: [],
      villages: [],
      vilPage: 1,
      adoPage: 1,
      ado_children: ado_children,
      isAdoRendered: false,
      vilPage: 1,
      isVillageRendered: false,
      villageChildren: villageChildren,
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

  fetchVillageList = (distId, page) => {
    this.setState({
      ...this.state,
      village_loading: true,
    });
    axiosInstance
      .get(`/api/villages-list/district/${distId}?page=${page}`)
      .then((res) => {
        this.setState({
          ...this.setState,

          village_loading: false,
        });
        const villageData = res.data.results.map((item) => {
          return {
            village: item.village,
            id: item.id,
          };
        });
        var villageChildren = [...this.state.villageChildren];
        var length = villageChildren.length;
        villageData.map((vill) => {
          villageChildren.push(
            <Option key={vill.id} value={vill.village}>
              {vill.village}
            </Option>,
          );
        });

        this.setState({ villageChildren: villageChildren }, () => {
          var rendered = false;
          if (res.data.next == null) {
            rendered = true;
          }
          this.setState({
            ...this.state,
            isVillageRendered: rendered,
            village_loading: false,
          });
        });
      })
      .catch((err) => {
        this.setState({ ...this.state, village_loading: false });
        console.log(err);
      });
  };

  onScroll = (event) => {
    var target = event.target;
    if (
      !this.state.village_loading &&
      !this.state.isVillageRendered &&
      Math.ceil(target.scrollTop) + target.offsetHeight === target.scrollHeight
    ) {
      this.setState({ village_loading: true }, () => {
        target.scrollTo(0, target.scrollHeight);
        this.fetchVillageList(
          this.props.ddaInfo.district.id,
          this.state.vilPage + 1,
        );
        this.setState({ ...this.state, vilPage: this.state.vilPage + 1 });
      });
    }
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
  handleCancel = () => {
    this.setState({ isModalVisible: false });
  };
  handleOk = () => {
    this.setState({ isModalVisible: false });
  };

  componentDidMount() {
    let distId = this.props.ddaInfo.district.id;
    console.log(distId);
    this.fetchVillageList(distId, 1);
    this.fetchAdoList(1);
  }
  render() {
    let tags = [];
    const x = this.props.filters
      ? Object.keys(this.props.filters).forEach((key, idx) => {
          if (this.props.filters[key]) {
            var val = this.props.filters[key].split('_')[0];
            if (key == 'assignment') {
              if (val == 'a') {
                val = 'none';
              } else if (val == 'b') {
                val = 'assigned';
              } else {
                val = 'unassigned';
              }
            }
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
            {this.props.filters.ado ||
            this.props.filters.village ||
            this.props.filters.assignment ? (
              <div>{tags}</div>
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
            name="Pending Location Filter"
            style={{ marginTop: '10px' }}
            {...layout}
            onFinish={(e) => {
              this.props.applyFilters(e);
            }}>
            <Form.Item name="village" label="Select Village">
              <Select
                showSearch
                onPopupScroll={this.onScroll}
                placeholder="Select Village">
                {this.state.village_loading == false &&
                !this.state.isVillageRendered
                  ? [...this.state.villageChildren]
                  : this.state.isVillageRendered == true
                  ? [...this.state.villageChildren]
                  : [
                      ...this.state.villageChildren,
                      <Option key="loading" style={{ textAlign: 'center' }}>
                        <Spin spinning={true}></Spin>
                      </Option>,
                    ]}
              </Select>
            </Form.Item>
            <Form.Item name="ado" label="Select ADO">
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
            {
              (this.props.type=="pending_loc")?(
            <Form.Item name="assignment" label="Assignment">
              <Radio.Group>
                <Radio value="a">None</Radio>
                <Radio value="b">Assigned</Radio>
                <Radio value="c">Unassigned</Radio>
              </Radio.Group>
            </Form.Item>
              ):(
                ''
              )
            }
            
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
export default DDALocFilter;
