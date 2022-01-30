import React from 'react';
import { FormType } from './use-form';

//context

//1,创建context对象
const FieldContext = React.createContext<FormType>(null);

export default FieldContext;

//2,通过Provider传递value

//3,后代消费value
//（1）contextType 用于类组件，并且只能定义单一context来源
//（2）useContext 用于函数组件和自定义hook中
//（3）Consumer
