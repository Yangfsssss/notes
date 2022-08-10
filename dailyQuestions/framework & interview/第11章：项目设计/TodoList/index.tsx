import React, { useCallback, useState } from 'react';
import InputItem from './InputItem';
import List from './List';

export interface IListItem {
  id: string;
  title: string;
  completed: boolean;
}

export type IList = IListItem[];

const TodoList = () => {
  const [list, setList] = useState<IList>([]);

  const addItem = useCallback(
    (title: string) => {
      setList(
        list.concat([
          {
            id: Math.random().toString().slice(-5),
            title,
            completed: false,
          },
        ])
      );
    },
    [list]
  );

  const deleteItem = (id: string) => {
    setList(list.filter((listItem) => listItem.id !== id));
  };

  const toggleCompleteItem = (id: string) => {
    setList(
      list.map((listItem) => {
        if (listItem.id === id) {
          listItem.completed = !listItem.completed;
        }
        return listItem;
      })
    );
  };

  return (
    <div>
      <InputItem addItem={addItem} />
      <List list={list} deleteItem={deleteItem} toggleCompleteItem={toggleCompleteItem} />
    </div>
  );
};

export default TodoList;
