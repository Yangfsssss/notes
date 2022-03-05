import React, { lazy } from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import UserPage from '../pages/UserPage';
import LoginPage from '../pages/LoginPage';
import _404Page from '../pages/_404Page';
// import BottomNav from "../components/BottomNav";
import PrivateRoute from './PrivateRoute';
import CacheRoute, { CacheSwitch } from 'react-router-cache-route';

export const routes = [
  {
    path: '/',
    exact: true,
    component: HomePage,
  },
  {
    path: '/user',
    component: UserPage,
    auth: PrivateRoute,
  },
  {
    path: '/login',
    component: LoginPage,
  },
  {
    component: _404Page,
  },
];

export default function Routes() {
  return (
    <Router>
      <Link to="/">首页</Link>
      <Link to="/user">用户中心</Link>
      <Link to="/login">登录</Link>
      <Link to="/route">route</Link>

      <Switch>
        <Route path="/login" component={LoginPage} />
        <CacheSwitch>
          <Route path="/" exact component={HomePage} />
          <PrivateRoute path="/user" component={UserPage} isLogin={false} />
          {/* <Route path="/route" component={RouteCps} /> */}
          {/* <Route component={_404Page} /> */}
        </CacheSwitch>
      </Switch>
    </Router>
  );
}
