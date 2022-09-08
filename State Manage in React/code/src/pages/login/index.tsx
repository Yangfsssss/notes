import React from 'react';

import utilsIndex from '@utils/index';
// import utilsIndex from '../../utils/index';

class LoginPage extends React.Component {
  componentDidMount() {
    const id = utilsIndex.getUrlParam('id');
    console.log('id', id);
  }

  render() {
    return (
      <div className="box">
        <span>This is a login page</span>
      </div>
    );
  }
}

export default LoginPage;
