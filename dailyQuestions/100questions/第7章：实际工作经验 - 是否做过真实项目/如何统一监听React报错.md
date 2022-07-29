ErrorBoundary组件
    监听所有下级组件报错，可降级展示UI。
    只监听组件渲染时报错，不监听DOM事件，异步错误。
    prd环境生效，dev会直接抛出错误。

    ```js
    class ErrorBoundary extends React.Component {
      constructor(props){
        super(props);
        this.state = {
          error: null,
        }
      }

      static getDerivedStateFromError(error){
        // 更新 state 使下一次渲染能够显示降级后的UI
        console.log('getDerivedStateFromError...',error);
        return {error};
      }

      componentDidCatch(error, errorInfo){
        // 在组件错误后调用
        // 统计上报错误信息
        console.log('componentDidCatch...',error,errorInfo);
      }

      render(){
        if(this.state.error){
          // 提示错误
          return <h1>报错了</h1>
        }

        // 没有报错，就渲染子组件
        return this.props.children
      }
    }
    ```

    构成： 
        this.state = { error: null }；
        static getDerivedStateFromError；
        componentDidCatch；
    
    用法：
        <ErrorBoundary>
          <App />
        </ErrorBoundary>

事件报错：
    可用try...catch...，或者window.onerror

异步错误：
    可用window.onerror

答案：
    ErrorBoundary监听组件渲染报错。
    事件报错使用try...catch...或window.onerror.
    异步报错使用window.onerror.

扩展：
    Promise未处理的catch需要onUnhandledRejection，后面讲。
    js报错统计（埋点、上报、统计）。

    为了改进而报错。

