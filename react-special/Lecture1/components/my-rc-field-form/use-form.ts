import { useRef } from 'react';
import { Field } from './field';

class FormStore {
  store: Record<string, any>;
  fieldEntities: Field[];
  callbacks: Record<string, (...value: unknown[]) => void>;

  constructor() {
    this.store = {};
    this.fieldEntities = [];
    this.callbacks = {};
  }

  setCallbacks = (callbacks: Record<string, (...value: unknown[]) => void>) => {
    this.callbacks = { ...this.callbacks, ...callbacks };
  };

  registerFieldEntity = (field: Field) => {
    this.fieldEntities?.push(field);

    return () => {
      this.fieldEntities = this.fieldEntities?.filter((entity) => entity !== field);

      delete this.store[field.props.name];
    };
  };

  //get
  getFieldsValue = () => {
    return { ...this.store };
  };

  getFieldValue = (name: string) => {
    return this?.store?.[name];
  };

  //set
  setFieldsValue = (newState: Record<string, any>) => {
    //1,更新store
    this.store = { ...this.store, ...newState };

    //2,更新组件
    this.fieldEntities?.forEach((entity) => {
      Object.keys(newState)?.forEach((key) => {
        if (key === entity.props.name) {
          entity.onStoreChange();
        }
      });
    });
  };

  validator = () => {
    let err: any[] = [];

    return err;
  };

  submit = () => {
    const err = this.validator();

    const { onFinish, onFinishFailed } = this.callbacks;
    if (err.length === 0) {
      onFinish(this.getFieldsValue());
    } else {
      onFinishFailed(err, this.getFieldsValue());
    }
  };

  getForm = () => {
    return {
      getFieldsValue: this.getFieldsValue,
      getFieldValue: this.getFieldValue,
      setFieldsValue: this.setFieldsValue,
      registerFieldEntity: this.registerFieldEntity,
      setCallbacks: this.setCallbacks,
      submit: this.submit,
    };
  };
}

export type FormType = ReturnType<FormStore['getForm']>;

export const useForm = (form?: FormType) => {
  const formRef = useRef<FormType>(null);

  if (!formRef.current) {
    if (form) {
      formRef.current = form;
    } else {
      const formStore = new FormStore();

      formRef.current = formStore.getForm();
    }
  }

  return [formRef.current];
};
