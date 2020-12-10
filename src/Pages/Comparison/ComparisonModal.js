import React, { Component } from 'react';
import { Button, message, Modal } from 'antd';
import { UploadOutlined } from '@ant-design/icons';

class Uploader extends Component {
  constructor(props) {
    super(props);
  }
  fileSelectedHandler = (event) => {
    const file = event.target.files[0];
    if (file) {
      this.props.addFiles(file, this.props.file_type);
      this.setState({ ...this.state, file_name: file.name });
    }
  };
  err_text = (err) => {
    console.log(err);
    if (err) {
      return err;
    } else {
      return '';
    }
  };
  render() {
    return (
      <div>
        <input
          type="file"
          id="myfile"
          style={{ display: 'none' }}
          ref={(inputFile) => (this.inputFile = inputFile)}
          name="myfile"
          onChange={this.fileSelectedHandler}
          accept="application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        />
        <Button
          key="upload"
          className="modal-button"
          onClick={() => {
            this.inputFile.click();
          }}
          style={{
            color: '#e03b3b',
            backgroundColor: '#f5f3ff',
            border: '0px',
            width: '200px',
          }}
          loading={this.props.btnLoading}>
          {this.props.type}
        </Button>
        <div className="file_name">{this.props.file_name}</div>
        <div className="err_mess">{this.err_text(this.props.file_err)}</div>
      </div>
    );
  }
}
export default Uploader;
