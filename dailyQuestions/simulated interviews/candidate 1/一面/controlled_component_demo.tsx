import React, { ChangeEvent, useState } from 'react';

const ControlledComponent = () => {
  const [inputValue, setInputValue] = useState('initial value');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onInputChange --->', e);
    console.log('inputValue --->', e.target.value);
    setInputValue(e.target.value);
  };

  return <input type="text" value={inputValue} onChange={onInputChange} />;
};

export default ControlledComponent;
