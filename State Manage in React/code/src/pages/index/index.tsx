import React from 'react';
import { Button, DatePicker } from 'antd';
import moment from 'moment';
import axios from 'axios';

import './style.scss';

class IndexPage extends React.Component {
  componentDidMount(): void {
    axios
      .get('/ad/index/gray')
      .then((res) => {
        console.log('res', res.data);
      })
      .catch((error) => {
        console.log('error', error);
      });
  }

  handleDateChange(this: void, date: moment.Moment | null) {
    console.log('date change', moment(date).unix(), this);
  }

  render() {
    return (
      <div className="index-page">
        <div className="middle-box">
          <span>This is a index page</span>

          <Button type="primary">按钮</Button>
        </div>
        <div>
          <DatePicker onChange={this.handleDateChange} />
        </div>
      </div>
    );
  }
}

export default IndexPage;
