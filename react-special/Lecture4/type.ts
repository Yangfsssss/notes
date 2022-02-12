import { createBrowserHistory } from 'history';

export type ReactRouterHistory = ReturnType<typeof createBrowserHistory>;

export type RouterContextType = {
  history: ReactRouterHistory;
  location: ReactRouterHistory['location'];
  match: Match;
};

export type Match = {
  path: string;
  url: string;
  isExact: boolean;
  params: Record<string, any>;
};
