执行链路：
  在组件中：引入定制了reducer的store -> didMount中注册cb -> 事件被触发，dispatch一个action -> 根据reducer更新store中持有的state -> 执行cb -> (组件卸载时清空cb)

applyMiddleware细节见draft:3625 testCompose()