export type User = {
  isLogin: boolean;
  userInfo: { id?: number | null; name: string; score?: string };
  loading: boolean; // loading
  err: { msg: string };
};
