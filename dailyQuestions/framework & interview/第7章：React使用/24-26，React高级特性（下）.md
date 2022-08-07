24，什么是React高阶组件？
    关于组件公共逻辑的抽离：
        mixin，已被React弃用；
        高阶组件HOC；
        Render Props；

```jsx
    // 高阶组件不是一种功能，而是一种模式
    const HOCFactory = (Component) => {
        class HOC extends React.Component {
          // 在此定义多个组件的公共逻辑；
            render() {
                return <Component {...this.props} /> // 返回拼装的结果
            }
        }

        return HOC;
    }
```

        redux connect是高阶组件；
```jsx
        const VisibleTodoList = connect(
          mapStateToProps,
          mapDispatchToProps
        )(TodoList)

        const connect = (mapStateToProps,mapDispatchToProps) => (WrappedComponent) => {
          class Connect extends React.Component {
            constructor(){
              super();
              this.state = {
                allProps:{}
              }
            }

            /* ... */
            render() {
              return <WrappedComponent {...this.state.allProps} />
            }
          }

          return Connect;
        }
  ```

25，什么是React Render Props？
```jsx
        // Render Props 的核心思想：
        // 通过一个函数将 class 组件的 state 作为 props传递给纯函数组件；
        class Factory extends React.Component {
          constructor(props) {
            this.state = {
              /* state 即多个组件的公共逻辑的数据*/
            }
          }

          /* 修改state */
          render() {
            return <div>{this.props.render(this.state)}</div>
          }
        }

        const App = () => {
          return <Factory render={
            /* render 是一个函数组件 */
            (props) => <TodoList {...props} />
            } />
        }
```


    理解：
        给一个持有逻辑和数据的class以props(children)的形式注入一个（纯UI）组件，作为消费者去消费其数据，即只要是需要（能够）消费这个class的数据的组件，就直接注入其中，不需要再实现一遍class，实现了class的逻辑和数据的复用；

        render props可以用custom hook完全代替；
    
    HOC vs Render Props：
        HOC：模式简单，但会增加组件层级；
        Render Props：代码简洁，学习成本较高；
        按需使用；


26，React高级特性考点总结：
    函数组件；
    非受控组件（必须手动操作DOM元素时使用）；
    Portals（子组件逃离父组件，渲染至父组件之外，在某些CSS特征场景下使用）；
    context（需要把外层信息传递给所有子孙，props drilling）；
    异步组件（比较大的组件需要异步加载）；
    性能优化（重要）；
    高阶组件 HOC；
    Render Props；