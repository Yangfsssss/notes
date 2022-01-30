import React from 'react';
import { Field } from './field';
import FieldContext from './field-context';
import { FormType, useForm } from './use-form';

// type FormProps =({
//     form: FormType;
//     onFinish: (value: unknown) => void;
//     onFinishFailed: (err: unknown, value: unknown) => void;
//     children?: React.ReactNode;
//   },ref: any)

const Form = (
  {
    form,
    onFinish,
    onFinishFailed,
    children,
  }: {
    form?: FormType;
    onFinish: (value: unknown) => void;
    onFinishFailed: (err: unknown, value: unknown) => void;
    children?: React.ReactNode;
  },
  ref: any
) => {
  //form
  const [formInstance] = useForm(form);

  React.useImperativeHandle(ref, () => formInstance);

  formInstance.setCallbacks({ onFinish, onFinishFailed });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        formInstance.submit();
      }}
    >
      <FieldContext.Provider value={formInstance}>{children}</FieldContext.Provider>
    </form>
  );
};

export default Form;
