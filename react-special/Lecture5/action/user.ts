import LoginService from '../service/login';
import { LOGIN_FAILURE, LOGIN_SUCCESS, REQUEST } from './const';

//同步
// export const login = (userInfo: { name: string }) => ({ type: LOGIN_SUCCESS, payload: userInfo });

//异步：thunk
//如何解决多个时序异步请求：嵌套
// export const login = (userInfo: { name: string }) => (dispatch: any) => {
//   dispatch({ type: REQUEST });

//   LoginService.login(userInfo).then(
//     (res) => {
//       // dispatch({ type: LOGIN_SUCCESS, payload: res });
//       getMoreUserInfo(dispatch, res);
//     },
//     (err) => {
//       dispatch({ type: LOGIN_FAILURE, payload: err });
//     }
//   );
// };

export const getMoreUserInfo = (dispatch, userInfo) => {
  LoginService.getMoreUserInfo(userInfo).then(
    (res) => {
      dispatch({ type: LOGIN_SUCCESS, payload: res });
    },
    (err) => {
      dispatch({ type: LOGIN_FAILURE, payload: err });
    }
  );
};

export const loginPromise = (dispatch, userInfo) => {
  return LoginService.login(userInfo).then(
    (res) => {
      // dispatch({type: "LOGIN_SUCCESS", payload: res});
      return res;
    },
    (err) => {
      dispatch({ type: 'LOGIN_FAILURE', payload: err });
    }
  );
};

//方案2:async/await
export function login(userInfo) {
  return async function (dispatch) {
    dispatch({ type: REQUEST });

    // //请求1
    let res1 = await loginPromise(dispatch, userInfo);
    console.log('res1', res1);

    //请求2
    if (res1) {
      getMoreUserInfo(dispatch, res1);
    }
  };
}
