import { ReactNode } from "react";

// it's a generic type, we don't know the item type beforehand
interface ListProps<T> {
  items: T[];
  render: (item: T) => ReactNode;
}

// T extends any object, cannot be null or undefined
const List = <T extends {}>({ items, render }: ListProps<T>) => {
  return (
    <ul>
      {items.map((item, i) => (
        <li key={i}>{render(item)}</li>
      ))}
    </ul>
  );
};

export default List;
