import React, { Component } from 'react';
import { axiosInstance } from '../../utils/axiosIntercepter';
import { Row, Col, Spin, Image, Carousel, Divider } from 'antd';
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
      images: [],
    };
  }
  componentDidMount() {
    this.setState({
      ...this.state,
      isLoading: true,
    });
    axiosInstance
      .get(`api/report-ado/${this.props.villageId}`)
      .then((res) => {
        console.log(res.data);
        this.setState(
          {
            ...this.state,

            location_report: res.data,
          },
          () => {
            axiosInstance
              .get(
                `https://api.aflmonitoring.com/api/report/images/${this.state.location_report.id}`,
              )
              .then((res) => {
                this.setState({
                  ...this.state,
                  isLoading: false,
                  images: res.data,
                });
              })
              .catch((err) => {
                throw err;
              });
          },
        );
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          isLoading: false,
          location_report: null,
        });
      });
  }

  render() {
    const reportDetail = (locationReport) => {
      let report = [];
      for (var key in locationReport) {
        if (locationReport.hasOwnProperty(key)) {
          if (key != 'location') {
            report.push(
              <div>
                {key} : {locationReport[key]}
              </div>,
            );
          }
        }
      }
      return report;
    };
    return (
      <div className="wrapper">
        {!this.state.isLoading && this.state.location_report ? (
          <>
            <Row gutter={[28, 28]}>
              <Col sm={{ span: 24 }} md={{ span: 8 }}>
                <Carousel autoplay>
                  {this.state.images.map((image) => {
                    return (
                      <div>
                        <div
                          style={{
                            height: '400px',
                            color: 'white',
                            border: '0px',
                            backgroundColor: 'white',
                            textAlign: 'center',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}>
                          <img
                            style={{ width: '100%', height: '100%' }}
                            width={100}
                            src={image.image}></img>
                        </div>
                      </div>
                    );
                  })}
                </Carousel>
              </Col>
              <Col sm={{ span: 18 }} md={{ span: 12 }} className="Info">
                {/* <div className="villageName">
                  {this.state.location_report.location.village_name
                    ? this.state.location_report.location.village_name.village
                    : 'No Info'}
                  ,
                  {this.state.location_report.location.district
                    ? this.state.location_report.location.district.district
                    : 'No Info'}
                </div>
                <div className="submission">
                  Submitted by |
                  {/* {this.state.location_report.location.ado
                    ? this.state.location_report.location.ado.user.name
                    : 'No Info'} */}
                |
                {/* {this.state.location_report.location.dda
                    ? this.state.location_report.location.dda.user.name
                    : 'No Info'} */}
                {/* Submitted by DDA1011-DDA | Under Sh.Subhash | ADO */}
                {/* </div> */} */
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
              <Col
                sm={{ span: 6 }}
                md={{ span: 4 }}
                className="pending_wrapper">
                <div className="pending_displayer">
                  <div>O</div>
                  <div>Ongoing</div>
                </div>
              </Col>
            </Row>
            <Divider style={{ background: 'rgba(0, 0, 0, 0.467)' }}></Divider>
            <Row gutter={[28, 28]}>
              <Col span={24}>
                <div className="report_heading">Report</div>
                <div className="report_card">
                  {/* {reportDetail(this.state.location_report)} */}
                </div>
              </Col>
            </Row>
          </>
        ) : (
          <div style={{ textAlign: 'center' }}>
            <Spin spinning={true}></Spin>
          </div>
        )}
      </div>
    );
  }
}

export default Report;
