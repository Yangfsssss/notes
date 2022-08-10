import React, { ChangeEvent, useState } from 'react';

const InputItem = ({ addItem }: { addItem: (title: string) => void }) => {
  const [inputValue, setInputValue] = useState('');

  console.log('InputItem executed');

  const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    console.log('onInputChange', e);

    setInputValue(e.target.value);
  };

  const onSubmitButtonClick = () => {
    addItem(inputValue);
    setInputValue('');
  };

  return (
    <div>
      <input value={inputValue} onChange={onInputChange} />
      <button onClick={onSubmitButtonClick}>添加</button>
    </div>
  );
};

export default React.memo(InputItem);
