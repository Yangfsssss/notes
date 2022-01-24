import React, { ChangeEvent } from 'react';
import { Component, Context } from 'react';
import FieldContext from './field-context';
import { FormType } from './use-form';

export type FieldProps = { name: string; rules: any[] };

export class Field extends React.Component<FieldProps> {
  unregisterFieldEntities: () => void;
  context: FormType;

  //@ts-ignore
  static contextType = FieldContext;

  constructor(props: FieldProps) {
    super(props);
  }

  onStoreChange = () => {
    this.forceUpdate();
  };

  componentDidMount = () => {
    this.unregisterFieldEntities = this.context.registerFieldEntity(this);
  };

  componentWillUnmount = () => {
    if (this.unregisterFieldEntities) {
      this.unregisterFieldEntities();
    }
  };

  getControlled = () => {
    const { getFieldValue, setFieldsValue } = this.context;

    const { name } = this.props;

    return {
      value: getFieldValue(name),
      onChange(e: ChangeEvent) {
        const newValue = e.target.value;

        setFieldsValue({ [name]: newValue });
      },
    };
  };

  render() {
    const returnChildNode = React.cloneElement(this.props.children as React.ReactElement, this.getControlled());

    return returnChildNode;
  }
}
