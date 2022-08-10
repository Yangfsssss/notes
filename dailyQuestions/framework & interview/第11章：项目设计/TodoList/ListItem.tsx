import React from 'react';
import { IListItem } from '.';

interface IListItemProps {
  listItem: IListItem;
  deleteItem: (id: string) => void;
  toggleCompleteItem: (id: string) => void;
}

const ListItem = (props: IListItemProps) => {
  const { listItem, deleteItem, toggleCompleteItem } = props;

  const onDeleteButtonClick = () => deleteItem(listItem.id);

  const onCompleteCheckboxClick = () => toggleCompleteItem(listItem.id);

  return (
    <div>
      <input type="checkbox" checked={listItem.completed} onChange={onCompleteCheckboxClick} />
      <span>{listItem.title}</span>
      <button onClick={onDeleteButtonClick}>删除</button>
    </div>
  );
};

export default ListItem;
