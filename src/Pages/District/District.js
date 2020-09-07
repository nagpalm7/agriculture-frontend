import React, { Component } from 'react';
import { Modal } from 'antd';
import './District.css';
import axios from 'axios';
import CustomTable from '../../Components/Table/Table';

const url = 'https://api.aflmonitoring.com/api/district/';

const headers = {
  Authorization: 'token 915470c056d9f86cb271b7392ce7eae1296d906f',
};

const columns = [
  {
    title: 'DISTRICTS',
    dataIndex: 'district',
    key: 'district',
  },
];

class District extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      loadings: false,
      key: null,
    };
  }

  add_form_ref = React.createRef();

  componentDidMount() {
    this.fetch_data();
  }

  // Fetch list of Districts
  fetch_data = () => {
    this.setState({ ...this.state, loadings: true }, () => {
      axios
        .get(url, { headers: headers })
        .then((response) => {
          console.log(response);
          if (response.data.length) {
            console.log('district');
            let data = [];
            response.data.map((item) => {
              let data_object = {
                key: item.id,
                district: item.district,
                state: item.state === null ? 'Not Defined' : item.state.state,
              };
              data.push(data_object);
            });
            this.setState({ data: data, loadings: false });
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    });
  };

  // Delete modal helper functions
  show_confirm_delete = (id) => {
    // console.log(id);
    const { confirm } = Modal;
    confirm({
      title: 'Do you want to delete this?',
      onOk: () => {
        this.handle_delete(id);
      },
      onCancel: () => {
        console.log('Cancel');
      },
    });
  };

  // Delete request function
  handle_delete(id) {
    console.log(id);
    axios
      .delete(url + id, { headers: headers })
      .then((response) => {
        this.fetch_data();
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { data } = this.state;
    const { loadings } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
        <CustomTable
          dataSource={data}
          columns={columns}
          title="District"
          show_confirm_delete={this.show_confirm_delete}
          loadings={loadings}
        />
      </div>
    );
  }
}

export default District;
