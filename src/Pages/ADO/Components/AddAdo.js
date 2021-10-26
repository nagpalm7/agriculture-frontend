import React, { Component } from 'react';
import { Form, Input, Typography, message, Spin } from 'antd';
import { axiosInstance } from '../../../utils/axiosIntercepter';
import '../../formStyle.css';
import MyButton from '../../../Components/ButtonComponent/MyButton';
const { Title } = Typography;
class AddAdo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formLoading: false,
      btnLoading: false,
    };
  }
  handleAddAdo = (event) => {
    this.setState({ ...this.state, btnLoading: true });
    const {
      ado_userName,
      ado_name,
      ado_email,
      ado_password,
      ado_phone,
    } = event;
    const flag = 1;
   /* if(ado_phone.trim().length<6)
    { flag =0;
      alert("Enter 10 digit valid phone number");
    }
    const regex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
    if(! ado_email || regex.test( ado_email) === false){
      flag =0;
     alert("Enter valid email");
    }
    var reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
        var test = reg.test( ado_password);
        if (test) {
            
        } else{
          flag =0;
            alert('Enter a Strong Password it must contain ateast one number , one lowercase alphabet and one uppercase alphabet ');
        }*/
       
    const state =
      localStorage.getItem('State') || sessionStorage.getItem('State');
      
    axiosInstance
      .post('/api/user/', {
        name: ado_name,
        phone: ado_phone,
        email: ado_email,
        username: ado_userName,
        password: ado_password,
        state: state,
        role: 2,
       
        district: 1
      })
      .then((res) => {
        this.setState({ ...this.state, btnLoading: false });
        console.log(res);
        message.success('Ado added');
        console.log("success");
        this.props.history.goBack();
      })
      .catch((err) => {
        this.setState({ ...this.state, btnLoading: false });
        message.error('Unable to add dda');
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
    
  };
  render() {
    return (
      <Spin spinning={this.state.formLoading}>
        <div className="form-container">
          <div>
            <Title level={3}>Add ADO</Title>
          </div>

          <Form name="add_ado" className="add_ado" onFinish={this.handleAddAdo}>
            <h3>
              <b>User Name</b>
            </h3>
            <Form.Item
              name="ado_userName"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide ado name!',
                },
              ]}>
              <Input placeholder="Ado name" />
            </Form.Item>
            <h3>
              <b>Ado name</b>
            </h3>
            <Form.Item
              name="ado_name"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide dda name!',
                },
              ]}>
              <Input placeholder="Ado name" />
            </Form.Item>
            <h3>
              <b>Phone</b>
            </h3>
            <Form.Item name="ado_phone" style={{ marginBottom: '10px' }}>
              <Input placeholder="Phone Number" />
            </Form.Item>
            <h3>
              <b>Password</b>
            </h3>
            <Form.Item
              name="ado_password"
              rules={[
                {
                  required: true,
                  message: 'Please input your Password!',
                },
              ]}
              style={{ marginBottom: '10px' }}>
              <Input.Password placeholder="Password" />
            </Form.Item>
            <h3>
              <b>Email Id</b>
            </h3>
            <Form.Item
              name="ado_email"
              style={{ marginBottom: '10px' }}
              rules={[
                {
                  required: true,
                  message: 'Please provide email id!',
                },
              ]}>
              <Input placeholder="Email" />
            </Form.Item>
            <Form.Item style={{ marginBottom: '10px' }}>
              <MyButton
                htmlType="submit"
                text="ADD"
                className="filled"
                loading={this.state.btnLoading}
                style={{
                  background: '#e03b3b',
                  borderColor: '#e03b3b',
                  color: '#ffffff',
                  fontWeight: '500',
                }}
              />
            </Form.Item>
          </Form>
        </div>
      </Spin>
    );
  }
}
export default AddAdo;
/*import React from 'react';
//import './style.css';


class RegisterForm extends React.Component {
    constructor() {
      super();
      this.state = {
        fields: {},
        errors: {}
      }

      this.handleChange = this.handleChange.bind(this);
      this.submituserRegistrationForm = this.submituserRegistrationForm.bind(this);

    };

    handleChange(e) {
      let fields = this.state.fields;
      fields[e.target.name] = e.target.value;
      this.setState({
        fields
      });

    }

    submituserRegistrationForm(e) {
      e.preventDefault();
      if (this.validateForm()) {
          let fields = {};
          fields["username"] = "";
          fields["emailid"] = "";
          fields["mobileno"] = "";
          fields["password"] = "";
          this.setState({fields:fields});
          alert("Form submitted");
      }

    }

    validateForm() {

      let fields = this.state.fields;
      let errors = {};
      let formIsValid = true;

      if (!fields["username"]) {
        formIsValid = false;
        errors["username"] = "*Please enter your username.";
      }

      if (typeof fields["username"] !== "undefined") {
        if (!fields["username"].match(/^[a-zA-Z ]*$/)) {
          formIsValid = false;
          errors["username"] = "*Please enter alphabet characters only.";
        }
      }

      if (!fields["emailid"]) {
        formIsValid = false;
        errors["emailid"] = "*Please enter your email-ID.";
      }

      if (typeof fields["emailid"] !== "undefined") {
        //regular expression for email validation
        var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        if (!pattern.test(fields["emailid"])) {
          formIsValid = false;
          errors["emailid"] = "*Please enter valid email-ID.";
        }
      }

      if (!fields["mobileno"]) {
        formIsValid = false;
        errors["mobileno"] = "*Please enter your mobile no.";
      }

      if (typeof fields["mobileno"] !== "undefined") {
        if (!fields["mobileno"].match(/^[0-9]{10}$/)) {
          formIsValid = false;
          errors["mobileno"] = "*Please enter valid mobile no.";
        }
      }

      if (!fields["password"]) {
        formIsValid = false;
        errors["password"] = "*Please enter your password.";
      }

      if (typeof fields["password"] !== "undefined") {
        if (!fields["password"].match(/^.*(?=.{8,})(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%&]).*$/)) {
          formIsValid = false;
          errors["password"] = "*Please enter secure and strong password.";
        }
      }

      this.setState({
        errors: errors
      });
      return formIsValid;


    }



  render() {
    return (
    <div id="main-registration-container">
     <div id="register">
        <h3>Registration page</h3>
        <form method="post"  name="userRegistrationForm"  onSubmit= {this.submituserRegistrationForm} >
        <label>Name</label>
        <input type="text" name="username" value={this.state.fields.username} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.username}</div>
        <label>Email ID:</label>
        <input type="text" name="emailid" value={this.state.fields.emailid} onChange={this.handleChange}  />
        <div className="errorMsg">{this.state.errors.emailid}</div>
        <label>Mobile No:</label>
        <input type="text" name="mobileno" value={this.state.fields.mobileno} onChange={this.handleChange}   />
        <div className="errorMsg">{this.state.errors.mobileno}</div>
        <label>Password</label>
        <input type="password" name="password" value={this.state.fields.password} onChange={this.handleChange} />
        <div className="errorMsg">{this.state.errors.password}</div>
        <input type="submit" className="button"  value="Register"/>
        </form>
    </div>
</div>

      );
  }


}


export default RegisterForm;*/