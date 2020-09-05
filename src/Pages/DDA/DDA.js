import React, { Component } from 'react';
import { Modal } from 'antd';
import axios from 'axios';
import CustomTable from '../../Components/Table/Table';

const url = 'https://api.aflmonitoring.com/api/district/';

const headers = {
  Authorization: 'token 915470c056d9f86cb271b7392ce7eae1296d906f',
};

const columns = [
  {
    title: 'DDA',
    dataIndex: 'dda',
    key: 'dda',
  },
  {
    title: 'DISTRICT',
    dataIndex: 'district',
    key: 'district',
  },
  {
    title: 'PHONE',
    dataIndex: 'phone',
    key: 'phone',
  },
  {
    title: 'EMAIL',
    key: 'email',
    dataIndex: 'email',
  },
];
class DDA extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      columns: [],
      key: null,
    };
  }

  add_form_ref = React.createRef();

  componentDidMount() {
    this.fetch_data();
  }

  // Fetch list of Districts
  fetch_data = () => {
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
          this.setState({ data: data });
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  // Add modal helper functions
  show_add_modal = () => {
    this.setState({
      add_visible: true,
    });
  };

  hide_add_modal = () => {
    this.add_form_ref.current.resetFields();
    this.setState({
      add_visible: false,
    });
  };

  // Add form helper functions
  submit_add_form = (event) => {
    this.setState(
      {
        add_loading: true,
      },
      () => {
        let data = {
          name: event.name,
          email: event.email,
        };
        axios
          .post(url, data)
          .then((response) => {
            this.setState({ add_loading: false });
            this.fetch_data();
            this.hide_add_modal();
          })
          .catch((error) => {
            this.setState({ add_loading: false });
          });
      },
    );
  };

  // Delete modal helper functions
  show_confirm_delete = (id) => {
    const { confirm } = Modal;
    confirm({
      title: 'Do you Want to delete this interviewee?',

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
    axios
      .delete(url + id)
      .then((response) => {
        this.fetch_data();
      })
      .catch((error) => {
        alert(error);
      });
  }

  render() {
    const { data } = this.state;

    return (
      <div className="site-card-border-less-wrapper">
        <CustomTable
          dataSource={data}
          columns={columns}
          title="District"
          show_add_modal={this.show_add_modal}
          show_confirm_delete={this.show_confirm_delete}
          hide_edit={true}
        />
      </div>
    );
  }
}

export default DDA;
