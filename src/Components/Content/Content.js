import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import dashboard_routes from '../../routes/dashboard_routes';
import { Layout } from 'antd';

const { Content } = Layout;

class Contents extends Component {
  render() {
    return (
      <Content
        style={{
          margin: '40px 20px',
          backgroundColor: '#fff',
          borderRadius: '20px',
        }}>
        <div>
          <Switch>
            {dashboard_routes.map((route, index) => (
              <Route
                key={index}
                path={route.path}
                exact={route.exact}
                children={<route.component />}
              />
            ))}
          </Switch>
        </div>
      </Content>
    );
  }
}
export default Contents;
