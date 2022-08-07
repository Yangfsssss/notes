合成事件：
    所有事件挂载到root上；
    event不是原生的，是SyntheticEvent合成事件对象；
    和Vue事件不同，和DOM事件也不同；

为何要合成事件机制？
    更好的兼容性和跨平台；
    挂载到root上，减少内存消耗，避免频繁解绑；
    方便事件的统一管理（如事务机制）；


React 17事件绑定到root：
    React 16绑定到document；
    React 17事件绑定到root组件；
    有利于多个React版本并存，例如微前端；