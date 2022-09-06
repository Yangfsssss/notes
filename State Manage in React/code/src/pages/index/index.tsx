import React from 'react';
import { Button } from 'antd';

interface Props {}

class IndexPage extends React.Component<Props> {
  render() {
    return (
      <div className="box">
        <span>This is a index page</span>
        <Button type="primary">按钮</Button>
      </div>
    );
  }
}

export default IndexPage;
