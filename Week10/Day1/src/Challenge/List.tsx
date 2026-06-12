import React from 'react';

interface ListProps<T> {
  items: T[];
  renderItem: (item: T) => React.ReactNode;
}

// Defining a generic component using <T>
export function List<T>({ items, renderItem }: ListProps<T>) {
  return (
    <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
      {items.map((item, index) => (
        <li key={index} style={{ padding: '8px', borderBottom: '1px dashed #aaa' }}>
          {renderItem(item)}
        </li>
      ))}
    </ul>
  );
}