import React from 'react';

const JSXDemo = () => {
  const characters = [
    {
      name: 'Tomas',
      age: 34,
      id: 1,
    },
    {
      name: 'Theresa',
      age: 22,
      id: 2,
    },
  ];

  const isShow = true;

  return <div>{isShow && characters.map((character) => <p key={character.id}>{character.name}</p>)}</div>;
};

export default JSXDemo;
