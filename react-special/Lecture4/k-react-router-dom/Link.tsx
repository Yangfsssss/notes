import React, { useContext } from 'react';
import RouterContext from './RouterContext';

const Link: React.FC<{ to: string; rest?: React.HTMLAttributes<HTMLAnchorElement> }> = ({ to, children, rest }) => {
  const context = useContext(RouterContext);

  const handle = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();

    //history
    context.history.push(to);
  };

  return (
    <a href={to} onClick={handle} {...rest}>
      {children}
    </a>
  );
};

export default Link;
