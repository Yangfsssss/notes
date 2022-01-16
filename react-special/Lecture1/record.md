lec 1
实现antd 4中的<Form>
链路：
 ->class FormStore:
      store,fieldEntities,callbacks;
      getForm:{
      getFieldValue,
      getFieldsValue,
      setFieldsValue,
      setCallbacks,
      registerFieldEntity,
      submit
      }; 
->function useForm:
      useRef;
      根据是否传入form实例判断是类组件还是函数组件并执行对应的初始化formStore操作;
->class CustomizeInput:<input />;
->class Field <=> Form.Item:
      this.forceUpdate();
      this.unregisterFieldEntities();
      this.getControlled();
      React.cloneElement();
      使用React.cloneElement()可以为子元素注入属性;
->FieldContext:
      React.createContext<T>;
      <Context.Provider value={sharedState}/>
->function Form:
      formInstance = useForm(form?);
      在函数组件中，可以使用useRef()完成formInstance的持久化;
      在类组件中，同样的操作需要用React.createRef()，ref，React.useImperativeHandle() & React.forwardRef()来完成;

在类组件中，使用箭头函数声明实例方法确保this不会丢失

      
