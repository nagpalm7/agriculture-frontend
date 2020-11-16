import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import dashboard_routes from '../../routes/dashboard_routes';
import { Layout } from 'antd';
import Report from '../../Pages/Report/ReportRender.js';
import Villages from '../../Pages/Villages/Villages';
import Dda_villages from '../../Pages/DDA_Villages/dda_village';
const { Content } = Layout;

class Contents extends Component {
  render() {
    const renderReport = ({ match }) => {
      console.log(match.params);
      return <Report villageId={match.params.villageId}></Report>;
    };
    const renderVillage = () => {
      if (this.props.role == 5) {
        return <Villages></Villages>;
      } else if (this.props.role == 4) {
        return <Dda_villages></Dda_villages>;
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
          <Route
            path="/locations/ongoing/:villageId"
            exact
            component={renderReport}></Route>
          <Route
            path="/locations/ongoing/:villageId"
            exact
            component={renderReport}></Route>
          <Route path="/villages" exact component={renderVillage}></Route>
          <Redirect from="/" to="/" />
        </Switch>
      </Content>
    );
  }
}

export default Contents;
