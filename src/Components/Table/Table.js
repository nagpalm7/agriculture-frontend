import React from 'react';
import {
  Table,
  Button,
  Modal,
  Space,
  PageHeader,
  Input,
  Spin,
  Upload,
} from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './Table.css';
import { Link } from 'react-router-dom';

const UploadComponent = () => {
  return (
    <>
      <Upload>
        <Button>Click to Upload</Button>
      </Upload>
    </>
  );
};

class CustomTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ModalText: 'You can upload a CSV file',
      visible: false,
      confirmLoading: false,
    };
  }
  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = () => {
    this.setState({
      ModalText: 'You can upload a CSV file',
      confirmLoading: true,
    });
    setTimeout(() => {
      this.setState({
        visible: false,
        confirmLoading: false,
      });
    }, 2000);
  };

  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  handleDelete = (key) => {
    const dataSource = [...this.state.dataSource];
    this.setState({
      dataSource: dataSource.filter((item) => item.key !== key),
    });
  };

  render() {
    const { visible, confirmLoading, ModalText } = this.state;
    const { Search } = Input;
    const { Column } = Table;
    const {
      title,
      dataSource,
      columns,
      show_confirm_delete,
      show_edit_modal,
      loadings,
    } = this.props;
    // console.log(dataSource);
    console.log(loadings);

    return (
      <React.Fragment>
        <div className="site-page-header-ghost-wrapper">
          <PageHeader
            ghost={false}
            title={title}
            subTitle=""
            extra={[
              <Link to="/district/add">
                <Button key="1" shape="round">
                  +1 Add
                </Button>
              </Link>,
              <Button key="2" shape="round" onClick={this.showModal}>
                Add Bulk
              </Button>,
              <Modal
                title=""
                centered
                visible={visible}
                onOk={this.handleOk}
                confirmLoading={confirmLoading}
                onCancel={this.handleCancel}>
                <p>{ModalText}</p>
                <UploadComponent />
              </Modal>,
              <Search
                placeholder="Search"
                onSearch={(value) => console.log(value)}
                style={{ width: 200 }}
              />,
            ]}
          />
          {loadings ? (
            <div className="example">
              <Spin size="large" />
            </div>
          ) : (
            <Table dataSource={dataSource} loading={loadings} size="small">
              <>
                {columns.map((record) => (
                  <Column
                    title={record.title}
                    dataIndex={record.dataIndex}
                    key={record.key}
                  />
                ))}
                <Column
                  title="OPTIONS"
                  key="options"
                  render={(text, record) => {
                    return (
                      <Space size="large">
                        <Link to="/district/edit">
                          <Button>
                            <img src={edit} alt="edit" className="icons" />
                          </Button>
                        </Link>
                        <Button onClick={() => show_confirm_delete(record.key)}>
                          <img src={garbage} alt="delete" className="icons" />
                        </Button>
                      </Space>
                    );
                  }}
                />
              </>
            </Table>
          )}
        </div>
      </React.Fragment>
    );
  }
}

export default CustomTable;
