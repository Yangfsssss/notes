import React, { useState } from 'react';

const BehaviorOfUseState = () => {
  const [value, setValue] = useState(100);

  const onButtonClick = () => {
    setValue(value + 1);
    setValue(value + 1);
    console.log(1, value); // 100
    setValue((value) => value + 1);
    setValue((value) => value + 1);
    console.log(2, value); // 100
  };

  const anotherOnButtonClick = () => {
    setTimeout(() => {
      setValue(value + 1);
      setValue(value + 1);
      console.log(1, value); // 102
      setValue(value + 1);
      setValue(value + 1);
      console.log(2, value); // 104
    }, 1000);
  };

  return (
    <div>
      <span>{value}</span>
      <button onClick={onButtonClick}>increase 1</button>
      <button onClick={anotherOnButtonClick}>another increase 1</button>
    </div>
  );
};

export default BehaviorOfUseState;
