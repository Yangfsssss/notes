import React from 'react';
import { useState, useEffect } from 'react';

const ReactClosureTrap = () => {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      console.log(value); // ？
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [value]);

  function clickHandler() {
    setValue(value + 1);
  }

  return <button onClick={clickHandler}>plus 1</button>;
};

export default ReactClosureTrap;
