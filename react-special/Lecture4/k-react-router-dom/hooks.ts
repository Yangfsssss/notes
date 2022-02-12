import React from 'react';
import RouterContext from './RouterContext';

export function useHistory() {
  return React.useContext(RouterContext).history;
}

export function useLocation() {
  return React.useContext(RouterContext).location;
}

export function useRouteMatch() {
  return React.useContext(RouterContext).match;
}

export function useParams() {
  const match = useRouteMatch();

  return match ? match.params : {};
}
