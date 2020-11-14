import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Space, message, Modal } from 'antd';
import edit from '../../assets/images/edit.png';
import garbage from '../../assets/images/trash-can.png';
import { axiosInstance } from '../../utils/axiosIntercepter';
import MainContent from '../../Components/MainContent/MainContent';
import { ExclamationCircleOutlined } from '@ant-design/icons';

class Dda_villages extends Component {
  constructor(props) {
    super(props);
    this.state={
      search:'',
      totalCount:null,
      ddaData:null,
      villageData:[],
      loading:false,
    }
  }
  componentDidMount(){
    let ddaId=(localStorage.getItem('dda_id')==null?sessionStorage.getItem('dda_id'):localStorage.getItem('dda_id'));
    console.log(ddaId);
    this.setState({ ...this.state, loading: true });
    this.fetchDetails(ddaId,1);
  }
  fetchDetails=(ddaId,page,search='')=>{
    this.setState({ ...this.state, loading: true });
    axiosInstance
      .get(`api/user/${ddaId}/`)
      .then((res) => {
        console.log(res.data);
        this.setState({
          ...this.state,
          ddaData: res.data,
          loading: false,
        });
        if(res.data.district)
        {
          this.fetchVillageList(res.data.district.district_id,page,search)
        }
      
      })
      .catch((err) => {
        this.setState({
          ...this.state,
          loading: false,
        });
        if (err.response) {
          console.log(err.response);
        } else {
          console.log(err.message);
        }
      });
  }

  fetchVillageList = (district_id,page, search = '') => {
    console.log(district_id);
    // this.setState({ ...this.state, loading: true });
    // axiosInstance
    //   .get(`/api/villages-list/district/${}?page=${page}&search=${search}`)
    //   .then((res) => {
    //     console.log(res.data);
    //     this.setState({
    //       ...this.state,
    //       villageData: res.data.results,
    //       loading: false,
    //       totalCount: res.data.count,
    //     });
    //   })
    //   .catch((err) => {
    //     this.setState({
    //       ...this.state,
    //       loading: false,
    //     });
    //     if (err.response) {
    //       console.log(err.response);
    //     } else {
    //       console.log(err.message);
    //     }
    //   });
  };
  render() {
    return (
      <>
      dda_village
        {/* <MainContent
          title="Dda"
          addlink="/dda/add"
          loading={this.state.loading}
          dataSource={this.state.ddaData}
          columns={this.columns}
          totalPages={this.state.totalCount}
          onPageChange={this.onPageChange}
          onSearch={this.onSearch}
        /> */}
      </>
    );
  }
}

export default Dda_villages;
