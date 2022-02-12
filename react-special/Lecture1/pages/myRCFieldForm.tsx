import React, { useEffect } from 'react';
import Form, { Field } from '../components/my-rc-field-form';
import Input from '../components/input';
import { FormType } from '../components/my-rc-field-form/use-form';

const nameRules = { required: true, message: '请输入姓名！' };
const passwordRules = { required: true, message: '请输入密码！' };

// export default function MyRCFieldForm(props: any) {
//   //@ts-ignore
//   const [form] = Form.useForm();

//   const onFinish = (value: any) => {
//     console.log('onFinish', value);
//   };

//   const onFinishFailed = (value: any) => {
//     console.log('onFinishFailed', value);
//   };

//   useEffect(() => {
//     console.log('form', form);
//     form.setFieldsValue({ username: 'default' });
//   }, []);

//   return (
//     <div>
//       <h3>MyRCFieldForm</h3>
//       <Form form={form} onFinish={onFinish} onFinishFailed={onFinishFailed}>
//         <Field name="username" rules={[nameRules]}>
//           <Input placeholder="input UR Username" />
//         </Field>
//         <Field name="password" rules={[passwordRules]}>
//           <Input placeholder="input UR Password" />
//         </Field>
//         <button>Submit</button>
//       </Form>
//     </div>
//   );
// }

export default class MyRCFieldForm extends React.Component {
  formRef = React.createRef<FormType>();

  // [form] = Form.useForm();

  componentDidMount() {
    this.formRef.current.setFieldsValue({ username: 'default' });
  }

  onFinish(value: any) {
    console.log('finish', value);
  }

  onFinishFailed() {
    console.log('finish failed');
  }

  render() {
    return (
      <div>
        <h3>MyRCFieldForm</h3>
        <Form ref={this.formRef} onFinish={this.onFinish} onFinishFailed={this.onFinishFailed}>
          <Field name="username" rules={[nameRules]}>
            <Input placeholder="Username" />
          </Field>
          <Field name="password" rules={[passwordRules]}>
            <Input placeholder="Password" />
          </Field>
          <button>Submit</button>
        </Form>
      </div>
    );
  }
}
