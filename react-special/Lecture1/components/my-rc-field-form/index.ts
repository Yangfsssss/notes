import React from 'react';

import _Form from './form';
import { Field } from './field';
import { useForm } from './use-form';

const Form = React.forwardRef(_Form);

//@ts-ignore
Form.Field = Field;
//@ts-ignore
Form.useForm = useForm;

export { Field, useForm };
export default Form;
