JS无法直接调用native API，需要通过一些特定的“格式”来调用。
这些“格式”就统称为JS-Bridge，例如微信JSSDK。

常见的实现方式：
  注册全局API：window.xxx，但不适合处理异步操作。
  URL Scheme：适用所有情况，注意封装。
  ```ts
  const sdk = {
    invoke(url,data = {},onSuccess,onError){
      const iframe = document.createElement('iframe');
      iframe.style.visibility = 'hidden';
      document.body.appendChild(iframe);

      iframe.onload = () => {
        const content = iframe.contentWindow.document.body.innerHTML;

        onSuccess(JSON.parse(content));
        iframe.remove();
      }

      iframe.onerror = () => {
        onError();
        iframe.remove();
      }

      iframe.src = `my-app-name://${url}?data=${ JSON.stringify(data)}`;
    }

    fn1(data,onSuccess,onError){
      this.invoke('api/fn1',data,onSuccess,onError);
    }
    fn1(data,onSuccess,onError){
      this.invoke('api/fn1',data,onSuccess,onError);
    }
    fn1(data,onSuccess,onError){
      this.invoke('api/fn1',data,onSuccess,onError);
    }
    // ...
  }

  sdk.fn1()
  ```