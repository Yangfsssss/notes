import React, { Component } from 'react';
import { connect } from 'react-redux';
import { User } from '../type';

class userPage extends Component<{ user: User }> {
  render() {
    console.log('user', this.props.user.userInfo);

    return (
      <div>
        <h3>UserPage</h3>
      </div>
    );
  }
}

const UserPage = connect<{}, {}, User, { user: User }>(({ user }) => ({ user }))(userPage);

export default UserPage;
