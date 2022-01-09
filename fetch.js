// import { isObject, clearData } from "./clearData";

// export interface ReturnResp<T> {
//   errorCode: string;
//   errorMsg: string;
//   message: string;
//   success: boolean;
//   result: T;
// }

// interface ConfigIF extends RequestInit {
//   url: string,
//   upload?: boolean;
//   data?: BodyInit | Object,
// }

export function fetchAPI(config) {
  let {
    url,
    headers = {},
    method = 'GET',
    upload = false,
    data,
    ...others
  } = { ...fetchAPI.defaultConfig, ...config, headers: { ...fetchAPI.defaultConfig.headers, ...config.headers } };

  method = method.toUpperCase();

  let contentType = method !== 'GET' ? headers['Content-Type'] || 'application/json' : null;

  const bConfig = {
    ...others,
    method,
    headers,
  };

  // 是数组或者对象需转化为string
  if (isObject(data) || Array.isArray(data)) {
    // 若是上传文件 则把body转化为FormData
    if (upload) {
      if (!(data instanceof FormData) && isObject(data)) {
        contentType = null;
        bConfig.body = Object.entries(data).reduce((prev, [key, value]) => {
          prev.append(key, value);
          return prev;
        }, new FormData());
      }
    } else {
      bConfig.body = JSON.stringify(data);
    }
  } else {
    bConfig.body = data;
  }

  // 处理contentType
  if (contentType) {
    const contentTypeKey = 'content-type';
    if (bConfig.headers) {
      if (bConfig.headers instanceof Headers) {
        bConfig.headers.append(contentTypeKey, contentType);
      } else if (Array.isArray(bConfig.headers)) {
        bConfig.headers.push([contentTypeKey, contentType]);
      } else {
        bConfig.headers[contentTypeKey] = contentType;
      }
    }
  }

  return fetch(url, bConfig)
    .then((res) => {
      const { status } = res;
      if (status >= 200 && status <= 400) {
        return res.json();
      }
      return Promise.reject(new Error(`系统错误 code: ${status}`));
    })
    .then((resp) => {
      if (!resp) return Promise.reject(new Error('unknow error'));
      const { success, errorMsg, message, errorCode } = resp;
      let errMsg = errorMsg || message;

      if (!success) {
        // 未登录或者登录状态时效
        if (errorCode === '50002' || errorCode === '20001') {
          if (window.location.pathname !== '/login') {
            errMsg = '请重新登录！';
            window.location.href = `/login?callback=${encodeURIComponent(window.location.href)}`;
          }
          // return Promise.reject(new Error('请重新登录'));
        } else if (errorCode === '200101') {
          if (window.location.pathname !== '403') {
            window.location.href = '/403';
          }
        }
        return Promise.reject(new Error(errMsg || '未知错误'));
      }
      return resp;
    });
}

fetchAPI.defaultConfig = {};

fetchAPI.setConfig = function setConfig(config) {
  fetchAPI.defaultConfig = config;
};
