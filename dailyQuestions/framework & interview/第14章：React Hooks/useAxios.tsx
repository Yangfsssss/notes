import React, { useState, useEffect } from 'react';
import axios from 'axios';

// 封装 axios 发送网络请求的自定义 Hook
function useAxios(url: string) {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<unknown>(null);
  const [error, setError] = useState<unknown>(null);

  useEffect(() => {
    // 利用 axios 发送网络请求
    setLoading(true);

    // 发送一个 get 请求
    axios
      .get(url)
      .then((res) => {
        setLoading(false);
        setData(res.data);
      })
      .catch((err) => {
        setLoading(false);
        setError(err);
      });
  }, [url]);

  return [loading, data, error];
}

function App() {
  const url = 'https://api.github.com/users/github/3454534';

  const [loading, data, error] = useAxios(url);

  if (loading) {
    return <div>Loading...</div>;
  }

  return error ? <div>Error: {JSON.stringify(error)}</div> : <div>{JSON.stringify(data)}</div>;
}

export default App;
