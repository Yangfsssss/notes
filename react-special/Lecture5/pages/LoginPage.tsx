import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { login } from '../action/user';
import { User } from '../type';

type LoginPageProps = {
  isLogin: boolean;
  err: { msg: string };
  loading?: boolean;
  login: (userInfo: User['userInfo']) => void;
} & RouteComponentProps;

class loginPage extends Component<LoginPageProps, { name: string }> {
  constructor(props: LoginPageProps) {
    super(props);
    this.state = {
      name: '',
    };
  }

  render() {
    //todo 检验用户是否登陆
    //1，已登陆，跳转至 from或默认页面
    //2，未登陆

    const { isLogin, location, login, err, loading } = this.props;

    if (isLogin) {
      const { from = '/' } = location.state || {};
      return <Redirect to={from} />;
    }

    return (
      <div>
        <h3>LoginPage</h3>
        <input type="text" value={this.state.name} onChange={(e) => this.setState({ name: e.target.value })} />
        <button onClick={() => login({ name: this.state.name })}>{loading ? 'loading...' : 'login'}</button>
        <p className="red">{err.msg}</p>
      </div>
    );
  }
}

const LoginPage = connect<{}, {}, {}, { user: User }>(
  ({ user }) => ({ isLogin: user.isLogin, err: user.err, loading: user.loading }),
  {
    login,
  }
)(loginPage);

export default LoginPage;
