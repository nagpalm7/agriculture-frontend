import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { Row, Col, Image, Carousel, Divider } from 'antd';
import edit from '../../assets/images/edit.svg';
import garbage from '../../assets/images/garbage.svg';
import './Report.css';
import { Button } from 'antd';
import { RedEnvelopeFilled } from '@ant-design/icons';
class Report extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      location_report: '',
    };
  }
  componentDidMount() {
    // axiosInstance
    //   .get(`api/report-ado/${this.props.villageId}`)
    //   .then((res) => {
    //     this.setState({
    //       ...this.state,
    //       isLoading: false,
    //       location_report: res,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       ...this.state,
    //       isLoading: false,
    //       location_report: null,
    //     });
    //   });
  }

  render() {
    return (
      <div className="wrapper">
        <Row gutter={[28, 28]}>
          <Col sm={{ span: 24 }} md={{ span: 8 }}>
            <Carousel
              autoplay
              dotPosition="bottom"
              style={{ border: '1px solid black' }}>
              <div>
                <div
                  style={{
                    height: '400px',
                    color: 'white',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'crimson',
                  }}>
                  <Image width={100} src={edit}></Image>
                </div>
              </div>
              <div>
                <div
                  style={{
                    height: '400px',
                    color: 'white',
                    backgroundColor: 'white',
                    textAlign: 'center',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: 'crimson',
                  }}>
                  <Image width={100} src={garbage}></Image>
                </div>
              </div>
            </Carousel>
          </Col>
          <Col sm={{ span: 18 }} md={{ span: 12 }} className="Info">
            <div className="villageName">Shergarh,Dabwali,Sirsa</div>
            <div className="submission">
              Submitted by DDA1011-DDA | Under Sh.Subhash | ADO
            </div>
            <Divider style={{ background: 'rgba(0, 0, 0, 0.467)' }} />
            <div className="ado_details">
              <h3>ADO Appointed</h3>
              <div className="ado_about">
                <div>Name: Yuvraj Mann</div>
                <div>Email: yuvrajmann@gmail.com</div>
                <div>Phone: 100</div>
              </div>
            </div>
            <div className="dda_details">
              <h3>DDA Appointed</h3>
              <div className="dda_about">
                <div>Name: Yuvraj Mann</div>
                <div>Email: yuvrajmann@gmail.com</div>
                <div>Phone: 100</div>
              </div>
            </div>
            <div className="edit_button">
              <Button
                style={{
                  border: '1px solid #e03b3b',
                  borderRadius: '10px',
                  backgroundColor: 'white',
                  paddingRight: '35px',
                  paddingLeft: '35px',
                  color: '#e03b3b',
                }}>
                Edit
              </Button>
            </div>
          </Col>
          <Col sm={{ span: 6 }} md={{ span: 4 }} className="pending_wrapper">
            <div className="pending_displayer">
              <div>P</div>
              <div>Pending</div>
            </div>
          </Col>
        </Row>
        <Divider style={{ background: 'rgba(0, 0, 0, 0.467)' }}></Divider>
        <Row gutter={[28, 28]}>
          <Col span={24}>
            <div className="report_heading">Report</div>
            <div className="report_card">
              <div>Village Code : </div>
              <div>Village Name : </div>
              <div>District : </div>
              <div>Farmer Name : </div>
              <div>Father Name : </div>
              <div>Ownership/Lease : </div>
              <div>Fire : </div>
              <div>Remarks : </div>
              <div>Incident Reason :</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Report;
