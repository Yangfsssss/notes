import React, { Component } from 'react';
import { Match } from '../type';
import matchPath from './matchPath';
import RouterContext from './RouterContext';

class Switch extends Component {
  render() {
    return (
      <RouterContext.Consumer>
        {(context) => {
          let match: Match = null; //是否找到匹配元素
          // let match: Match; //是否找到匹配元素
          let element: React.ReactElement; //找到的匹配元素

          React.Children.forEach(this.props.children, (child) => {
            // if (match == null && React.isValidElement(child)) {
            if (match === null && React.isValidElement(child)) {
              element = child;

              //当child.props.path不存在时，child为通配组件，只能放在最后的位置
              match = child.props.path ? matchPath(context.location.pathname, child.props) : context.match;
            }
          });

          return match ? React.cloneElement(element, { computedMatch: match }) : null;
        }}
      </RouterContext.Consumer>
    );
  }
}

export default Switch;
