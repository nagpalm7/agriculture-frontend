import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import dashboard_routes from '../../routes/dashboard_routes';
import { Layout } from 'antd';
import Report from '../../Pages/Report/ReportRender.js';
import Villages from '../../Pages/Villages/Villages';
import ADO from '../../Pages/ADO/ADO';
import Pending from '../../Pages/Locations/Pending/pending';
import Ongoing from '../../Pages/Locations/ongoing';
import Completed from '../../Pages/Locations/completed';
import Dda_ongoing from '../../Pages/DDA_Locations/dda_ongoing';
import Dda_completed from '../../Pages/DDA_Locations/dda_completed';
import Dda_pending from '../../Pages/DDA_Locations/dda_pending';
import Ado_Pending from '../../Pages/ADO_Locations/ado_pending';
import ADO_Completed from '../../Pages/ADO_Locations/ado_completed';
import Home from '../../Pages/Home/Home.js';
import DDA_Home from '../../Pages/Home/DDA_Home';
import ADO_Home from '../../Pages/Home/ADO_Home';
import ADO_Villages from '../../Pages/Villages/AdoVillages.js';
const { Content } = Layout;

class Contents extends Component {
  render() {
    const renderReport = ({ match }) => {
      console.log(match.params);
      return <Report villageId={match.params.villageId}></Report>;
    };
    const renderVillage = () => {
      if (this.props.role == 5) {
        return (
          <Villages
            type="admin_villages"
            history={this.props.history}></Villages>
        );
      } else if (this.props.role == 4) {
        return (
          <Villages
            loginData={this.props.loginData}
            type="dda_villages"
            history={this.props.history}></Villages>
        );
      } else if (this.props.role == 3) {
        return (
          <ADO_Villages
            loginData={this.props.loginData}
            history={this.props.history}></ADO_Villages>
        );
      }
    };
    const renderHome = () => {
      if (this.props.role == 5) {
        return <Home history={this.props.history}></Home>;
      } else if (this.props.role == 4) {
        return (
          <DDA_Home
            loginData={this.props.loginData}
            history={this.props.history}></DDA_Home>
        );
      } else if (this.props.role == 3) {
        return (
          <ADO_Home
            history={this.props.history}
            loginData={this.props.loginData}></ADO_Home>
        );
      }
    };
    const renderLocation = () => {
      const status = this.props.history.location.pathname.split('/')[2];
      console.log(status);

      if (this.props.role == 5) {
        if (status == 'pending') {
          return (
            <Pending
              history={this.props.history}
              type="admin_villages"></Pending>
          );
        } else if (status == 'ongoing') {
          return (
            <Ongoing
              history={this.props.history}
              type="admin_villages"></Ongoing>
          );
        } else if (status == 'completed') {
          return (
            <Completed
              history={this.props.history}
              type="admin_villages"></Completed>
          );
        }
      } else if (this.props.role == 4) {
        if (status == 'pending') {
          return (
            <Dda_pending
              history={this.props.history}
              loginData={this.props.loginData}></Dda_pending>
          );
        } else if (status == 'ongoing') {
          return <Dda_ongoing history={this.props.history}></Dda_ongoing>;
        } else if (status == 'completed') {
          return <Dda_completed history={this.props.history}></Dda_completed>;
        }
      } else {
        if (status == 'pending') {
          return (
            <Ado_Pending
              history={this.props.history}
              type="ado_locations"></Ado_Pending>
          );
        } else if (status == 'completed') {
          return (
            <ADO_Completed
              history={this.props.history}
              type="ado_locations"></ADO_Completed>
          );
        }
      }
    };
    const renderAdo = () => {
      if (this.props.role == 5) {
        return (
          <ADO
            history={this.props.history}
            loginData={this.props.loginData}
            type="admin_villages"></ADO>
        );
      } else if (this.props.role == 4) {
        return (
          <ADO
            history={this.props.history}
            loginData={this.props.loginData}
            type="dda_villages"></ADO>
        );
      }
    };
    return (
      <Content
        style={{
          margin: '40px 20px',
          borderRadius: '20px',
          minHeight: 'auto',
        }}>
        <Switch>
          {dashboard_routes.map((route, index) => (
            <Route
              key={index}
              path={route.path}
              exact={route.exact}
              children={<route.component history={this.props.history} />}
            />
          ))}
          <Route path="/" exact children={renderHome}></Route>
          <Route path="/ado" exact children={renderAdo}></Route>
          <Route
            path="/locations/ongoing/:villageId"
            exact
            component={renderReport}></Route>
          <Route path="/villages" exact children={renderVillage}></Route>
          <Route
            path="/locations/ongoing"
            exact
            children={renderLocation}></Route>
          <Route path="/locations/pending" children={renderLocation}></Route>
          <Route path="/locations/completed" children={renderLocation}></Route>
          <Redirect from="/" to="/" />
        </Switch>
      </Content>
    );
  }
}

export default Contents;
