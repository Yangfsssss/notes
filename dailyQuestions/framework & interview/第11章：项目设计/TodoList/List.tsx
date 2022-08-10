import React from 'react';
import { IListItem } from '.';
import ListItem from './ListItem';

interface IListProps {
  list: IListItem[];
  deleteItem: (id: string) => void;
  toggleCompleteItem: (id: string) => void;
}

const List = (props: IListProps) => {
  const { list, deleteItem, toggleCompleteItem } = props;

  return (
    <ul>
      {list.map((listItem) => (
        <ListItem
          key={listItem.id}
          listItem={listItem}
          deleteItem={deleteItem}
          toggleCompleteItem={toggleCompleteItem}
        />
      ))}
    </ul>
  );
};

export default List;
